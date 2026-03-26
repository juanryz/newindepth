<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InternalAiAgent;
use App\Models\InternalAiInstruction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternalAiAgentController extends Controller
{
    public function index()
    {
        $agents = InternalAiAgent::withCount('instructions')
            ->orderBy('sort_order')
            ->orderBy('created_at')
            ->get();

        return Inertia::render('Admin/InternalAi/Index', [
            'agents' => $agents,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:100',
            'description'   => 'nullable|string|max:500',
            'system_prompt' => 'nullable|string|max:3000',
            'avatar_color'  => 'nullable|string|max:50',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['sort_order'] = InternalAiAgent::max('sort_order') + 1;

        InternalAiAgent::create($validated);

        return back()->with('success', 'Agent berhasil dibuat.');
    }

    public function update(Request $request, InternalAiAgent $internalAiAgent)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:100',
            'description'   => 'nullable|string|max:500',
            'system_prompt' => 'nullable|string|max:3000',
            'avatar_color'  => 'nullable|string|max:50',
            'is_active'     => 'nullable|boolean',
        ]);

        $internalAiAgent->update($validated);
        $internalAiAgent->clearCache();

        return back()->with('success', 'Agent berhasil diperbarui.');
    }

    public function destroy(InternalAiAgent $internalAiAgent)
    {
        $internalAiAgent->clearCache();
        $internalAiAgent->delete();

        return back()->with('success', 'Agent berhasil dihapus.');
    }

    // ── Training page ────────────────────────────────────────────────────────
    public function train(InternalAiAgent $internalAiAgent)
    {
        $instructions = [
            'dos'   => $internalAiAgent->instructions()->where('type', 'do')->orderBy('sort_order')->get(),
            'donts' => $internalAiAgent->instructions()->where('type', 'dont')->orderBy('sort_order')->get(),
        ];

        return Inertia::render('Admin/InternalAi/Train', [
            'agent'        => $internalAiAgent,
            'instructions' => $instructions,
        ]);
    }

    // ── Instruction CRUD ─────────────────────────────────────────────────────
    public function storeInstruction(Request $request, InternalAiAgent $internalAiAgent)
    {
        $validated = $request->validate([
            'type'        => 'required|in:do,dont',
            'instruction' => 'required|string|max:500',
            'category'    => 'nullable|string|max:100',
        ]);

        $maxSort = $internalAiAgent->instructions()
            ->where('type', $validated['type'])
            ->max('sort_order') ?? 0;

        $internalAiAgent->instructions()->create([
            'type'        => $validated['type'],
            'instruction' => $validated['instruction'],
            'category'    => $validated['category'] ?? 'general',
            'sort_order'  => $maxSort + 1,
        ]);

        $internalAiAgent->clearCache();

        return back()->with('success', 'Instruksi berhasil ditambahkan.');
    }

    public function updateInstruction(Request $request, InternalAiAgent $internalAiAgent, InternalAiInstruction $instruction)
    {
        $validated = $request->validate([
            'instruction' => 'required|string|max:500',
            'is_active'   => 'nullable|boolean',
            'category'    => 'nullable|string|max:100',
        ]);

        $instruction->update($validated);
        $internalAiAgent->clearCache();

        return back()->with('success', 'Instruksi berhasil diperbarui.');
    }

    public function destroyInstruction(InternalAiAgent $internalAiAgent, InternalAiInstruction $instruction)
    {
        $instruction->delete();
        $internalAiAgent->clearCache();

        return back()->with('success', 'Instruksi berhasil dihapus.');
    }
}
