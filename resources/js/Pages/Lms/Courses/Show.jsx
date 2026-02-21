import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PrimaryButton from '@/Components/PrimaryButton';

export default function LmsShow({ course, isEnrolled, auth }) {
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
                <title>{course.title} - InDepth Mental Wellness</title>
                <meta name="description" content={course.description.substring(0, 160)} />
            </Head>

            {/* Global Background Ambient Light */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

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
                                {course.thumbnail ? (
                                    <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-full object-cover min-h-[300px]" />
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
                                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{course.title}</h1>
                                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg font-light leading-relaxed whitespace-pre-line">{course.description}</p>

                                <div className="mt-auto pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Investasi Pembelajaran</p>
                                        <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">
                                            {Number(course.price) === 0 ? 'Gratis Akses' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                                        </p>
                                    </div>
                                    <div>
                                        {isEnrolled ? (
                                            <span className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-full font-bold uppercase tracking-widest text-sm shadow-sm backdrop-blur-md">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                Akses Terbuka
                                            </span>
                                        ) : (
                                            <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full font-bold shadow-[0_8px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_12px_25px_rgba(208,170,33,0.5)] transition-all hover:-translate-y-1 hover:from-gold-600 hover:to-yellow-600 group">
                                                Daftar & Mulai Belajar
                                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Curriculum */}
                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/60 dark:border-gray-800/50 overflow-hidden shadow-xl mb-8">
                        <div className="p-8 md:p-10 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Kurikulum & Materi Belajar</h2>
                            <p className="text-md text-gray-600 dark:text-gray-400 mt-2 font-light">
                                Total {course.lessons?.length || 0} modul pembelajaran eksklusif
                            </p>
                        </div>
                        <div className="p-4 md:p-8">
                            <ul className="space-y-4">
                                {course.lessons && course.lessons.map((lesson, idx) => (
                                    <li key={lesson.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white/60 dark:bg-black/40 border border-gray-100 dark:border-gray-800 hover:border-gold-500/30 hover:shadow-md transition-all">
                                        <div className="flex items-start sm:items-center gap-5">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center font-bold text-lg border border-gold-500/20">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="capitalize flex items-center gap-1 font-medium bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                                                        {lesson.type === 'video' ? (
                                                            <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                        )}
                                                        {lesson.type === 'video' ? 'Video' : 'Artikel'}
                                                    </span>
                                                    {lesson.is_preview && !isEnrolled && (
                                                        <span className="px-2.5 py-1 font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md border border-blue-500/20 uppercase tracking-wider" style={{ fontSize: '10px' }}>
                                                            Preview Gratis
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 sm:mt-0 flex items-center justify-end">
                                            {(isEnrolled || lesson.is_preview) ? (
                                                <Link href={route('lessons.show', [course.slug, lesson.id])} className="px-5 py-2.5 rounded-full font-bold text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gold-500 dark:hover:bg-gold-500 hover:text-white dark:hover:text-white transition-all">
                                                    Mulai Belajar
                                                </Link>
                                            ) : (
                                                <span className="px-5 py-2.5 flex items-center gap-2 text-gray-400 dark:text-gray-600 text-sm font-semibold rounded-full bg-gray-100 dark:bg-gray-800/50 cursor-not-allowed border border-gray-200 dark:border-gray-800">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                    Terkunci
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {course.lessons?.length === 0 && (
                                <div className="py-12 text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                                    Materi sedang dipersiapkan oleh tim instruktur kami.
                                </div>
                            )}
                        </div>
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
                                Klinik Hipnoterapi & Psikoterapi Premium di Semarang. Menyediakan layanan kesehatan mental terpadu dengan pendekatan personal dan profesional.
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
