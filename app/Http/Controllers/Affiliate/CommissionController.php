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

        $commissions = Commission::with('referredUser')
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
        ]);
    }
}
