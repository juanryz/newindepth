import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function UsersForm({ userModel, roles, userRoles }) {
    const isEditing = !!userModel.id;

    const { data, setData, post, put, processing, errors } = useForm({
        name: userModel.name || '',
        email: userModel.email || '',
        phone: userModel.phone || '',
        emergency_contact_name: userModel.emergency_contact_name || '',
        emergency_contact_phone: userModel.emergency_contact_phone || '',
        emergency_contact_relation: userModel.emergency_contact_relation || '',
        password: '',
        password_confirmation: '',
        roles: userRoles || [],
    });

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('roles', [...data.roles, value]);
        } else {
            setData('roles', data.roles.filter((role) => role !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('admin.users.update', userModel.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEditing ? 'Edit User' : 'Tambah User Baru'}</h2>}>
            <Head title={isEditing ? 'Edit User' : 'Tambah User'} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="phone" value="Nomor Telepon/WA" />
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        className="mt-1 block w-full"
                                        placeholder="08xxxxxxxx"
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Kontak Darurat (Optional)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="emergency_contact_name" value="Nama Kontak Darurat" />
                                        <TextInput
                                            id="emergency_contact_name"
                                            type="text"
                                            value={data.emergency_contact_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="emergency_contact_phone" value="Nomor Kontak Darurat" />
                                        <TextInput
                                            id="emergency_contact_phone"
                                            type="text"
                                            value={data.emergency_contact_phone}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="emergency_contact_relation" value="Hubungan (Misal: Orang Tua, Pasangan)" />
                                        <TextInput
                                            id="emergency_contact_relation"
                                            type="text"
                                            value={data.emergency_contact_relation}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('emergency_contact_relation', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4">Keamanan</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel htmlFor="password" value={isEditing ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password'} />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required={!isEditing}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required={!isEditing && data.password !== ''}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                <InputLabel value="Akses & Roles (Role)" />
                                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                                    {roles.map((role) => (
                                        <label key={role.id} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="roles[]"
                                                value={role.name}
                                                checked={data.roles.includes(role.name)}
                                                onChange={handleRoleChange}
                                                className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{role.name.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>
                                <InputError message={errors.roles} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4 space-x-3 gap-3">
                                <Link href={route('admin.users.index')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Simpan Perubahan' : 'Buat User'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

