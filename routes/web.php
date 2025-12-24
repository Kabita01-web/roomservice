<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\BlockReservationController;
use App\Http\Controllers\UserReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityLogController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});





    //-----------------------------------------
    // Public Routes
    //-----------------------------------------


    //-----------------------------------------
    // Home Page
    //-----------------------------------------
    Route::get('/',function(){
        return Inertia::render('HomePage/Home');
    });

    //-----------------------------------------
    // Privacy Policy Page
    //-----------------------------------------

    Route::get('/privacy-policy',function(){
        return Inertia::render('MainPages/PrivacyPolicy');
    });

    //-----------------------------------------
    // Terms and Conditions Page
    //-----------------------------------------

    Route::get('/terms-conditions',function(){
        return Inertia::render('MainPages/TermsandConditions');
    });

    //-----------------------------------------
    // Contact Page
    //-----------------------------------------

    Route::get('/contact',function(){
        return Inertia::render('MainPages/Contact');
    });

    //-----------------------------------------
    // Help Page
    //-----------------------------------------

    Route::get('/help',function(){
        return Inertia::render('MainPages/Help');
    });

    //-----------------------------------------
    // About Page
    //-----------------------------------------

    Route::get('/about',function(){
        return Inertia::render('MainPages/About');
    });

    //-----------------------------------------
    // Room Details Page with using Slug
    //-----------------------------------------

    Route::get('/room/{slug}',[PropertyController::class, 'showDetails'])->name('room.showDetails');

    //-----------------------------------------
    // Rooms Page
    //-----------------------------------------

    Route::get('/rooms',function(){
        return Inertia::render('MainPages/Rooms');
    });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



    //-----------------------------------------
    // Only Authenticated Users Routes
    //-----------------------------------------

Route::middleware('auth')->group(function () {

    //-----------------------------------------
    // 
    //-----------------------------------------
    Route::get('/activity-log',function(){
        return Inertia::render('AdminPages/ActivityLog');
    });

    //-----------------------------------------
    // 
    //-----------------------------------------

    Route::get('/property',function(){
        return Inertia::render('AdminPages/Property');
    });

    //-----------------------------------------
    // 
    //-----------------------------------------

    Route::get('/user-management',function(){
        return Inertia::render('AdminPages/UserManagement');
    });

    //-----------------------------------------
    // 
    //-----------------------------------------

    Route::get('/settings',function(){
        return Inertia::render('AdminPages/Settings');
    });

    //-----------------------------------------
    // 
    //-----------------------------------------

    Route::get('/dashboard',function(){
        return Inertia::render('AdminPages/Dashboard');
    });

    //-----------------------------------------
    // 
    //-----------------------------------------

    Route::get('/block-reservation', function () {
    return Inertia::render('AdminPages/BlockReservation');
    });

    //-----------------------------------------
    // 
    //-----------------------------------------

    Route::get('/user-reservation', function () {
    return Inertia::render('AdminPages/UserReservation');
    });

});




Route::get('/ourproperty', [PropertyController::class, 'index'])->name('ourproperty.index');
Route::post('/ourproperty', [PropertyController::class, 'store'])->name('ourproperty.store');
Route::put('/ourproperty/{id}', [PropertyController::class, 'update'])->name('ourproperty.update');
Route::delete('/ourproperty/{id}', [PropertyController::class, 'destroy'])->name('ourproperty.destroy');
Route::delete('/ourproperty/image/{id}', [PropertyController::class, 'deleteImage'])->name('ourproperty.deleteImage');


Route::get('/ourreservations/timeslots', [ReservationController::class, 'getTimeSlotsForCalendar'])->name('ourreservations.timeslots');
Route::get('/ourreservations/availability', [ReservationController::class, 'checkAvailability'])->name('ourreservations.availability');
Route::post('/ourreservations', [ReservationController::class, 'store'])->name('ourreservations.store');

    Route::get('/calendar/{slug}', [PropertyController::class, 'testCalendar'])->name('calendar.show');


    Route::get('/ourblockreservations', [BlockReservationController::class, 'index'])->name('ourblockreservations.index');
    Route::post('/ourblockreservations', [BlockReservationController::class, 'store'])->name('ourblockreservations.store');
    Route::put('/ourblockreservations/{id}', [BlockReservationController::class, 'update'])->name('ourblockreservations.update');
    Route::delete('/ourblockreservations/{id}', [BlockReservationController::class, 'destroy'])->name('ourblockreservations.destroy');

    Route::get('/ouruserreservations', [UserReservationController::class, 'index'])->name('ouruserreservations.index');
    Route::post('/ouruserreservations', [UserReservationController::class, 'store'])->name('ouruserreservations.store');
    Route::put('/ouruserreservations/{id}', [UserReservationController::class, 'update'])->name('ouruserreservations.update');
    Route::delete('/ouruserreservations/{id}', [UserReservationController::class, 'destroy'])->name('ouruserreservations.destroy');


    //-----------------------------------------
    // Admin Only Routes
    //-----------------------------------------
    Route::middleware(['auth', 'role:admin'])->group(function () {

    //-----------------------------------------
    // Activity Logs Routes
    //-----------------------------------------

    Route::get('/activity-logs', [ActivityLogController::class, 'index'])->name('ourlogs.index');  

    //-----------------------------------------
    // Our User Routes
    //-----------------------------------------

    Route::get('/ouruser', [UserController::class, 'index'])->name('ouruser.index');   
    Route::post('/ouruser', [UserController::class, 'store'])->name('ouruser.store');      
    Route::put('/ouruser/{user}', [UserController::class, 'update'])->name('ouruser.update'); 
    Route::delete('/ouruser/{user}', [UserController::class, 'destroy'])->name('ouruser.destroy');
       
    //-----------------------------------------
    // Our User Routes
    //-----------------------------------------
});

require __DIR__.'/auth.php';