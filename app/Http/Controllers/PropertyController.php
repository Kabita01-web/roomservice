<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    /**
     * Display all properties with images
     */
    public function index()
    {
        $properties = Property::with('images')->latest()->get();

        return response()->json([
            'status' => true,
            'message' => 'Properties fetched successfully',
            'data' => $properties
        ], 200);
    }

    /**
     * Store a newly created property with single/multiple images
     */
    public function store(Request $request)
    {
        // Validate inputs
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'description'   => 'nullable|string',
            'price'         => 'required|numeric',
            'location'      => 'required|string',
            'size'          => 'required|string',
            'bedrooms'      => 'required|integer',
            'bathrooms'     => 'required|integer',
            'property_type' => 'required|string',

            // Images
            'images'        => 'nullable|array',
            'images.*'      => 'image|mimes:jpg,jpeg,png,webp|max:4096'
        ]);

        // Create property
        $property = Property::create($validated);

        /* --------------------------------------------------------
         |  Store Single or Multiple Images
         -------------------------------------------------------- */
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');

                PropertyImage::create([
                    'property_id' => $property->id,
                    'image_path'  => $path,
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Property created successfully',
            'data' => Property::with('images')->find($property->id)
        ], 201);
    }

    /**
     * Update property + add new images + delete selected images
     */
    public function update(Request $request, $id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'status' => false,
                'message' => 'Property not found'
            ], 404);
        }

        // Validate
        $validated = $request->validate([
            'title'         => 'sometimes|required|string|max:255',
            'description'   => 'sometimes|nullable|string',
            'price'         => 'sometimes|required|numeric',
            'location'      => 'sometimes|required|string',
            'size'          => 'sometimes|required|string',
            'bedrooms'      => 'sometimes|required|integer',
            'bathrooms'     => 'sometimes|required|integer',
            'property_type' => 'sometimes|required|string',

            // Images
            'images'        => 'nullable|array',
            'images.*'      => 'image|mimes:jpg,jpeg,png,webp|max:4096',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'sometimes|integer'
        ]);

        // Update details
        $property->update($validated);

        /* --------------------------------------------------------
         |  Delete selected images
         -------------------------------------------------------- */
        if ($request->has('delete_images')) {
            foreach ($request->delete_images as $imageId) {
                $image = PropertyImage::find($imageId);
                if ($image && $image->property_id == $property->id) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                }
            }
        }

        /* --------------------------------------------------------
         |  Add new images when updating
         -------------------------------------------------------- */
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');

                PropertyImage::create([
                    'property_id' => $property->id,
                    'image_path'  => $path,
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Property updated successfully',
            'data' => Property::with('images')->find($property->id)
        ], 200);
    }

    /**
     * Delete full property + all images
     */
    public function destroy($id)
    {
        $property = Property::with('images')->find($id);

        if (!$property) {
            return response()->json([
                'status' => false,
                'message' => 'Property not found'
            ], 404);
        }

        // Delete images from storage
        foreach ($property->images as $img) {
            Storage::disk('public')->delete($img->image_path);
            $img->delete();
        }

        // Delete property
        $property->delete();

        return response()->json([
            'status' => true,
            'message' => 'Property and related images deleted successfully'
        ], 200);
    }

    /**
     * Delete a single property image
     */
    public function deleteImage($imageId)
    {
        $image = PropertyImage::find($imageId);

        if (!$image) {
            return response()->json([
                'status' => false,
                'message' => 'Image not found'
            ], 404);
        }

        // Remove from storage
        Storage::disk('public')->delete($image->image_path);

        // Delete DB record
        $image->delete();

        return response()->json([
            'status' => true,
            'message' => 'Image deleted successfully'
        ], 200);
    }
}