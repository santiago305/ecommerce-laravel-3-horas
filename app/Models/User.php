<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
use HasFactory, Notifiable, HasUuids;


protected $fillable = ['name','email','password','role'];


protected $hidden = ['password','remember_token'];


protected $casts = [
'email_verified_at' => 'datetime',
'password' => 'hashed',
];


protected $keyType = 'string';
public $incrementing = false;


// Relaciones
public function carts() { return $this->hasMany(Cart::class); }
public function orders() { return $this->hasMany(Order::class); }
public function activeCart() { return $this->hasOne(Cart::class)->where('status', 'active'); }
}
