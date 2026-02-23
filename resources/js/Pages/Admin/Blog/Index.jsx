import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BlogIndex({ posts }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Kelola Blog Artikel</h2>
                    <Link href="/admin/blog/create">
                        <PrimaryButton className="!rounded-2xl !px-6 !py-3 !text-[10px] !tracking-widest !font-black !shadow-xl !shadow-gold-600/20 !uppercase !bg-gold-600 hover:!bg-gold-500 transition-all transform active:scale-95">
                            Buat Artikel Baru
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Blog CMS" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-sm animate-pulse">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-[2.5rem] border border-white dark:border-gray-800 transition-all duration-500">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-gold-500 rounded-full"></div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Daftar Artikel</h3>
                            </div>

                            <div className="overflow-x-auto -mx-8">
                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800/50">
                                    <thead className="bg-gray-50/50 dark:bg-gray-800/10">
                                        <tr>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Judul</th>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Slug</th>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/30">
                                        {posts?.data?.map((post) => (
                                            <tr key={post.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all duration-300">
                                                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                    {post.title}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    /{post.slug}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <span className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-lg border ${post.is_published
                                                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50'
                                                        : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50'
                                                        }`}>
                                                        {post.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-black space-x-4">
                                                    <a href={`/blog/${post.slug || ''}`} target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">Lihat</a>
                                                    <Link href={`/admin/blog/${post.id}/edit`} className="text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors">Edit</Link>
                                                    <Link
                                                        href={`/admin/blog/${post.id}`}
                                                        method="delete"
                                                        as="button"
                                                        onBefore={() => confirm('Hapus artikel ini permanen?')}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        Hapus
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {(!posts?.data || posts.data.length === 0) && (
                                <div className="py-20 text-center">
                                    <p className="text-gray-400 dark:text-gray-600 text-sm font-bold italic tracking-tight">Belum ada artikel. Silakan buat artikel pertama Anda.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
