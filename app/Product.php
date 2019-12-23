<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        "title",
        "about",
        "image",
        "price",
    ];
    public $timestamps = false;
    protected $table = 'products';
}
