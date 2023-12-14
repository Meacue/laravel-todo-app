<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'responsible',
    ];

    protected $hidden = [
        'user',
    ];

    protected $casts = [
        // 
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responsible_id');
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function getResponsibleAttribute(): String 
    {
        // $responsibleUser = [
        //     $this->user->id => $this->user->name
        // ];
        
        $userFIO = $this->user->surname." ".$this->user->name." ".$this->user->lastname;

        return $userFIO;
    }

}
