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
            'view all transactions',
            'manage schedules',
            'view own schedule',
            'view reports',
            'manage users',
            'publish blog posts',
            'manage courses',
            'manage petty cash',
        ];

        foreach ($permissions as $p)
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $p]);
        foreach ($roles as $r)
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => $r]);

        \Spatie\Permission\Models\Role::findByName('cs')->givePermissionTo(['validate transactions', 'view bookings', 'view all transactions', 'manage petty cash']);
        \Spatie\Permission\Models\Role::findByName('therapist')->givePermissionTo(['manage schedules', 'view own schedule', 'view bookings']);
        \Spatie\Permission\Models\Role::findByName('admin')->givePermissionTo(\Spatie\Permission\Models\Permission::all());
        \Spatie\Permission\Models\Role::findByName('super_admin')->givePermissionTo(\Spatie\Permission\Models\Permission::all());
        \Spatie\Permission\Models\Role::findByName('santa_maria')->givePermissionTo(['manage petty cash', 'view reports']);
    }
}
