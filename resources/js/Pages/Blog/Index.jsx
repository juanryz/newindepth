import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PublicBlogIndex({ posts }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
            <Head>
                <title>Blog - Klinik Hipnoterapi Jakarta</title>
                <meta name="description" content="Baca artikel, tips, dan wawasan seputar kesehatan mental, psikologi, dan hipnoterapi langsung dari pakar profesional." />
            </Head>

            {/* Header/Nav (Simplified/Placeholder for Public facing page) */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-indigo-900">Klinik <span className="text-indigo-600">Hipnoterapi</span></h1>
                    <nav className="space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium">Beranda</Link>
                        <Link href={route('blog.index')} className="text-indigo-600 font-bold">Blog</Link>
                        <Link href={route('login')} className="text-gray-600 hover:text-indigo-600 font-medium">Masuk</Link>
                    </nav>
                </div>
            </header>

            <main className="py-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">Jelajahi Wawasan Kami</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                            Temukan berbagai jawaban, tips, dan teknik seputar kesehatan mental dan peningkatan diri.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.data.length === 0 ? (
                            <div className="col-span-full text-center text-gray-500 py-10">
                                Belum ada artikel web saat ini.
                            </div>
                        ) : (
                            posts.data.map(post => (
                                <article key={post.id} className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    {post.featured_image ? (
                                        <div className="flex-shrink-0">
                                            <img className="h-56 w-full object-cover" src={`/storage/${post.featured_image}`} alt={post.title} />
                                        </div>
                                    ) : (
                                        <div className="flex-shrink-0 h-56 w-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
                                            <svg className="h-16 w-16 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="flex-1 bg-white p-8 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-indigo-600 mt-2">
                                                <time dateTime={post.published_at}>{new Date(post.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                            </p>
                                            <Link href={route('blog.show', post.slug)} className="block mt-2">
                                                <h3 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">{post.title}</h3>
                                                <p className="mt-3 text-base text-gray-500 line-clamp-3">
                                                    {post.excerpt || post.body.replace(/(<([^>]+)>)/gi, "").substring(0, 150) + "..."}
                                                </p>
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="sr-only">{post.author?.name}</span>
                                                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                                                    {post.author?.name?.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{post.author?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                    {/* Pagination should go here */}
                </div>
            </main>
        </div>
    );
}
