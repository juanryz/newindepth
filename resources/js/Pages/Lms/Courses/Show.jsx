import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ErrorBoundary from '@/Components/ErrorBoundary';
import LiquidBackground from '@/Components/LiquidBackground';

export default function LmsShow({ course = {}, isEnrolled = false, auth }) {
    // Ensure course is never null/undefined
    const safeCourse = course || {};

    // Set page title without using <Head> to avoid reported crashes
    useEffect(() => {
        if (safeCourse.title) {
            document.title = safeCourse.title + ' - InDepth Mental Wellness';
        }
    }, [safeCourse.title]);

    // Smooth scroll for internal links
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
        <ErrorBoundary>
            <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">

                {/* Premium Liquid Background */}
                <LiquidBackground />

                {/* Navbar */}
                <Navbar auth={auth} active="courses" />

                <main className="relative z-10 pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                        {/* Back Link */}
                        <div>
                            <Link href={route('courses.index')} className="inline-flex items-center text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 font-semibold transition-colors">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                Kembali ke Daftar Kelas
                            </Link>
                        </div>

                        {/* Course Hero Segment */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 dark:border-gray-800/50 overflow-hidden shadow-2xl">
                            <div className="md:flex">
                                <div className="md:w-5/12 relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                    {safeCourse.thumbnail ? (
                                        <img src={`/storage/${safeCourse.thumbnail}`} alt={safeCourse.title} className="w-full h-full object-cover min-h-[300px]" />
                                    ) : (
                                        <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-gold-500/20 to-yellow-500/10 flex items-center justify-center text-gold-600/50 dark:text-gold-400/30">
                                            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md text-sm font-bold text-gold-600 dark:text-gold-400 shadow-sm border border-white/40 dark:border-gray-700/40">
                                            Self-Therapy Kelas
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 md:p-12 md:w-7/12 flex flex-col justify-center relative">
                                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{safeCourse.title || 'Judul Kelas'}</h1>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${safeCourse.course_type === 'online' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'}`}>
                                            {safeCourse.course_type === 'online' ? '🌐 Kelas Online' : '🏠 Kelas Offline'}
                                        </span>
                                        {safeCourse.course_type === 'online' && safeCourse.online_platform && (
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {safeCourse.online_platform}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg font-light leading-relaxed whitespace-pre-line">{safeCourse.description || 'Tidak ada deskripsi.'}</p>

                                    {isEnrolled && (
                                        <div className="mb-8 p-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 backdrop-blur-md">
                                            <p className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-2">Akses Khusus Pasien Terdaftar</p>
                                            {safeCourse.course_type === 'online' ? (
                                                <div className="space-y-4">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Silakan bergabung ke sesi melalui link di bawah ini:
                                                    </p>
                                                    <a
                                                        href={safeCourse.online_link || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:scale-[1.02]"
                                                    >
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                        Buka Link Pertemuan
                                                    </a>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Lokasi Sesi:</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                                                        {safeCourse.location || 'Lokasi belum ditentukan.'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Investasi Pembelajaran</p>
                                            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">
                                                {Number(safeCourse.price || 0) === 0 ? 'Gratis Akses' : `Rp ${Number(safeCourse.price).toLocaleString('id-ID')}`}
                                            </p>
                                        </div>
                                        <div>
                                            {isEnrolled ? (
                                                <span className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-full font-bold uppercase tracking-widest text-sm shadow-sm backdrop-blur-md">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                    Akses Terbuka
                                                </span>
                                            ) : !auth?.user ? (
                                                <Link href={route('login')} className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-gray-500 to-gray-700 rounded-full font-bold shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:from-gray-600 hover:to-gray-800 group">
                                                    Masuk untuk Mendaftar
                                                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </Link>
                                            ) : Number(safeCourse.price || 0) === 0 ? (
                                                <Link href={route('courses.enroll', safeCourse.slug)} method="post" as="button" type="button" className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-bold shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_25px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 hover:from-emerald-600 hover:to-teal-600 group">
                                                    Daftar Kelas Gratis
                                                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </Link>
                                            ) : (
                                                <Link href={route('courses.enroll', safeCourse.slug)} method="post" as="button" type="button" className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full font-bold shadow-[0_8px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_12px_25px_rgba(208,170,33,0.5)] transition-all hover:-translate-y-1 hover:from-gold-600 hover:to-yellow-600 group">
                                                    Beli Kelas Sekarang
                                                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lesson Curriculum */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 dark:border-gray-800/50 overflow-hidden shadow-xl mb-20 relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full"></div>

                            <div className="p-10 md:p-14 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div>
                                        <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">Materi Pembelajaran</p>
                                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase leading-none">Kurikulum Kelas</h2>
                                    </div>
                                    <div className="text-right">
                                        <span className="px-5 py-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-black text-xs uppercase tracking-widest border border-gray-200 dark:border-gray-700">
                                            {safeCourse.lessons?.length || 0} Modul Eksklusif
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-12">
                                <div className="grid grid-cols-1 gap-4">
                                    {Array.isArray(safeCourse.lessons) && safeCourse.lessons.length > 0 ? (
                                        safeCourse.lessons.map((lesson, idx) => (
                                            <div
                                                key={lesson.id}
                                                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-8 rounded-[2.5rem] bg-white/60 dark:bg-black/40 border border-white dark:border-gray-800 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
                                            >
                                                <div className="flex items-start sm:items-center gap-8">
                                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center font-black text-xl border border-gray-200 dark:border-gray-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-500">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                                                            {lesson.title}
                                                        </h4>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                                                {lesson.type === 'video' ? (
                                                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
                                                                ) : (
                                                                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                                )}
                                                                {lesson.type === 'video' ? 'Video Lesson' : 'Reading Materials'}
                                                            </span>
                                                            {lesson.is_preview && (
                                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border border-emerald-200 dark:border-emerald-800">
                                                                    FREE PREVIEW
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-8 sm:mt-0">
                                                    {(isEnrolled || lesson.is_preview) ? (
                                                        <Link
                                                            href={route('lessons.show', [safeCourse.slug, lesson.id])}
                                                            className="inline-flex items-center px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-lg hover:-translate-y-1"
                                                        >
                                                            Pelajari Sekarang
                                                        </Link>
                                                    ) : (
                                                        <div className="inline-flex items-center gap-3 px-6 py-3.5 text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 0 00-2-2H6a2 2 0 00-2 2v6a2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                            Materi Terkunci
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-24 text-center">
                                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-700 mx-auto mb-6">
                                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                            </div>
                                            <p className="text-gray-400 font-bold italic tracking-wide">Tim instruktur sedang meracik materi terbaik untuk Anda.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

                <Footer />
            </div>
        </ErrorBoundary>
    );
}
