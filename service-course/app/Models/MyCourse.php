<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MyCourse extends Model
{
    protected $table = 'my_courses';

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:m:s',
        'updated_at' => 'datetime:Y-m-d H:m:s',
    ];

    protected $fillable = [
        'course_id',
        'user_id'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
