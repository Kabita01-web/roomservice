<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    //
    protected $fillable =[
        'title',
        'description',
        'price',
        'location',
        'size',
        'bedrooms',
        'bathrooms',
        'property_type',
        'slug',
    ];

    public function images()
{
    return $this->hasMany(PropertyImage::class);
}


    public static function boot()
{
    parent::boot();

    static::creating(function ($property) {
        // Temporary slug before ID exists
        $baseSlug = \Str::slug($property->title);
        $random = rand(100000, 999999);

        // Save a temporary slug (will update after ID is created)
        $property->slug = $baseSlug . '-' . $random;
    });

    static::created(function ($property) {
        // Now ID exists — update slug with ID appended
        $baseSlug = \Str::slug($property->title);
        $random = rand(100000, 999999);

        $property->slug = $baseSlug . '-' . $random . '-' . $property->id;

        // Save updated slug
        $property->save();
    });
}

}
