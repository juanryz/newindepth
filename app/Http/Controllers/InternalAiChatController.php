<?php

namespace App\Http\Controllers;

use App\Models\InternalAiAgent;
use App\Services\InternalAiChatService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternalAiChatController extends Controller
{
    public function index()
    {
        $agents = InternalAiAgent::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'description', 'avatar_color']);

        $isAdmin = auth()->user()->hasAnyRole(['admin', 'super_admin', 'cs']);

        return Inertia::render('InternalAi/Index', [
            'agents'  => $agents,
            'isAdmin' => $isAdmin,
        ]);
    }

    public function show(InternalAiAgent $internalAiAgent)
    {
        abort_unless($internalAiAgent->is_active, 404);

        return Inertia::render('InternalAi/Chat', [
            'agent' => $internalAiAgent->only('id', 'name', 'description', 'avatar_color'),
        ]);
    }

    public function chat(Request $request, InternalAiAgent $internalAiAgent)
    {
        abort_unless($internalAiAgent->is_active, 404);

        $history = $request->input('history');
        if (is_string($history)) {
            $history = json_decode($history, true);
        }

        if (!is_array($history)) {
            return response()->json(['error' => 'Invalid history format'], 422);
        }

        $request->merge(['history' => $history]);

        $request->validate([
            'history'           => 'required|array|max:30',
            'history.*.role'    => 'required|in:user,assistant',
            'history.*.content' => 'required|string|max:2000',
            'file'              => 'nullable|file|max:10240', // 10MB
        ]);

        $attachment = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('internal-ai/uploads', 'public');
            $url = asset('storage/' . $path);
            $mime = $file->getMimeType();
            $type = str_contains($mime, 'image') ? 'image' : 'file';

            $attachment = [
                'name' => $file->getClientOriginalName(),
                'url'  => $url,
                'type' => $type,
                'mime' => $mime,
            ];

            // Add attachment info to the last user message
            if (!empty($history)) {
                $lastIndex = count($history) - 1;
                if ($history[$lastIndex]['role'] === 'user') {
                    $history[$lastIndex]['attachment'] = $attachment;
                }
            }
        }

        $service = new InternalAiChatService();
        $reply = $service->chat($internalAiAgent, $history);

        return response()->json([
            'reply' => $reply,
            'attachment' => $attachment
        ]);
    }
}
