import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function LessonShow({ course, lesson, auth }) {
    // Smooth scroll
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
                <title>{lesson.title} - {course.title}</title>
            </Head>

            {/* Global Background Ambient Light */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

            {/* Minimalist Navbar for Learning Mode */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border-b border-white/40 dark:border-gray-800/50 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <Link href={route('courses.show', course.slug)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-gold-500/10 transition-all font-bold">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </Link>
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{course.title}</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{lesson.title}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            {auth?.user && (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 rounded-full font-semibold text-xs text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 border border-white/60 dark:border-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-24 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 dark:border-gray-800/50 overflow-hidden shadow-2xl">

                        {/* Video Player or Content Display */}
                        {lesson.type === 'video' ? (
                            <div className="aspect-w-16 aspect-h-9 bg-black relative w-full border-b border-gray-200 dark:border-gray-800" style={{ paddingBottom: '56.25%' }}>
                                {lesson.content_url ? (
                                    <iframe
                                        src={lesson.content_url}
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                ) : (
                                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 bg-gray-100/5 dark:bg-black/50 backdrop-blur-sm">
                                        <svg className="w-20 h-20 mb-4 text-gold-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                        <p className="font-semibold tracking-wide uppercase">Video sedang dipersiapkan</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-8 md:p-16 prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: lesson.content_text }}>
                                {!lesson.content_text && <p className="text-gray-500 italic text-center py-20">Materi tulisan belum ditambahkan.</p>}
                            </div>
                        )}

                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-4 mb-4">
                                {lesson.is_preview && (
                                    <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">
                                        Materi Preview Gratis
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">
                                    {lesson.type === 'video' ? (
                                        <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg> Video</>
                                    ) : (
                                        <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Artikel</>
                                    )}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{lesson.title}</h1>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-transparent py-4 border-t border-gray-200 dark:border-gray-800">
                        <Link href={route('courses.show', course.slug)} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 font-bold bg-white/50 dark:bg-gray-900/50 px-6 py-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-1">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Kembali ke Daftar Materi
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}
