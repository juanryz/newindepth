<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ResourcesPermissionSeeder extends Seeder
{
    public function run(): void
    {
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
        ];

        foreach ($resources as $resource => $actions) {
            foreach ($actions as $action) {
                $permissionName = "{$action} {$resource}";
                Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);
            }
        }

        // Keep old permissions for backwards compatibility if needed, or migration them
        // But the user wants a clean CRUD interface, so let's make sure these are the ones we use.

        // Assign to Super Admin
        $superAdmin = Role::findByName('super_admin');
        $superAdmin->syncPermissions(Permission::all());

        // Assign to Admin (initially everything too)
        $admin = Role::findByName('admin');
        $admin->syncPermissions(Permission::all());

        // Assign to CS
        $cs = Role::findByName('cs');
        $cs->syncPermissions(Permission::whereIn('name', [
            'view bookings',
            'create bookings',
            'cancel bookings',
            'view transactions',
            'validate transactions',
            'reject transactions',
            'view petty_cash',
            'create petty_cash',
        ])->get());

        // Assign to Therapist
        $therapist = Role::findByName('therapist');
        $therapist->syncPermissions(Permission::whereIn('name', [
            'view schedules',
            'create schedules',
            'edit schedules',
            'view bookings',
        ])->get());

        // Assign to Santa Maria
        $santaMaria = Role::findByName('santa_maria');
        $santaMaria->syncPermissions(Permission::whereIn('name', [
            'view petty_cash',
            'approve petty_cash',
            'reject petty_cash',
            'view reports',
            'view finance',
        ])->get());
    }
}
