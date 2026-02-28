<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingController extends Controller
{
    public function index()
    {
        $vouchers = Voucher::withCount('userVouchers')
            ->orderByDesc('created_at')
            ->get();

        $packages = Package::orderBy('base_price', 'asc')->get();

        return Inertia::render('Admin/Pricing/Index', [
            'vouchers' => $vouchers,
            'packages' => $packages,
        ]);
    }

    // Voucher Methods
    public function storeVoucher(Request $request)
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
        $validated['is_active'] = $request->boolean('is_active', true);
        Voucher::create($validated);

        return redirect()->back()->with('success', 'Voucher berhasil dibuat.');
    }

    public function updateVoucher(Request $request, Voucher $voucher)
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
        return redirect()->back()->with('success', 'Voucher berhasil diupdate.');
    }

    public function destroyVoucher(Voucher $voucher)
    {
        $voucher->delete();
        return redirect()->back()->with('success', 'Voucher dihapus.');
    }

    // Package Methods
    public function storePackage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|integer|min:0',
            'discount_percentage' => 'required|integer|min:0|max:100',
            'discount_ends_at' => 'nullable|date',
            'is_active' => 'required|boolean',
            'features' => 'nullable|array',
        ]);

        // Generate slug from name
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['name']);

        Package::create($validated);

        return redirect()->back()->with('success', 'Paket layanan berhasil dibuat.');
    }

    public function updatePackage(Request $request, Package $package)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'base_price' => 'required|integer|min:0',
            'discount_percentage' => 'required|integer|min:0|max:100',
            'discount_ends_at' => 'nullable|date',
            'is_active' => 'required|boolean',
            'features' => 'nullable|array',
        ]);

        $package->slug = \Illuminate\Support\Str::slug($validated['name']);
        $package->update($validated);

        return redirect()->back()->with('success', 'Paket berhasil diperbarui.');
    }

    public function destroyPackage(Package $package)
    {
        $package->delete();
        return redirect()->back()->with('success', 'Paket layanan berhasil dihapus.');
    }
}
