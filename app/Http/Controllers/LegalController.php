<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalController extends Controller
{
    public function privacy()
    {
        return Inertia::render('Legal/Privacy');
    }
}
