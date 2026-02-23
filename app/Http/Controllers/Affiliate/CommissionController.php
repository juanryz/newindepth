<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommissionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $commissions = Commission::with(['referredUser', 'transaction.transactionable'])
            ->where('affiliate_user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        $totalEarned = Commission::where('affiliate_user_id', $user->id)
            ->where('status', 'paid')
            ->sum('commission_amount');

        $pendingAmount = Commission::where('affiliate_user_id', $user->id)
            ->whereIn('status', ['pending', 'approved'])
            ->sum('commission_amount');

        return Inertia::render('Affiliate/Dashboard', [
            'commissions' => $commissions,
            'totalEarned' => $totalEarned,
            'pendingAmount' => $pendingAmount,
            'referralLink' => url('/?ref=' . $user->referral_code),
            'hasSignedAgreement' => $user->hasSignedAffiliateAgreement(),
        ]);
    }

    public function storeAgreement(Request $request)
    {
        $request->validate([
            'signature' => 'required|string',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'age' => 'required|integer|min:1',
            'gender' => 'required|string|in:Laki-laki,Perempuan',
        ]);

        $user = $request->user();
        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'age' => (int)$request->age,
            'gender' => $request->gender,
            'affiliate_agreement_signed_at' => now(),
            'affiliate_signature' => $request->signature,
        ]);

        return back()->with('success', 'Perjanjian affiliate berhasil disetujui.');
    }

    public function showAgreement(Request $request)
    {
        $user = $request->user();

        if (!$user->hasSignedAffiliateAgreement()) {
            return redirect()->route('affiliate.dashboard');
        }

        return Inertia::render('Affiliate/AgreementDetail', [
            'userModel' => $user,
        ]);
    }
}
