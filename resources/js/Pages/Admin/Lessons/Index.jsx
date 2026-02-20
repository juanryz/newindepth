import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function LessonsIndex({ course, lessons }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
            destroy(route('admin.courses.lessons.destroy', [course.id, id]), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <span className="text-gray-500 dark:text-gray-400 font-normal">Materi Kelas:</span> {course.title}
                </h2>
                <Link href={route('admin.courses.index')} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mt-2 sm:mt-0">
                    &larr; Kembali ke Daftar Kelas
                </Link>
            </div>
        }>
            <Head title={`Materi: ${course.title}`} />

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
                        <div className="text-gray-900 dark:text-gray-100 font-medium tracking-tight">
                            Urutan dan Daftar Materi
                        </div>
                        <Link href={route('admin.courses.lessons.create', course.id)} className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 transition ease-in-out duration-150">
                            + Tambah Materi
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-16">Urutan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Judul Materi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipe Konten</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Preview (Gratis)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {lesson.order_column}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {lesson.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex gap-2">
                                                    {lesson.video_url && <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">Video</span>}
                                                    {lesson.content && <span className="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">Teks</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {lesson.is_preview ? (
                                                    <span className="text-green-600 dark:text-green-400 font-semibold">Ya (Gratis dilihat)</span>
                                                ) : (
                                                    <span className="text-gray-400">Tidak (Harus beli)</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                <Link href={route('admin.courses.lessons.edit', [course.id, lesson.id])} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">Edit</Link>
                                                <button onClick={() => handleDelete(lesson.id, lesson.title)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {lessons.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">Belum ada materi untuk kelas ini.</td>
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
