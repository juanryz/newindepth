<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.users.index', ['tab' => 'permissions']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create(['name' => str_replace(' ', '_', strtolower($request->name))]);

        return redirect()->back()->with('success', 'Permission berhasil ditambahkan.');
    }

    public function update(Request $request, Permission $permission)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update(['name' => $request->name]);

        return redirect()->back()->with('success', 'Permission berhasil diperbarui.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->back()->with('success', 'Permission berhasil dihapus.');
    }
}
