<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the activity logs.
     */
    public function index(Request $request)
    {
        $activityLogs = ActivityLog::query()
            ->when($request->search, function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('title', 'like', '%' . $request->search . '%')
                      ->orWhere('ip_address', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Activity logs fetched successfully',
            'data' => $activityLogs
        ]);
    }
}