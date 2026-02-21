import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function LmsIndex({ courses, auth }) {
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
                <title>E-Learning - InDepth Mental Wellness</title>
                <meta name="description" content="Katalog kelas self-therapy dari InDepth Mental Wellness. Pelajari teknik self-therapy yang bisa Anda lakukan kapan saja, di mana saja." />
            </Head>

            {/* Global Background Ambient Light */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/40 dark:border-gray-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex-shrink-0 flex items-center group relative p-2">
                            <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-2xl blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                            <img src="/images/logo-color.png" alt="InDepth Logo" className="h-12 w-auto object-contain block dark:hidden relative z-10" />
                            <img src="/images/logo-white.png" alt="InDepth Logo" className="h-12 w-auto object-contain hidden dark:block relative z-10" />
                        </Link>
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Home</Link>
                            <Link href={route('methods.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Metode</Link>
                            <Link href={route('blog.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Artikel</Link>
                            <Link href={route('courses.index')} className="text-gold-600 dark:text-gold-400 font-bold transition-colors">E-Learning</Link>
                        </div>
                        <div className="flex items-center space-x-4 relative z-[60]">
                            <ThemeToggle />
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-2.5 rounded-full font-semibold text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/60 dark:border-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-offset-gray-950 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-4 py-2 transition-colors relative z-[60]">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-gold-500 to-yellow-500 border border-gold-400/50 hover:from-gold-600 hover:to-yellow-600 transition-all shadow-md relative z-[60]">
                                        Daftar Sekarang
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-20">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                                InDepth Self-Therapy
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                            E-Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600">Video & Materi</span>
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 font-light">
                            Pelajari kelas dan metode self-therapy yang bisa Anda praktikkan secara mandiri di mana saja, kapan saja.
                        </p>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.length === 0 ? (
                            <div className="col-span-full py-20 text-center rounded-[3rem] border border-dashed border-gold-500/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md">
                                <svg className="w-16 h-16 text-gold-500/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-light">Belum ada kelas yang dipublikasikan saat ini, nantikan update selanjutnya.</p>
                            </div>
                        ) : (
                            courses.map(course => (
                                <article key={course.id} className="group flex flex-col bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-[0_20px_50px_rgba(208,170,33,0.1)] transition-all duration-500 hover:-translate-y-2">
                                    <Link href={route('courses.show', course.slug)} className="block relative aspect-[16/10] overflow-hidden">
                                        {course.thumbnail ? (
                                            <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gold-500/20 to-yellow-500/10 flex items-center justify-center">
                                                <svg className="w-16 h-16 text-gold-500/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-xs font-bold text-gold-600 dark:text-gold-400 shadow-sm border border-white/40 dark:border-gray-700/40">
                                                Self-Therapy
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <Link href={route('courses.show', course.slug)} className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 font-light leading-relaxed mb-6">
                                                {course.description.replace(/(<([^>]+)>)/gi, "").substring(0, 120)}...
                                            </p>
                                        </Link>
                                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">
                                                Rp {Number(course.price).toLocaleString('id-ID')}
                                            </span>
                                            <Link href={route('courses.show', course.slug)} className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 dark:text-gold-400 hover:bg-gold-500 hover:text-white transition-all transform group-hover:translate-x-1">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl pt-20 pb-10 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/">
                                <img src="/images/logo-color.png" alt="InDepth Logo" className="h-14 block dark:hidden mb-6" />
                                <img src="/images/logo-white.png" alt="InDepth Logo" className="h-14 hidden dark:block mb-6" />
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-md">
                                Klinik Hipnoterapi & Psikoterapi Premium di Jakarta. Menyediakan layanan kesehatan mental terpadu dengan pendekatan personal dan profesional.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Navigasi</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Home</Link></li>
                                <li><Link href={route('methods.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Metode</Link></li>
                                <li><Link href={route('blog.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Artikel</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Hubungi Kami</h4>
                            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gold-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                    <span className="hover:text-gold-500 transition-colors">Semarang, Jawa Tengah</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <span className="hover:text-gold-500 transition-colors">+62 822 2080 0034</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
