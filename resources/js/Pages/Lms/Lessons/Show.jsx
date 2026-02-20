import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function LessonShow({ course, lesson }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('courses.show', course.slug)} className="text-gray-500 hover:text-gray-700">
                        &larr; Kembali
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight truncate">
                        {course.title} - {lesson.title}
                    </h2>
                </div>
            }
        >
            <Head title={`${lesson.title} | ${course.title}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Video Player or Content Display */}
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
                            <div className="p-8 prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: lesson.content_text }}>
                                {!lesson.content_text && <p className="text-gray-500 italic">Materi tulisan belum ditambahkan.</p>}
                            </div>
                        )}

                        <div className="p-6 border-t border-gray-100">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                            {lesson.is_preview && (
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
                                    Materi Preview
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Navigation or related info */}
                    <div className="flex justify-between items-center bg-transparent py-4">
                        <Link href={route('courses.show', course.slug)} className="text-indigo-600 hover:text-indigo-900 font-medium bg-white px-6 py-2 rounded-lg shadow-sm border border-gray-200">
                            Kembali ke Daftar Materi
                        </Link>
                        {/* Di sini bisa ditambahkan tombol 'Materi Selanjutnya' atau 'Tandai Selesai' nantinya */}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
