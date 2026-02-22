import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function CoursesForm({ course }) {
    const isEditing = !!course.id;
    const [previewImage, setPreviewImage] = useState(course.thumbnail ? `/storage/${course.thumbnail}` : null);

    const { data, setData, post, processing, errors } = useForm({
        title: course.title || '',
        description: course.description || '',
        course_type: course.course_type || 'online',
        online_platform: course.online_platform || '',
        online_link: course.online_link || '',
        location: course.location || '',
        price: course.price || 0,
        thumbnail: null,
        is_published: course.is_published || false,
        _method: isEditing ? 'put' : 'post', // Inertia workaround for file uploads with PUT
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Since we are uploading a file (thumbnail), we must use POST even for updates.
        // We injected _method: 'put' above to fake the PUT request.
        post(isEditing ? route('therapist.courses.update', course.id) : route('therapist.courses.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{isEditing ? 'Edit Kelas Saya' : 'Tambah Kelas Baru'}</h2>}>
            <Head title={isEditing ? 'Edit Kelas' : 'Tambah Kelas'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">

                            {/* Judul & Harga */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Judul Kelas" />
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
                                <div>
                                    <InputLabel htmlFor="price" value="Harga (Rp) - Isi 0 Jika Gratis" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        min="0"
                                        className="mt-1 block w-full"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                            </div>

                            {/* Course Type, Platform/Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="course_type" value="Tipe Kelas" />
                                    <select
                                        id="course_type"
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.course_type}
                                        onChange={(e) => setData('course_type', e.target.value)}
                                        required
                                    >
                                        <option value="online">Online</option>
                                        <option value="offline">Offline (Tatap Muka)</option>
                                    </select>
                                    <InputError message={errors.course_type} className="mt-2" />
                                </div>

                                {data.course_type === 'online' && (
                                    <>
                                        <div>
                                            <InputLabel htmlFor="online_platform" value="Platform Online (Zoom, Meet, dll)" />
                                            <TextInput
                                                id="online_platform"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.online_platform}
                                                onChange={(e) => setData('online_platform', e.target.value)}
                                                placeholder="Contoh: Zoom Meeting"
                                                required={data.course_type === 'online'}
                                            />
                                            <InputError message={errors.online_platform} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="online_link" value="Link Meeting (Zoom/GMeet/dll)" />
                                            <TextInput
                                                id="online_link"
                                                type="url"
                                                className="mt-1 block w-full"
                                                value={data.online_link}
                                                onChange={(e) => setData('online_link', e.target.value)}
                                                placeholder="https://zoom.us/j/..."
                                                required={data.course_type === 'online'}
                                            />
                                            <p className="text-[10px] text-gray-500 mt-1">*Link ini hanya akan tampil bagi pasien yang sudah membeli kelas.</p>
                                            <InputError message={errors.online_link} className="mt-2" />
                                        </div>
                                    </>
                                )}

                                {data.course_type === 'offline' && (
                                    <div>
                                        <InputLabel htmlFor="location" value="Lokasi / Alamat" />
                                        <TextInput
                                            id="location"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Contoh: Klinik InDepth, Jakarta"
                                            required={data.course_type === 'offline'}
                                        />
                                        <InputError message={errors.location} className="mt-2" />
                                    </div>
                                )}
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <InputLabel htmlFor="description" value="Deskripsi Lengkap" />
                                <textarea
                                    id="description"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[150px]"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Thumbnail & Publikasi */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div>
                                    <InputLabel htmlFor="thumbnail" value="Thumbnail Kelas (Opsional)" />
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300"
                                        onChange={handleImageChange}
                                    />
                                    <InputError message={errors.thumbnail} className="mt-2" />

                                    {previewImage && (
                                        <div className="mt-4">
                                            <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                            <img src={previewImage} alt="Preview" className="h-32 object-cover rounded shadow-md border border-gray-200 dark:border-gray-700" />
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600">
                                    <InputLabel value="Status Publikasi" />
                                    <label className="flex items-center mt-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 cursor-pointer h-5 w-5"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 font-medium">Tampilkan kelas ini di katalog publik (Publish)</span>
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">Jika tidak di centang, kelas akan disimpan sebagai Draft dan tidak bisa dibeli/dilihat user.</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-6 space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link href={route('therapist.courses.index')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md">
                                    Batal
                                </Link>
                                <PrimaryButton disabled={processing}>
                                    {isEditing ? 'Simpan Perubahan' : 'Buat Kelas'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
