<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class MethodsDetailController extends Controller
{
    public function indepthTrance()
    {
        return Inertia::render('Methods/IndepthTrance');
    }

    public function supremeTrance()
    {
        return Inertia::render('Methods/SupremeTrance');
    }

    public function indepthSolution()
    {
        return Inertia::render('Methods/IndepthSolution');
    }
}
