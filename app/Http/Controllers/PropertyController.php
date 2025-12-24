<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PropertyController extends Controller
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
     * Display all properties with images
     */
    public function index()
    {
        $properties = Property::with('images')->latest()->get();

        return response()->json([
            'status' => true,
            'message' => 'Properties fetched successfully',
            'data' => $properties,
        ], 200);
    }

    /**
     * Calendar page
     */
    public function testCalendar($slug)
    {
        try {
            $property = Property::where('slug', $slug)->firstOrFail();

            return Inertia::render('Booking/CalendarIntegration', [
                'property' => $property,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found.',
            ], 404);
        }
    }

    /**
     * Property details
     */
    public function showDetails($slug)
    {
        $room = Property::with('images')->where('slug', $slug)->firstOrFail();

        return Inertia::render('MainPages/RoomDetails', [
            'room' => $room,
        ]);
    }

    /**
     * Store property with images
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'price'         => 'required|numeric',
            'location'      => 'required|string',
            'size'          => 'required|string',
            'bedrooms'      => 'required|integer',
            'bathrooms'     => 'required|integer',
            'property_type' => 'required|string',
            'images'        => 'nullable|array',
            'images.*'      => 'image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $property = Property::create($validated);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');

                PropertyImage::create([
                    'property_id' => $property->id,
                    'image_path'  => $path,
                ]);
            }
        }

        /** 🔹 Activity Log */
        $this->logActivity('Created property: ' . $property->title);

        return response()->json([
            'status'  => true,
            'message' => 'Property created successfully',
            'data'    => Property::with('images')->find($property->id),
        ], 201);
    }

    /**
     * Update property + images
     */
    public function update(Request $request, $id)
    {
        $property = Property::find($id);

        if (! $property) {
            return response()->json([
                'status' => false,
                'message' => 'Property not found',
            ], 404);
        }

        $validated = $request->validate([
            'title'         => 'sometimes|required|string|max:255',
            'description'   => 'sometimes|nullable|string',
            'price'         => 'sometimes|required|numeric',
            'location'      => 'sometimes|required|string',
            'size'          => 'sometimes|required|string',
            'bedrooms'      => 'sometimes|required|integer',
            'bathrooms'     => 'sometimes|required|integer',
            'property_type' => 'sometimes|required|string',
            'images'        => 'nullable|array',
            'images.*'      => 'image|mimes:jpg,jpeg,png,webp|max:4096',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'integer',
        ]);

        $property->update($validated);

        // Delete selected images
        if ($request->has('delete_images')) {
            foreach ($request->delete_images as $imageId) {
                $image = PropertyImage::find($imageId);

                if ($image && $image->property_id === $property->id) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                }
            }
        }

        // Add new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');

                PropertyImage::create([
                    'property_id' => $property->id,
                    'image_path'  => $path,
                ]);
            }
        }

        /** 🔹 Activity Log */
        $this->logActivity('Updated property: ' . $property->title);

        return response()->json([
            'status'  => true,
            'message' => 'Property updated successfully',
            'data'    => Property::with('images')->find($property->id),
        ], 200);
    }

    /**
     * Delete property + images
     */
    public function destroy($id)
    {
        $property = Property::with('images')->find($id);

        if (! $property) {
            return response()->json([
                'status' => false,
                'message' => 'Property not found',
            ], 404);
        }

        foreach ($property->images as $img) {
            Storage::disk('public')->delete($img->image_path);
            $img->delete();
        }

        /** 🔹 Activity Log */
        $this->logActivity('Deleted property: ' . $property->title);

        $property->delete();

        return response()->json([
            'status' => true,
            'message' => 'Property and related images deleted successfully',
        ], 200);
    }

    /**
     * Delete single image
     */
    public function deleteImage($imageId)
    {
        $image = PropertyImage::find($imageId);

        if (! $image) {
            return response()->json([
                'status' => false,
                'message' => 'Image not found',
            ], 404);
        }

        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        /** 🔹 Activity Log */
        $this->logActivity('Deleted property image (ID: ' . $imageId . ')');

        return response()->json([
            'status' => true,
            'message' => 'Image deleted successfully',
        ], 200);
    }
}