<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserReservation extends Model
{
    //
    protected $fillable = [
        'user_name',
        'email',
        'phone',
        'address',
        'package_type',
        'reservation_date',
        'reservation_time',
        'status',
        'property_id'

    ];
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
