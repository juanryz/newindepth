import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    // Smooth scroll for anchor links
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            <Head title="Klinik Hipnoterapi Premium Jakarta | Transformasi Pikiran Anda" />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                H
                            </div>
                            <span className="font-extrabold text-2xl tracking-tight text-gray-900">Hypno<span className="text-indigo-600">Care</span></span>
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#layanan" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Layanan</a>
                            <a href="#testimoni" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Testimoni</a>
                            <Link href={route('blog.index')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Artikel</Link>
                            <Link href={route('courses.index')} className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">E-Learning</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-2.5 rounded-full font-semibold text-white bg-gray-900 border border-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-md hover:shadow-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 z-50 relative hover:text-gray-900 font-semibold px-4 py-2 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 z-50 relative rounded-full font-semibold text-white bg-indigo-600 border border-transparent hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main>
                <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-70 animate-pulse pointer-events-none z-0"></div>
                    <div className="absolute top-40 left-0 -ml-20 w-72 h-72 rounded-full bg-purple-50 blur-3xl opacity-70 animate-pulse pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>

                    <div className="relative max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                            Temukan Kembali <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Ketenangan Batin Anda
                            </span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto mb-10 leading-relaxed">
                            Bebaskan diri dari stres, kecemasan, dan trauma masa lalu melalui terapi hipnosis klinis yang aman, nyaman, dan terbukti secara ilmiah.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/login" className="px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1">
                                Jadwalkan Konsultasi Gratis
                            </Link>
                            <a href="#layanan" className="px-8 py-4 border-2 border-gray-200 text-lg font-semibold rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all">
                                Pelajari Lebih Lanjut
                            </a>
                        </div>

                        <div className="mt-16 flex items-center justify-center gap-8 opacity-70 grayscale">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Y_Combinator_logo.svg" alt="YCombinator" className="h-8" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 mt-2" />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="layanan" className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Layanan Kami</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Solusi Khusus untuk Setiap Individu
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                                Pendekatan terapeutik yang disesuaikan secara personal untuk mencapai hasil yang maksimal dan permanen.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600 relative z-10">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Penyembuhan Trauma & Phobia</h3>
                                <p className="text-gray-500 relative z-10">
                                    Atasi akar masalah emosional dan ketakutan tidak beralasan dengan regresi memori yang aman dan terkendali.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600 relative z-10">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Manajemen Stres & Kecemasan</h3>
                                <p className="text-gray-500 relative z-10">
                                    Program ulang respon alam bawah sadar Anda terhadap pemicu stres untuk mendapatkan ketenangan yang persisten.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500"></div>
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600 relative z-10">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Pengembangan Diri & Potensi</h3>
                                <p className="text-gray-500 relative z-10">
                                    Hancurkan mental block dan limiting belief yang menahan laju kesuksesan karir dan hubungan Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-900 overflow-hidden relative">
                    <div className="absolute inset-0 z-0">
                        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Meditation Background" className="w-full h-full object-cover opacity-20" />
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-80 mix-blend-multiply"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h2 className="text-4xl font-extrabold tracking-tight mb-6">Siap Melangkah Maju?</h2>
                        <p className="text-xl opacity-90 mb-10 text-gray-300 text-center">Bergabunglah dengan ratusan klien sukses lainnya. Proses perubahan dimulai dari satu keputusan kecil hari ini.</p>
                        <Link href="/login" className="px-10 py-4 bg-white text-gray-900 font-bold rounded-full text-lg shadow-xl hover:bg-gray-100 transition-colors inline-block">
                            Buat Akun Pasien
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow">
                                H
                            </div>
                            <span className="font-bold text-xl text-gray-900">HypnoCare</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} Klinik Hipnoterapi. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
