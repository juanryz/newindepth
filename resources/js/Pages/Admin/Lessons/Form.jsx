import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function LessonsForm({ course, lesson }) {
    const isEditing = !!lesson.id;

    const { data, setData, post, put, processing, errors } = useForm({
        title: lesson.title || '',
        video_url: lesson.video_url || '',
        content: lesson.content || '',
        is_preview: lesson.is_preview || false,
        order_column: lesson.order_column || 0,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('admin.courses.lessons.update', [course.id, lesson.id]));
        } else {
            post(route('admin.courses.lessons.store', course.id));
        }
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {isEditing ? 'Edit Materi' : 'Tambah Materi Baru'}
                </h2>
                <Link href={route('admin.courses.lessons.index', course.id)} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mt-2 sm:mt-0">
                    &larr; Kembali ke Daftar Materi
                </Link>
            </div>
        }>
            <Head title={isEditing ? 'Edit Materi' : 'Tambah Materi'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-100 dark:border-blue-800">
                            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Target Kelas:</h3>
                            <p className="text-base text-blue-900 dark:text-blue-100 font-bold mt-1">{course.title}</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Judul & Urutan */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                                <div className="md:col-span-3">
                                    <InputLabel htmlFor="title" value="Judul Materi / Sesi" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div className="md:col-span-1">
                                    <InputLabel htmlFor="order_column" value="Nomor Urut" />
                                    <TextInput
                                        id="order_column"
                                        type="number"
                                        min="0"
                                        className="mt-1 block w-full bg-gray-50 focus:bg-white text-center"
                                        value={data.order_column}
                                        onChange={(e) => setData('order_column', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.order_column} className="mt-2" />
                                </div>
                            </div>

                            {/* Video URL */}
                            <div>
                                <InputLabel htmlFor="video_url" value="URL Video (Opsional - YouTube Link)" />
                                <TextInput
                                    id="video_url"
                                    type="url"
                                    className="mt-1 block w-full font-mono text-sm"
                                    value={data.video_url}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    onChange={(e) => setData('video_url', e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-1">Kosongkan jika materi hanya berupa teks bacaan.</p>
                                <InputError message={errors.video_url} className="mt-2" />
                            </div>

                            {/* Deskripsi/Teks */}
                            <div>
                                <InputLabel htmlFor="content" value="Konten Teks bacaan / Penjelasan (Opsional)" />
                                <textarea
                                    id="content"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[300px] font-sans text-sm p-3"
                                    value={data.content || ''}
                                    placeholder="Tuliskan materi tertulis, penjelasan tambahan, atau link eksternal di sini..."
                                    onChange={(e) => setData('content', e.target.value)}
                                />
                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            {/* Publikasi / Preview Gratis */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                                <InputLabel value="Akses Materi" />
                                <label className="flex items-center mt-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 cursor-pointer h-5 w-5"
                                        checked={data.is_preview}
                                        onChange={(e) => setData('is_preview', e.target.checked)}
                                    />
                                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Jadikan materi ini Preview (Gratis dibuka tanpa perlu membeli kelas)</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-2 ml-8">Biasanya dicentang untuk video trailer atau "Introduction" di awal kelas.</p>
                            </div>

                            <div className="flex items-center justify-end mt-6 space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('admin.courses.lessons.index', course.id)} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md">
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Simpan Perubahan' : 'Tambahkan Materi'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
