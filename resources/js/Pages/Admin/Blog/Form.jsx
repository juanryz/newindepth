import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BlogForm({ post }) {
    const isEditing = !!post;

    const { data, setData, post: formPost, put: formPut, processing, errors, transform } = useForm({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        body: post?.body || '',
        meta_title: post?.meta_title || '',
        meta_description: post?.meta_description || '',
        meta_keywords: post?.meta_keywords || '',
        is_published: post?.is_published || false,
        featured_image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            transform((data) => ({
                ...data,
                _method: 'put',
            }));
            formPost(route('admin.blog.update', post.id), {
                forceFormData: true,
            });
        } else {
            formPost(route('admin.blog.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.blog.index')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        &larr; Batal
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                        {isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                    </h2>
                </div>
            }
        >
            <Head title={isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">

                            <div>
                                <InputLabel htmlFor="title" value="Judul Artikel" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full text-lg font-semibold"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-600 mt-2">{errors.title}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="excerpt" value="Excerpt (Ringkasan Singkat Singkat)" />
                                <textarea
                                    id="excerpt"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-20"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                />
                                {errors.excerpt && <p className="text-sm text-red-600 mt-2">{errors.excerpt}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="body" value="Konten Artikel" />
                                <div className="mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden pb-12">
                                    <ReactQuill
                                        theme="snow"
                                        value={data.body}
                                        onChange={(content) => setData('body', content)}
                                        className="h-96"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </div>
                                {errors.body && <p className="text-sm text-red-600 mt-2">{errors.body}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="featured_image" value="Gambar Utama (Featured Image)" />
                                {isEditing && post.featured_image && (
                                    <div className="mb-2">
                                        <img src={`/storage/${post.featured_image}`} alt="Current" className="h-32 rounded border" />
                                    </div>
                                )}
                                <input
                                    id="featured_image"
                                    type="file"
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    onChange={(e) => setData('featured_image', e.target.files[0])}
                                />
                                {errors.featured_image && <p className="text-sm text-red-600 mt-2">{errors.featured_image}</p>}
                            </div>

                            <hr className="my-6 border-gray-200" />

                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">SEO Meta Data (Opsional)</h3>

                            <div>
                                <InputLabel htmlFor="meta_title" value="Meta Title" />
                                <TextInput
                                    id="meta_title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.meta_title}
                                    placeholder="Opsional, akan menggunakan judul artikel jika kosong"
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                />
                                {errors.meta_title && <p className="text-sm text-red-600 mt-2">{errors.meta_title}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="meta_description" value="Meta Description" />
                                <textarea
                                    id="meta_description"
                                    className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-20"
                                    value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                />
                                {errors.meta_description && <p className="text-sm text-red-600 mt-2">{errors.meta_description}</p>}
                            </div>

                            <div>
                                <InputLabel htmlFor="meta_keywords" value="Meta Keywords (pisahkan dengan koma)" />
                                <TextInput
                                    id="meta_keywords"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.meta_keywords}
                                    onChange={(e) => setData('meta_keywords', e.target.value)}
                                />
                                {errors.meta_keywords && <p className="text-sm text-red-600 mt-2">{errors.meta_keywords}</p>}
                            </div>

                            <div className="block mt-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600 dark:text-gray-300 font-bold">Publikasikan Artikel Ini (Terlihat oleh Publik)</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-8">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    {isEditing ? 'Simpan Perubahan' : 'Simpan Artikel'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
