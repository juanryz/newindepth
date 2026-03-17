<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
        'seo_analysis' => 'json',
        'ai_outline' => 'json',
        'ai_metadata' => 'json',
        'secondary_keywords' => 'array',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Check if this post is scheduled for future publishing.
     */
    public function isScheduled(): bool
    {
        return $this->scheduled_at && $this->scheduled_at->isFuture() && !$this->is_published;
    }

    /**
     * Scope: posts that are due for publishing.
     */
    public function scopeDueForPublishing($query)
    {
        return $query->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', now())
            ->where('is_published', false);
    }
}
