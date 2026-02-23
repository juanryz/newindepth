<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::with('recordedBy')
            ->orderBy('expense_date', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Expenses/Index', [
            'expenses' => $expenses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'receipt' => 'nullable|image|max:2048',
        ]);

        $validated['recorded_by'] = auth()->id();

        if ($request->hasFile('receipt')) {
            $validated['receipt'] = $request->file('receipt')->store('expenses', 'public');
        }

        Expense::create($validated);

        return redirect()->back()->with('success', 'Pengeluaran berhasil dicatat.');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
        return redirect()->back()->with('success', 'Data pengeluaran berhasil dihapus.');
    }
}
