<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function instructor()
    {
        return $this->belongsTo(User::class , 'instructor_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('transaction_id', 'enrolled_at');
    }
}
