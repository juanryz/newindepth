import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function LmsShow({ course, isEnrolled }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? null;

    return (
        <PublicLayout>
            <Head title={course.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Back link */}
                    <div className="px-4 sm:px-0">
                        <Link href={route('courses.index')} className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Kembali ke Katalog
                        </Link>
                    </div>

                    {/* Course Hero */}
                    <div className="bg-white dark:bg-gray-800/60 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700/50">
                        <div className="md:flex">
                            <div className="md:w-1/3 bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center p-6">
                                {course.thumbnail ? (
                                    <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-auto rounded-lg shadow-md" />
                                ) : (
                                    <div className="w-48 h-48 bg-indigo-200 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-500">
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                    </div>
                                )}
                            </div>
                            <div className="p-8 md:w-2/3 flex flex-col justify-center">
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">{course.title}</h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{course.description}</p>

                                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Investasi</p>
                                        <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                                            {Number(course.price) === 0 ? 'Gratis' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                                        </p>
                                    </div>
                                    <div>
                                        {!user ? (
                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow"
                                            >
                                                Masuk untuk Bergabung
                                            </Link>
                                        ) : isEnrolled ? (
                                            <span className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-300 text-green-800 rounded-md font-semibold text-sm uppercase tracking-widest">
                                                Kamu Sudah Bergabung
                                            </span>
                                        ) : (
                                            <button className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow">
                                                Beli Kelas Ini
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Curriculum */}
                    <div className="bg-white dark:bg-gray-800/60 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700/50 mb-8">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700/50">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Materi Pembelajaran</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{course.lessons?.length || 0} Materi Tersedia</p>
                        </div>
                        <div className="p-0">
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700/50">
                                {course.lessons && course.lessons.map((lesson, idx) => (
                                    <li key={lesson.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <div className="px-6 py-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <p className="text-md font-medium text-gray-900 dark:text-white">{lesson.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize flex items-center gap-1">
                                                        {lesson.type === 'video' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                                                        {lesson.type}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {lesson.is_preview && !isEnrolled && (
                                                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded uppercase">Preview Gratis</span>
                                                )}

                                                {(isEnrolled || lesson.is_preview) ? (
                                                    <Link href={route('lessons.show', [course.slug, lesson.id])} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 font-semibold text-sm">
                                                        Mulai Belajar &rarr;
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400 text-sm flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                        Terkunci
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {course.lessons?.length === 0 && (
                                <div className="p-8 text-center text-gray-500">Materi sedang dipersiapkan.</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
