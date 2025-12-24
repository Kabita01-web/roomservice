<?php

namespace App\Http\Controllers;

use App\Models\UserReservation;
use App\Models\BlockReservation;
use App\Models\Property;
use App\Models\ActivityLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Log activity helper
     */
    private function logActivity(string $title): void
    {
        ActivityLog::create([
            'name'       => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title'      => $title,
        ]);
    }

    /**
     * Generate slots from 10:00 AM to 5:00 PM (30 min intervals)
     */
    private function generateSlots()
    {
        $slots = [];
        $start = Carbon::createFromTime(10, 0);
        $end   = Carbon::createFromTime(17, 0);

        while ($start < $end) {
            $slots[] = $start->format('H:i');
            $start->addMinutes(30);
        }

        return $slots;
    }

    /**
     * Get available slots for a date
     */
    public function checkAvailability(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
        ]);

        $date = $request->date;
        $dateObj = Carbon::parse($date);

        if ($dateObj->dayOfWeek === Carbon::SATURDAY) {
            return response()->json([
                'date' => $date,
                'available_slots' => [],
                'message' => 'Saturday is closed'
            ]);
        }

        $allSlots = $this->generateSlots();

        // Blocked slots
        $blocked = BlockReservation::where('date', $date)->get();
        $blockedSlots = [];

        foreach ($blocked as $block) {
            $start = Carbon::parse($block->start_time);
            $end   = Carbon::parse($block->end_time);

            while ($start < $end) {
                $blockedSlots[] = $start->format('H:i');
                $start->addMinutes(30);
            }
        }

        // Reserved slots
        $reservedSlots = UserReservation::where('reservation_date', $date)
            ->where('status', '!=', 'Rejected')
            ->pluck('reservation_time')
            ->toArray();

        $availableSlots = array_values(array_diff(
            $allSlots,
            $blockedSlots,
            $reservedSlots
        ));

        return response()->json([
            'date' => $date,
            'available_slots' => $availableSlots
        ]);
    }

    /**
     * Store reservation
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'package_type' => 'required|string|max:100',
            'reservation_date' => 'required|date',
            'reservation_time' => 'required|date_format:H:i',
            'property_id' => 'required|exists:properties,id',
        ]);

        $reservationDate = Carbon::parse($request->reservation_date);
        if ($reservationDate->dayOfWeek === Carbon::SATURDAY) {
            return response()->json([
                'error' => 'Saturday is closed for reservations'
            ], 403);
        }

        $time = Carbon::parse($request->reservation_time);
        $startTime = Carbon::createFromTime(10, 0);
        $endTime = Carbon::createFromTime(17, 0);

        if ($time < $startTime || $time >= $endTime) {
            return response()->json([
                'error' => 'Reservation time must be between 10:00 AM and 5:00 PM'
            ], 403);
        }

        if ($time->minute % 30 !== 0) {
            return response()->json([
                'error' => 'Reservation time must be in 30-minute intervals'
            ], 403);
        }

        $isBlocked = BlockReservation::where('date', $request->reservation_date)
            ->where('start_time', '<=', $request->reservation_time)
            ->where('end_time', '>', $request->reservation_time)
            ->exists();

        if ($isBlocked) {
            return response()->json([
                'error' => 'This time slot is blocked'
            ], 403);
        }

        $alreadyReserved = UserReservation::where('reservation_date', $request->reservation_date)
            ->where('reservation_time', $request->reservation_time)
            ->where('status', '!=', 'Rejected')
            ->exists();

        if ($alreadyReserved) {
            return response()->json([
                'error' => 'This slot is already reserved'
            ], 409);
        }

        $userAlreadyBooked = UserReservation::where('email', $request->email)
            ->where('reservation_date', $request->reservation_date)
            ->where('status', '!=', 'Rejected')
            ->exists();

        if ($userAlreadyBooked) {
            return response()->json([
                'error' => 'You already have a reservation for this date'
            ], 409);
        }

        $reservation = UserReservation::create([
            'user_name' => $request->user_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'package_type' => $request->package_type,
            'reservation_date' => $request->reservation_date,
            'reservation_time' => $request->reservation_time,
            'property_id' => $request->property_id,
            'status' => 'Pending',
        ]);

        /** 🔹 Activity Log */
        $this->logActivity(
            'Created reservation for ' . $reservation->user_name .
            ' on ' . $reservation->reservation_date .
            ' at ' . $reservation->reservation_time
        );

        return response()->json([
            'message' => 'Reservation created successfully',
            'data' => $reservation
        ], 201);
    }

    /**
     * Get all reservations (admin)
     */
    public function index()
    {
        $reservations = UserReservation::with(['property'])
            ->orderBy('reservation_date', 'desc')
            ->orderBy('reservation_time', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    /**
     * Update reservation status
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Confirmed,Completed,Rejected'
        ]);

        $reservation = UserReservation::findOrFail($id);
        $oldStatus = $reservation->status;

        $reservation->status = $request->status;
        $reservation->save();

        /** 🔹 Activity Log */
        $this->logActivity(
            'Updated reservation status for ' . $reservation->user_name .
            ' from ' . $oldStatus .
            ' to ' . $reservation->status
        );

        return response()->json([
            'message' => 'Reservation status updated successfully',
            'data' => $reservation
        ]);
    }

    /**
     * Calendar slots (30 days)
     */
    public function getTimeSlotsForCalendar(Request $request)
    {
        $slotsData = [];
        $today = Carbon::today();

        for ($i = 0; $i < 30; $i++) {
            $date = $today->copy()->addDays($i);
            $dateKey = $date->format('Y-m-d');

            if ($date->dayOfWeek === Carbon::SATURDAY) {
                continue;
            }

            $allSlots = $this->generateSlots();

            $blocked = BlockReservation::where('date', $dateKey)->get();
            $blockedSlots = [];

            foreach ($blocked as $block) {
                $start = Carbon::parse($block->start_time);
                $end = Carbon::parse($block->end_time);

                while ($start < $end) {
                    $blockedSlots[] = $start->format('H:i');
                    $start->addMinutes(30);
                }
            }

            $reservedSlots = UserReservation::where('reservation_date', $dateKey)
                ->where('status', '!=', 'Rejected')
                ->pluck('reservation_time')
                ->toArray();

            $availableSlots = array_diff($allSlots, $blockedSlots, $reservedSlots);

            $displaySlots = array_map(fn($time) =>
                date("g:i A", strtotime($time)),
                $availableSlots
            );

            if (!empty($displaySlots)) {
                $slotsData[$dateKey] = array_values($displaySlots);
            }
        }

        return response()->json([
            'success' => true,
            'data' => $slotsData
        ]);
    }
}