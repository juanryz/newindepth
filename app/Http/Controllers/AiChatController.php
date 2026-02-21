<?php

namespace App\Http\Controllers;

use App\Services\GeneralAiChatService;
use Illuminate\Http\Request;

class AiChatController extends Controller
{
    public function chat(Request $request, GeneralAiChatService $aiService)
    {
        $request->validate([
            'history' => 'required|array',
            'history.*.role' => 'required|string|in:user,assistant',
            'history.*.content' => 'required|string',
        ]);

        $result = $aiService->chat($request->history);

        return response()->json($result);
    }
}
