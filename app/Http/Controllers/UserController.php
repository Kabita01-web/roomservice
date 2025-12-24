<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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
     * Display all users
     */
    public function index()
    {
        $users = User::all();

        return response()->json([
            'status'  => true,
            'message' => 'Users fetched successfully.',
            'data'    => $users
        ], 200);
    }

    /**
     * Store a new user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role'     => 'required|string',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $imagePath = null;

        // Handle image upload
        if ($request->hasFile('image')) {

            if (! file_exists(public_path('users'))) {
                mkdir(public_path('users'), 0777, true);
            }

            $imageName = time() . '_' . $request->image->getClientOriginalName();
            $request->image->move(public_path('users'), $imageName);

            $imagePath = 'users/' . $imageName;
        }

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role'     => $validated['role'],
            'image'    => $imagePath,
        ]);

        /** 🔹 Activity Log */
        $this->logActivity('Created user: ' . $user->name . ' (' . $user->email . ')');

        return response()->json([
            'status'  => true,
            'message' => 'User created successfully.',
            'data'    => $user
        ], 201);
    }

    /**
     * Update an existing user
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'email'    => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role'     => 'sometimes|required|string',
            'image'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        // Handle image update
        if ($request->hasFile('image')) {

            if (! file_exists(public_path('users'))) {
                mkdir(public_path('users'), 0777, true);
            }

            if ($user->image && file_exists(public_path($user->image))) {
                unlink(public_path($user->image));
            }

            $imageName = time() . '_' . $request->image->getClientOriginalName();
            $request->image->move(public_path('users'), $imageName);

            $validated['image'] = 'users/' . $imageName;
        }

        // Update password only if provided
        if (! empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        /** 🔹 Activity Log */
        $this->logActivity('Updated user: ' . $user->name . ' (' . $user->email . ')');

        return response()->json([
            'status'  => true,
            'message' => 'User updated successfully.',
            'data'    => $user
        ], 200);
    }

    /**
     * Delete a user
     */
    public function destroy(User $user)
    {
        if ($user->image && file_exists(public_path($user->image))) {
            unlink(public_path($user->image));
        }

        /** 🔹 Activity Log */
        $this->logActivity('Deleted user: ' . $user->name . ' (' . $user->email . ')');

        $user->delete();

        return response()->json([
            'status'  => true,
            'message' => 'User deleted successfully.'
        ], 200);
    }
}