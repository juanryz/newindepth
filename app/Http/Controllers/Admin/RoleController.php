<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.users.index', ['tab' => 'roles']);
    }

    public function create()
    {
        // Auto-heal missing permissions in production database
        $resources = [
            'bookings' => ['view', 'create', 'edit', 'delete', 'cancel', 'assign'],
            'transactions' => ['view', 'create', 'edit', 'delete', 'validate', 'reject'],
            'schedules' => ['view', 'create', 'edit', 'delete', 'bulk_delete'],
            'users' => ['view', 'create', 'edit', 'delete', 'view_agreement'],
            'roles' => ['view', 'create', 'edit', 'delete'],
            'permissions' => ['view', 'create', 'edit', 'delete'],
            'blog_posts' => ['view', 'create', 'edit', 'delete', 'publish', 'analyze'],
            'courses' => ['view', 'create', 'edit', 'delete'],
            'lessons' => ['view', 'create', 'edit', 'delete'],
            'reports' => ['view', 'export'],
            'petty_cash' => ['view', 'create', 'edit', 'delete', 'approve', 'reject'],
            'finance' => ['view'],
            'expenses' => ['view', 'create', 'edit', 'delete'],
            'packages' => ['view', 'create', 'edit', 'delete'],
            'vouchers' => ['view', 'create', 'edit', 'delete'],
            'own_schedule' => ['view'],
            'all_transactions' => ['view']
        ];

        foreach ($resources as $resource => $actions) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$action} {$resource}", 'guard_name' => 'web']);
            }
        }

        $permissions = Permission::all();

        return Inertia::render('Admin/Roles/Form', [
            'roleModel' => new Role(),
            'permissions' => $permissions,
            'rolePermissions' => [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'permissions' => 'array',
        ]);

        $role = Role::create(['name' => $request->name]);

        if ($request->filled('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('admin.roles.index')->with('success', 'Role berhasil ditambahkan.');
    }

    public function edit(Role $role)
    {
        // Auto-heal missing permissions in production database
        $resources = [
            'bookings' => ['view', 'create', 'edit', 'delete', 'cancel', 'assign'],
            'transactions' => ['view', 'create', 'edit', 'delete', 'validate', 'reject'],
            'schedules' => ['view', 'create', 'edit', 'delete', 'bulk_delete'],
            'users' => ['view', 'create', 'edit', 'delete', 'view_agreement'],
            'roles' => ['view', 'create', 'edit', 'delete'],
            'permissions' => ['view', 'create', 'edit', 'delete'],
            'blog_posts' => ['view', 'create', 'edit', 'delete', 'publish', 'analyze'],
            'courses' => ['view', 'create', 'edit', 'delete'],
            'lessons' => ['view', 'create', 'edit', 'delete'],
            'reports' => ['view', 'export'],
            'petty_cash' => ['view', 'create', 'edit', 'delete', 'approve', 'reject'],
            'finance' => ['view'],
            'expenses' => ['view', 'create', 'edit', 'delete'],
            'packages' => ['view', 'create', 'edit', 'delete'],
            'vouchers' => ['view', 'create', 'edit', 'delete'],
            'own_schedule' => ['view'],
            'all_transactions' => ['view']
        ];

        foreach ($resources as $resource => $actions) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$action} {$resource}", 'guard_name' => 'web']);
            }
        }

        $permissions = Permission::all();
        $rolePermissions = $role->name === 'super_admin'
            ? $permissions->pluck('name')
            : $role->permissions->pluck('name');

        return Inertia::render('Admin/Roles/Form', [
            'roleModel' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'permissions' => 'array',
        ]);

        $role->update(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->route('admin.roles.index')->with('success', 'Role berhasil diperbarui.');
    }

    public function destroy(Role $role)
    {
        if ($role->name === 'super_admin') {
            return redirect()->back()->with('error', 'Role super_admin tidak dapat dihapus.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role berhasil dihapus.');
    }
}
