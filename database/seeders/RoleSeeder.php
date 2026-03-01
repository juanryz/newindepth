<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['super_admin', 'admin', 'cs', 'therapist', 'patient', 'santa_maria'];
        $permissions = [
            'view bookings',
            'create bookings',
            'cancel bookings',
            'validate transactions',
            'view transactions',
            'reject transactions',
            'view all transactions',
            'manage schedules',
            'view own schedule',
            'view reports',
            'manage users',
            'publish blog posts',
            'view blog_posts',
            'create blog_posts',
            'edit blog_posts',
            'delete blog_posts',
            'analyze blog_posts',
            'manage courses',
            'view courses',
            'create courses',
            'edit courses',
            'delete courses',
            'manage petty cash',
            'view finance',
            'export reports',
            'view petty_cash',
            'create petty_cash',
            'approve petty_cash',
            'reject petty_cash',
            'delete petty_cash',
        ];

        foreach ($permissions as $p)
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $p]);
        foreach ($roles as $r)
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => $r]);

        \Spatie\Permission\Models\Role::findByName('cs')->givePermissionTo(['validate transactions', 'view bookings', 'view all transactions', 'manage petty cash']);
        \Spatie\Permission\Models\Role::findByName('therapist')->givePermissionTo(['manage schedules', 'view own schedule', 'view bookings']);
        \Spatie\Permission\Models\Role::findByName('admin')->givePermissionTo(\Spatie\Permission\Models\Permission::all());
        \Spatie\Permission\Models\Role::findByName('super_admin')->givePermissionTo(\Spatie\Permission\Models\Permission::all());
        \Spatie\Permission\Models\Role::findByName('santa_maria')->givePermissionTo([
            'manage petty cash',
            'view reports',
            'view finance',
            'export reports',
            'view petty_cash',
            'approve petty_cash',
            'reject petty_cash',
        ]);
    }
}
