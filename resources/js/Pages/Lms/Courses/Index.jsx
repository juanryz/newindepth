import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function LmsIndex({ courses }) {
    return (
        <PublicLayout>
            <Head title="Katalog Kelas Self-Therapy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-8 px-4 sm:px-0">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">E-Learning InDepth Mental Wellness</h1>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Pelajari teknik self-therapy yang bisa Anda lakukan kapan saja, di mana saja.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-0">
                        {courses.length === 0 ? (
                            <div className="col-span-3 py-10 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                Belum ada kelas yang dipublikasikan saat ini.
                            </div>
                        ) : (
                            courses.map(course => (
                                <div key={course.id} className="bg-white dark:bg-gray-800/60 overflow-hidden shadow-sm sm:rounded-lg flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-300 border border-gray-100 dark:border-gray-700/50">
                                    {course.thumbnail ? (
                                        <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-48 object-cover" />
                                    ) : (
                                        <div className="w-full h-48 bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-300">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{course.description.substring(0, 100)}...</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="font-extrabold text-lg text-indigo-700 dark:text-indigo-400">
                                                Rp {Number(course.price).toLocaleString('id-ID')}
                                            </span>
                                            <Link
                                                href={route('courses.show', course.slug)}
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                            >
                                                Lihat Kelas
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
