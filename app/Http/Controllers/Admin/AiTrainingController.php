<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiTrainingInstruction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AiTrainingController extends Controller
{
    public function index()
    {
        $instructions = AiTrainingInstruction::getAllGrouped();
        return Inertia::render('Admin/Blog/AiTraining', [
            'instructions' => $instructions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:do,dont',
            'instruction' => 'required|string|max:500',
            'category' => 'nullable|string|max:100',
        ]);

        $maxSort = AiTrainingInstruction::where('type', $validated['type'])->max('sort_order') ?? 0;
        $validated['sort_order'] = $maxSort + 1;
        $validated['category'] = $validated['category'] ?? 'general';

        AiTrainingInstruction::create($validated);
        AiTrainingInstruction::clearCache();

        return back()->with('success', 'Instruksi berhasil ditambahkan.');
    }

    public function update(Request $request, AiTrainingInstruction $instruction)
    {
        $validated = $request->validate([
            'instruction' => 'required|string|max:500',
            'is_active' => 'nullable|boolean',
            'category' => 'nullable|string|max:100',
        ]);

        $instruction->update($validated);
        AiTrainingInstruction::clearCache();

        return back()->with('success', 'Instruksi berhasil diperbarui.');
    }

    public function destroy(AiTrainingInstruction $instruction)
    {
        $instruction->delete();
        AiTrainingInstruction::clearCache();

        return back()->with('success', 'Instruksi berhasil dihapus.');
    }

    /**
     * Bulk update (reorder, toggle active, etc.)
     */
    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'instructions' => 'required|array',
            'instructions.*.id' => 'required|exists:ai_training_instructions,id',
            'instructions.*.instruction' => 'required|string|max:500',
            'instructions.*.is_active' => 'required|boolean',
            'instructions.*.sort_order' => 'required|integer',
        ]);

        foreach ($validated['instructions'] as $data) {
            AiTrainingInstruction::where('id', $data['id'])->update([
                'instruction' => $data['instruction'],
                'is_active' => $data['is_active'],
                'sort_order' => $data['sort_order'],
            ]);
        }

        AiTrainingInstruction::clearCache();
        return back()->with('success', 'Semua instruksi berhasil diperbarui.');
    }
}
