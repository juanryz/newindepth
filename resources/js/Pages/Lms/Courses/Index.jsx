import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function LmsIndex({ courses }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Video & Materi Self-Therapy</h2>}
        >
            <Head title="Katalog Kelas Self-Therapy" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">E-Learning InDepth Mental Wellness</h1>
                        <p className="mt-2 text-lg text-gray-600">Pelajari teknik self-therapy yang bisa Anda lakukan kapan saja, di mana saja.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {courses.length === 0 ? (
                            <div className="col-span-3 py-10 text-center text-gray-500 bg-white rounded-lg shadow-sm">
                                Belum ada kelas yang dipublikasikan saat ini.
                            </div>
                        ) : (
                            courses.map(course => (
                                <div key={course.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                                    {course.thumbnail ? (
                                        <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-48 object-cover" />
                                    ) : (
                                        <div className="w-full h-48 bg-indigo-100 flex items-center justify-center text-indigo-300">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4 flex-1">{course.description.substring(0, 100)}...</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="font-extrabold text-lg text-indigo-700">
                                                Rp {Number(course.price).toLocaleString('id-ID')}
                                            </span>
                                            <Link href={route('courses.show', course.slug)}>
                                                <PrimaryButton>Lihat Kelas</PrimaryButton>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
