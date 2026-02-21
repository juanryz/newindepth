import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function LessonShow({ course, lesson }) {
    return (
        <PublicLayout>
            <Head title={`${lesson.title} | ${course.title}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Back link */}
                    <div className="px-4 sm:px-0">
                        <Link href={route('courses.show', course.slug)} className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Kembali ke {course.title}
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800/60 overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 dark:border-gray-700/50">
                        {/* Video Player or Content */}
                        {lesson.type === 'video' ? (
                            <div className="aspect-w-16 aspect-h-9 bg-black relative w-full" style={{ paddingBottom: '56.25%' }}>
                                {lesson.content_url ? (
                                    <iframe
                                        src={lesson.content_url}
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                ) : (
                                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        <p>Video sedang dipersiapkan</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-8 prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: lesson.content_text }}>
                                {!lesson.content_text && <p className="text-gray-500 italic">Materi tulisan belum ditambahkan.</p>}
                            </div>
                        )}

                        <div className="p-6 border-t border-gray-100 dark:border-gray-700/50">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{lesson.title}</h1>
                            {lesson.is_preview && (
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
                                    Materi Preview
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center bg-transparent py-4 px-4 sm:px-0">
                        <Link href={route('courses.show', course.slug)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 font-medium bg-white dark:bg-gray-800 px-6 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                            &larr; Kembali ke Daftar Materi
                        </Link>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
