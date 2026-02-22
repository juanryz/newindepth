import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { motion } from 'framer-motion';

export default function LessonsForm({ course, lesson }) {
    const isEditing = !!lesson.id;

    const { data, setData, post, processing, errors } = useForm({
        title: lesson.title || '',
        video_url: lesson.video_url || '',
        content: lesson.content || '',
        attachment: null,
        is_preview: lesson.is_preview || false,
        order_column: lesson.order_column || 0,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route('therapist.courses.lessons.update', [course.id, lesson.id]), {
                forceFormData: true,
                onSuccess: () => { },
                data: {
                    ...data,
                    _method: 'PUT'
                }
            });
        } else {
            post(route('therapist.courses.lessons.store', course.id));
        }
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">Editor Kurikulum</p>
                    <h2 className="font-black text-2xl text-gray-900 dark:text-white leading-tight uppercase">
                        {isEditing ? 'Ubah Materi' : 'Buat Materi Baru'}
                    </h2>
                </div>
                <Link href={route('therapist.courses.lessons.index', course.id)} className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mt-2 sm:mt-0 flex items-center gap-1 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Batal & Kembali
                </Link>
            </div>
        }>
            <Head title={isEditing ? 'Edit Materi' : 'Tambah Materi'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 overflow-hidden shadow-2xl rounded-[3rem] border border-gray-100 dark:border-gray-700 p-8 md:p-12 relative"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="mb-10 flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Target Kelas</h3>
                                <p className="text-lg font-black text-gray-900 dark:text-white uppercase leading-tight">{course.title}</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8">

                            {/* Judul & Urutan */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="md:col-span-3">
                                    <InputLabel htmlFor="title" value="JUDUL MATERI / SESI" className="text-[10px] font-black tracking-widest text-gray-400" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        className="mt-2 block w-full border-2 border-gray-100 focus:border-indigo-500 rounded-2xl h-14 px-6 text-lg font-bold"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Pengantar Somatic Awareness"
                                        required
                                        isFocused
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div className="md:col-span-1">
                                    <InputLabel htmlFor="order_column" value="NO. URUT" className="text-[10px] font-black tracking-widest text-gray-400" />
                                    <TextInput
                                        id="order_column"
                                        type="number"
                                        min="0"
                                        className="mt-2 block w-full border-2 border-gray-100 focus:border-indigo-500 rounded-2xl h-14 text-center font-black text-xl text-indigo-600"
                                        value={data.order_column}
                                        onChange={(e) => setData('order_column', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.order_column} className="mt-2" />
                                </div>
                            </div>

                            {/* Video URL */}
                            <div>
                                <InputLabel htmlFor="video_url" value="URL VIDEO (YOUTUBE / EMBED LINK)" className="text-[10px] font-black tracking-widest text-gray-400" />
                                <div className="relative mt-2">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 2a1 1 0 100 2 1 1 0 000-2zm-2 1a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" />
                                        </svg>
                                    </div>
                                    <TextInput
                                        id="video_url"
                                        type="url"
                                        className="block w-full border-2 border-gray-100 focus:border-indigo-500 rounded-2xl h-14 pl-14 text-sm font-mono text-gray-600"
                                        value={data.video_url}
                                        placeholder="https://www.youtube.com/embed/..."
                                        onChange={(e) => setData('video_url', e.target.value)}
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 mt-2 ml-2">Kosongkan jika materi berupa file atau teks.</p>
                                <InputError message={errors.video_url} className="mt-2" />
                            </div>

                            {/* File Upload */}
                            <div>
                                <InputLabel htmlFor="attachment" value="UNGGAH FILE (PDF, WORD, GAMBAR, DLL)" className="text-[10px] font-black tracking-widest text-gray-400" />
                                <div className="mt-2 flex items-center gap-4">
                                    <input
                                        id="attachment"
                                        type="file"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border-2 border-dashed border-gray-200 rounded-2xl p-2"
                                        onChange={(e) => setData('attachment', e.target.files[0])}
                                    />
                                </div>
                                {lesson.attachment && (
                                    <p className="text-[10px] font-bold text-emerald-600 mt-2 ml-2 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        File saat ini: {lesson.attachment_name}
                                    </p>
                                )}
                                <InputError message={errors.attachment} className="mt-2" />
                            </div>

                            {/* Deskripsi/Teks */}
                            <div>
                                <InputLabel htmlFor="content" value="ISI MATERI / ARTIKEL (OPSIONAL)" className="text-[10px] font-black tracking-widest text-gray-400" />
                                <textarea
                                    id="content"
                                    className="mt-2 block w-full border-2 border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 rounded-[2rem] min-h-[400px] font-sans text-base p-8 shadow-inner"
                                    value={data.content || ''}
                                    placeholder="Tuliskan materi tertulis, jurnal refleksi, atau penjelasan mendalam di sini..."
                                    onChange={(e) => setData('content', e.target.value)}
                                />
                                <InputError message={errors.content} className="mt-2" />
                            </div>

                            {/* Akses Materi */}
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-sm font-black text-indigo-900 dark:text-indigo-300 uppercase underline decoration-indigo-500/30">Privasi Materi</p>
                                    <p className="text-xs text-indigo-700/60 dark:text-indigo-400/60 mt-1">Jadikan materi ini Preview untuk menarik minat calon siswa (bisa ditonton gratis).</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_preview}
                                        onChange={(e) => setData('is_preview', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                    <span className="ml-3 text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase">PREVIEW</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-12 space-x-6 pt-8 border-t border-gray-100 dark:border-gray-700">
                                <Link
                                    href={route('therapist.courses.lessons.index', course.id)}
                                    className="text-xs font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-xl shadow-gray-900/10 active:scale-95 disabled:opacity-50"
                                >
                                    {isEditing ? 'Simpan Perubahan' : 'Terbitkan Materi'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
