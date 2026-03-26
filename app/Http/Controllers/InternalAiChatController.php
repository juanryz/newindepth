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

        return Inertia::render('InternalAi/Index', [
            'agents' => $agents,
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

        $request->validate([
            'history'         => 'required|array|max:30',
            'history.*.role'  => 'required|in:user,assistant',
            'history.*.content' => 'required|string|max:2000',
        ]);

        $service = new InternalAiChatService();
        $reply = $service->chat($internalAiAgent, $request->input('history'));

        return response()->json(['reply' => $reply]);
    }
}
