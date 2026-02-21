import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function BlogIndex({ posts, auth }) {
    // Smooth scroll for anchor links
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head>
                <title>Blog - InDepth Mental Wellness</title>
                <meta name="description" content="Baca artikel, tips, dan wawasan seputar kesehatan mental, psikologi, dan kesejahteraan jiwa langsung dari tim profesional InDepth Mental Wellness." />
            </Head>

            {/* Global Background Ambient Light (Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

            {/* Navbar (Unified) */}
            <Navbar auth={auth} active="blog" />

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                                InDepth Journal & Insight
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                            Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600">Wawasan Kami</span>
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 font-light">
                            Temukan berbagai jawaban, tips, dan teknik seputar kesehatan mental dan peningkatan diri dari para ahli kami.
                        </p>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.length === 0 ? (
                            <div className="col-span-full py-20 text-center rounded-[3rem] border border-dashed border-gold-500/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md">
                                <svg className="w-16 h-16 text-gold-500/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-light">Belum ada artikel web saat ini.</p>
                            </div>
                        ) : (
                            posts.data.map(post => (
                                <article key={post.id} className="group flex flex-col bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-[0_20px_50px_rgba(208,170,33,0.1)] transition-all duration-500 hover:-translate-y-2">
                                    <Link href={route('blog.show', post.slug)} className="block relative aspect-[16/10] overflow-hidden">
                                        {post.featured_image ? (
                                            <img src={`/storage/${post.featured_image}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gold-500/20 to-yellow-500/10 flex items-center justify-center">
                                                <svg className="w-16 h-16 text-gold-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-xs font-bold text-gold-600 dark:text-gold-400 shadow-sm border border-white/40 dark:border-gray-700/40">
                                                Artikel
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-4 flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                            <span>{new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            <span className="w-1 h-1 rounded-full bg-gold-400"></span>
                                            <span>5 Menit Baca</span>
                                        </div>
                                        <Link href={route('blog.show', post.slug)} className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 font-light leading-relaxed mb-6">
                                                {post.excerpt || post.body.replace(/(<([^>]+)>)/gi, "").substring(0, 120) + "..."}
                                            </p>
                                        </Link>
                                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center font-bold text-gold-600 text-xs">
                                                    {post.author?.name?.charAt(0)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.author?.name}</span>
                                            </div>
                                            <Link href={route('blog.show', post.slug)} className="text-gold-600 dark:text-gold-400 hover:translate-x-1 transition-transform">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </main>

            {/* Footer (Consistent with Homepage) */}
            <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl pt-20 pb-10 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">InDepth</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                                Kesehatan Mental Terpadu & Profesional. Membantu Anda menemukan kembali ketenangan batin.
                            </p>
                        </div>

                        {/* Location Column */}
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Lokasi & Kontak</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
                                Gajah Mungkur, Jl. Kelud Raya No.34b, Petompon, Kota Semarang, Jawa Tengah 50237
                            </p>
                            <p className="text-gray-900 dark:text-white font-bold text-sm">
                                Telepon: 0822-2080-0034
                            </p>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Navigasi</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a href="/#layanan" className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Layanan</a></li>
                                <li><Link href={route('testimonials.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Testimoni</Link></li>
                                <li><Link href={route('blog.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Artikel</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} InDepth Mental Wellness. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
