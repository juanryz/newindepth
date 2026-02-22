import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function LessonsIndex({ course, lessons }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (id, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
            destroy(route('therapist.courses.lessons.destroy', [course.id, id]), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    <span className="text-gray-500 dark:text-gray-400 font-normal underline decoration-indigo-500/30 underline-offset-4">Kurikulum Kelas:</span> {course.title}
                </h2>
                <Link href={route('therapist.courses.index')} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors mt-2 sm:mt-0 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Kembali ke Daftar Kelas
                </Link>
            </div>
        }>
            <Head title={`Kurikulum: ${course.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 mb-4 text-sm text-green-800 rounded-2xl bg-green-50 dark:bg-green-900/40 dark:text-green-400 border border-green-100 dark:border-green-800"
                        >
                            <div className="flex items-center gap-2 font-bold">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                Berhasil!
                            </div>
                            <p className="mt-1">{flash.success}</p>
                        </motion.div>
                    )}

                    <div className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">Kelola Modul Pembelajaran</h3>
                            <p className="text-xs text-gray-500">Atur urutan dan isi materi kelas Anda</p>
                        </div>
                        <Link
                            href={route('therapist.courses.lessons.create', course.id)}
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            + Tambah Modul
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                                <thead>
                                    <tr className="text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                        <th className="px-6 py-4 w-16">No</th>
                                        <th className="px-6 py-4">Materi / Sesi</th>
                                        <th className="px-6 py-4">Tipe & Status</th>
                                        <th className="px-6 py-4 text-center">Preview</th>
                                        <th className="px-6 py-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {lessons.map((lesson, index) => (
                                        <motion.tr
                                            key={lesson.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
                                        >
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-black text-gray-500 dark:text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                                    {lesson.order_column}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase">
                                                        {lesson.title}
                                                    </span>
                                                    {lesson.video_url ? (
                                                        <span className="text-[10px] text-gray-400 font-mono mt-0.5 truncate max-w-[200px]">{lesson.video_url}</span>
                                                    ) : (
                                                        <span className="text-[10px] text-gray-400 mt-0.5">Konten Teks/Artikel</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    {lesson.video_url ? (
                                                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800">Video</span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Teks</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-center">
                                                {lesson.is_preview ? (
                                                    <span className="inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-md text-[9px] font-black uppercase tracking-widest animate-pulse">
                                                        FREE PREVIEW
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-gray-400 font-bold">LOCKED</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-right text-xs font-bold space-x-4">
                                                <Link
                                                    href={route('therapist.courses.lessons.edit', [course.id, lesson.id])}
                                                    className="text-indigo-600 dark:text-indigo-400 hover:underline decoration-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(lesson.id, lesson.title)}
                                                    className="text-red-600 dark:text-red-400 hover:underline decoration-2"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                    {lessons.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4 border border-dashed border-gray-300 dark:border-gray-600">
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-500 italic">Kurikulum masih kosong. Ayo buat materi pertama Anda!</p>
                                                </div>
                                            </td>
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
