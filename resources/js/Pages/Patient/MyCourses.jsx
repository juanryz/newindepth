import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function MyCourses({ courses = [] }) {
    const safeCourses = Array.isArray(courses) ? courses : [];

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Pelatihan Praktisi Saya</h2>}>
            <Head title="Pelatihan Praktisi Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-2xl border border-blue-100 dark:border-blue-800/50 shadow-sm flex items-start gap-4">
                        <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Akses Materi Pelatihan Anda</h3>
                            <p className="text-sm">Di sini Anda dapat melihat dan mengakses seluruh video serta materi pelatihan yang sudah Anda miliki.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {safeCourses.length === 0 ? (
                            <div className="col-span-full py-20 text-center rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                                    Anda belum memiliki kelas aktif.
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                    Silakan pilih kelas di katalog E-Learning.
                                </p>
                            </div>
                        ) : (
                            safeCourses.map(course => {
                                if (!course || !course.id || !course.slug) return null;

                                const title = course.title || 'Untitled Course';
                                const description = (course.description || '').replace(/(<([^>]+)>)/gi, '').substring(0, 100);

                                return (
                                    <motion.article
                                        key={course.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.3 }}
                                        className="group bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
                                    >
                                        <Link href={`/courses/${course.slug}`} className="block relative aspect-video overflow-hidden">
                                            {course.thumbnail ? (
                                                <img src={`/storage/${course.thumbnail}`} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/10 flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-indigo-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </Link>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <Link href={`/courses/${course.slug}`} className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                                    {description}
                                                </p>
                                            </Link>
                                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 rounded-full">
                                                    Akses Penuh
                                                </span>
                                                <Link
                                                    href={`/courses/${course.slug}`}
                                                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                                                >
                                                    Mulai Belajar &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
