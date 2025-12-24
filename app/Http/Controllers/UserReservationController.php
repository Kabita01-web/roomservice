<?php

namespace App\Http\Controllers;

use App\Models\UserReservation;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserReservationController extends Controller
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

    // ---------------------------------------
    // INDEX - list all reservations
    // ---------------------------------------
    public function index()
    {
        $reservations = UserReservation::with('property')->get();

        return response()->json([
            'success' => true,
            'data' => $reservations,
        ], 200);
    }

    // ---------------------------------------
    // STORE - create new reservation
    // ---------------------------------------
    public function store(Request $request)
    {
        $request->validate([
            'user_name'         => 'required|string',
            'email'             => 'required|email',
            'phone'             => 'required|string',
            'address'           => 'required|string',
            'package_type'      => 'required|string',
            'reservation_date'  => 'required|date',
            'reservation_time'  => 'required',
            'property_id'       => 'required|exists:properties,id',
        ]);

        $exists = UserReservation::where('property_id', $request->property_id)
            ->where('reservation_date', $request->reservation_date)
            ->where('reservation_time', $request->reservation_time)
            ->where('status', '!=', 'Rejected')
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'This time slot is already reserved for this property',
            ], 409);
        }

        $reservation = UserReservation::create([
            'user_name'        => $request->user_name,
            'email'            => $request->email,
            'phone'            => $request->phone,
            'address'          => $request->address,
            'package_type'     => $request->package_type,
            'reservation_date' => $request->reservation_date,
            'reservation_time' => $request->reservation_time,
            'property_id'      => $request->property_id,
            'status'           => 'Pending',
        ]);

        /** 🔹 Activity Log */
        $this->logActivity(
            'Created reservation for ' . $reservation->user_name .
            ' on ' . $reservation->reservation_date .
            ' at ' . $reservation->reservation_time
        );

        return response()->json([
            'success' => true,
            'message' => 'Reservation created successfully',
            'data'    => $reservation,
        ], 201);
    }

    // ---------------------------------------
    // UPDATE - update reservation status
    // ---------------------------------------
    public function update(Request $request, $id)
    {
        $reservation = UserReservation::find($id);

        if (! $reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found',
            ], 404);
        }

        $request->validate([
            'status' => 'required|in:Pending,Accepted,Rejected',
        ]);

        if ($request->status === 'Accepted') {
            $conflict = UserReservation::where('property_id', $reservation->property_id)
                ->where('reservation_date', $reservation->reservation_date)
                ->where('reservation_time', $reservation->reservation_time)
                ->where('id', '!=', $reservation->id)
                ->where('status', 'Accepted')
                ->exists();

            if ($conflict) {
                return response()->json([
                    'success' => false,
                    'message' => 'Another reservation is already accepted for this slot',
                ], 409);
            }
        }

        $oldStatus = $reservation->status;
        $reservation->status = $request->status;
        $reservation->save();

        /** 🔹 Activity Log */
        $this->logActivity(
            'Updated reservation status for ' . $reservation->user_name .
            ' from ' . $oldStatus . ' to ' . $reservation->status
        );

        return response()->json([
            'success' => true,
            'message' => 'Reservation status updated successfully',
            'data'    => $reservation,
        ], 200);
    }

    // ---------------------------------------
    // SHOW - single reservation
    // ---------------------------------------
    public function show($id)
    {
        $reservation = UserReservation::with('property')->find($id);

        if (! $reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $reservation,
        ], 200);
    }

    // ---------------------------------------
    // DELETE - delete reservation
    // ---------------------------------------
    public function destroy($id)
    {
        $reservation = UserReservation::find($id);

        if (! $reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Reservation not found',
            ], 404);
        }

        /** 🔹 Activity Log */
        $this->logActivity(
            'Deleted reservation for ' . $reservation->user_name .
            ' on ' . $reservation->reservation_date .
            ' at ' . $reservation->reservation_time
        );

        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reservation deleted successfully',
        ], 200);
    }
}