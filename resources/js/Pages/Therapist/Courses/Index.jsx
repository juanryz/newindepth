import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function CoursesIndex({ courses }) {
    const { auth, flash } = usePage().props;
    const isAdmin = auth.user.roles.some(r => ['admin', 'super_admin'].includes(r));
    const { delete: destroy } = useForm();

    const handleDelete = (id, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kelas "${title}" beserta semua materinya?`)) {
            destroy(route('therapist.courses.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isAdmin ? 'Manajemen E-Learning (Admin View)' : 'Manajemen E-Learning (Terapis)'}</h2>}>
            <Head title="Manajemen E-Learning" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/40 dark:text-green-400">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/40 dark:text-red-400">
                            {flash.error}
                        </div>
                    )}

                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow sm:rounded-lg">
                        <div className="text-gray-900 dark:text-gray-100 font-medium tracking-tight h-[38px] flex items-center">
                            {isAdmin ? 'Seluruh Daftar Kelas Online' : 'Daftar Kelas Online Saya'}
                        </div>
                        <Link href={route('therapist.courses.create')} className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 transition ease-in-out duration-150">
                            + Buat Kelas Baru
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thumbnail</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Judul Kelas</th>
                                        {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Instruktur</th>}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jadwal & Kuota</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Harga</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Materi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {courses.map((course) => (
                                        <tr key={course.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {course.thumbnail ? (
                                                    <img src={`/storage/${course.thumbnail}`} alt={course.title} className="h-10 w-16 object-cover rounded" />
                                                ) : (
                                                    <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                <a href={`/courses/${course.slug}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-indigo-600">
                                                    {course.title}
                                                </a>
                                                <div className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[200px]">{course.location}</div>
                                            </td>
                                            {isAdmin && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-bold dark:text-indigo-400">
                                                    {course.instructor?.name || 'Unknown'}
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="font-bold text-gray-700 dark:text-gray-300">
                                                    {course.schedule_at ? new Date(course.schedule_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                                                </div>
                                                <div className="text-xs text-indigo-600 dark:text-indigo-400">Kuota: {course.quota || 0} Orang</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {course.price > 0 ? `Rp ${parseInt(course.price).toLocaleString('id-ID')}` : <span className="text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full text-xs">GRATIS</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center font-bold">
                                                {course.lessons_count}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {course.is_published ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                <Link
                                                    href={route('therapist.courses.lessons.index', course.id)}
                                                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold"
                                                >
                                                    Kelola Kurikulum
                                                </Link>
                                                <Link href={route('therapist.courses.edit', course.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">Edit</Link>
                                                <button onClick={() => handleDelete(course.id, course.title)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {courses.length === 0 && (
                                        <tr>
                                            <td colSpan={isAdmin ? "8" : "7"} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">Belum ada kelas E-Learning. Silakan buat baru.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
