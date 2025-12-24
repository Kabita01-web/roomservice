<?php

namespace App\Http\Controllers;

use App\Models\BlockReservation;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlockReservationController extends Controller
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
     * Display all block reservations
     */
    public function index()
    {
        $blocks = BlockReservation::all();

        return response()->json([
            'success' => true,
            'data' => $blocks
        ]);
    }

    /**
     * Store a new block reservation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date'        => 'required|date',
            'start_time'  => 'required',
            'end_time'    => 'required',
            'duration'    => 'required|numeric',
            'reason'      => 'nullable|string',
        ]);

        $block = BlockReservation::create($validated);

        /** 🔹 Activity Log */
        $this->logActivity(
            'Created block reservation on ' . $block->date .
            ' from ' . $block->start_time .
            ' to ' . $block->end_time
        );

        return response()->json([
            'success' => true,
            'message' => 'Block reservation created successfully.',
            'data'    => $block
        ], 201);
    }

    /**
     * Update an existing block reservation
     */
    public function update(Request $request, $id)
    {
        $block = BlockReservation::findOrFail($id);

        $validated = $request->validate([
            'date'        => 'sometimes|date',
            'start_time'  => 'sometimes',
            'end_time'    => 'sometimes',
            'duration'    => 'sometimes|numeric',
            'reason'      => 'nullable|string',
        ]);

        $block->update($validated);

        /** 🔹 Activity Log */
        $this->logActivity(
            'Updated block reservation (ID: ' . $block->id . ') on ' .
            $block->date
        );

        return response()->json([
            'success' => true,
            'message' => 'Block reservation updated successfully.',
            'data'    => $block
        ]);
    }

    /**
     * Delete an existing block reservation
     */
    public function destroy($id)
    {
        $block = BlockReservation::findOrFail($id);

        /** 🔹 Activity Log (before delete) */
        $this->logActivity(
            'Deleted block reservation on ' . $block->date .
            ' from ' . $block->start_time .
            ' to ' . $block->end_time
        );

        $block->delete();

        return response()->json([
            'success' => true,
            'message' => 'Block reservation deleted successfully.'
        ]);
    }
}