<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = Voucher::withCount('userVouchers')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Pricing/Vouchers/Index', [
            'vouchers' => $vouchers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|uppercase|unique:vouchers,code|max:50',
            'description' => 'nullable|string|max:255',
            'discount_amount' => 'required|integer|min:1000',
            'max_claims' => 'nullable|integer|min:1',
            'valid_from' => 'required|date',
            'valid_until' => 'nullable|date|after:valid_from',
        ]);

        $validated['type'] = 'promo_code';
        $validated['is_active'] = true;
        $validated['code'] = strtoupper($validated['code']);

        Voucher::create($validated);

        return redirect()->route('admin.vouchers.index')->with('success', 'Voucher berhasil dibuat.');
    }

    public function update(Request $request, Voucher $voucher)
    {
        $validated = $request->validate([
            'description' => 'nullable|string|max:255',
            'discount_amount' => 'required|integer|min:1000',
            'max_claims' => 'nullable|integer|min:1',
            'valid_from' => 'required|date',
            'valid_until' => 'nullable|date|after:valid_from',
            'is_active' => 'required|boolean',
        ]);

        $voucher->update($validated);

        return redirect()->route('admin.vouchers.index')->with('success', 'Voucher berhasil diupdate.');
    }

    public function destroy(Voucher $voucher)
    {
        $voucher->delete();
        return redirect()->route('admin.vouchers.index')->with('success', 'Voucher dihapus.');
    }
}
