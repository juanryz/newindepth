import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BlogIndex({ posts }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Kelola Blog Artikel</h2>
                    <Link href={route('admin.blog.create')}>
                        <PrimaryButton>Buat Artikel Baru</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Blog CMS" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border-b border-gray-100">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {posts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {post.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {post.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {post.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                <a href={route('blog.show', post.slug)} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900">Lihat</a>
                                                <Link href={route('admin.blog.edit', post.id)} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                                <Link
                                                    href={route('admin.blog.destroy', post.id)}
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() => confirm('Hapus artikel ini permanen?')}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {posts.data.length === 0 && (
                                <p className="text-center text-gray-500 mt-6 mb-2">Belum ada artikel. Silakan buat artikel pertama Anda.</p>
                            )}
                        </div>
                    </div>
                    {/* Pagination can be added here */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
