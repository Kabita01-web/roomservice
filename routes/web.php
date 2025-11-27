<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Dashboards
    // In this section you can define all the admin routes that only authenticated users can access

    Route::get('/activity-log',function(){
        return Inertia::render('AdminPages/ActivityLog');
    });

    Route::get('/property',function(){
        return Inertia::render('AdminPages/Property');
    });

    Route::get('/user-management',function(){
        return Inertia::render('AdminPages/UserManagement');
    });

    Route::get('/settings',function(){
        return Inertia::render('AdminPages/Settings');
    });


    Route::get('/dashboard',function(){
        return Inertia::render('AdminPages/Dashboard');
    });


    // Route::get('/',function(){
    //     return Inertia::render('AdminPages/ActivityLog');
    // });
});


Route::get('/',function(){
    return Inertia::render('HomePage/Home');
});


Route::get('/privacy-policy',function(){
    return Inertia::render('MainPages/PrivacyPolicy');
});

Route::get('/terms-conditions',function(){
    return Inertia::render('MainPages/TermsandConditions');
});
Route::get('/contact',function(){
    return Inertia::render('MainPages/Contact');
});
Route::get('/requirement',function(){
    return Inertia::render('MainPages/Requirement');
});
Route::get('/about',function(){
    return Inertia::render('MainPages/About');
});
Route::get('/room',function(){
    return Inertia::render('MainPages/Room');
});



Route::get('/ourproperty', [PropertyController::class, 'index'])->name('ourproperty.index');
Route::post('/ourproperty', [PropertyController::class, 'store'])->name('ourproperty.store');
Route::put('/ourproperty/{id}', [PropertyController::class, 'update'])->name('ourproperty.update');
Route::delete('/ourproperty/{id}', [PropertyController::class, 'destroy'])->name('ourproperty.destroy');
Route::delete('/ourproperty/image/{id}', [PropertyController::class, 'deleteImage'])->name('ourproperty.deleteImage');




Route::get('/ouruser', [UserController::class, 'index'])->name('ouruser.index');        // Get all ouruser
Route::post('/ouruser', [UserController::class, 'store'])->name('ouruser.store');       // Create user
Route::put('/ouruser/{user}', [UserController::class, 'update'])->name('ouruser.update'); // Update user
Route::delete('/ouruser/{user}', [UserController::class, 'destroy'])->name('ouruser.destroy'); // Delete user


Route::middleware(['auth', 'role:super admin'])->group(function () {
    // In this you have to define all the routes that only super admin can access
});

require __DIR__.'/auth.php';
