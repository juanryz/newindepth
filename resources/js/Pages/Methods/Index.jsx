import { Head, Link } from '@inertiajs/react';
import React from 'react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Index({ auth }) {
    const methods = [
        {
            id: 1,
            title: "Hypno-Psikoterapi",
            description: "Pendekatan komprehensif yang menargetkan alam bawah sadar untuk mengatasi akar masalah psikologis, mempercepat pemulihan dari trauma, kecemasan, dan fobia.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            )
        },
        {
            id: 2,
            title: "Neuro Linguistic Programming (NLP)",
            description: "Teknik restrukturisasi pola pikir dan bahasa untuk menghilangkan mental block, membangun kepercayaan diri, dan mengoptimalkan potensi diri secara cepat.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            )
        },
        {
            id: 3,
            title: "Cognitive Behavioral Therapy (CBT)",
            description: "Metode terstruktur untuk mengidentifikasi dan mengubah pola pikir negatif serta perilaku destruktif yang menghambat kesejahteraan mental Anda.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
            <Head title="Metode Terapi - InDepth Mental Wellness" />

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
                            <Link href={route('methods.index')} className="text-gold-600 dark:text-gold-400 font-bold transition-colors">Metode</Link>
                            <Link href={route('blog.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Artikel</Link>
                            <Link href={route('courses.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">E-Learning</Link>
                        </div>
                        <div className="flex items-center space-x-4 relative z-[60]">
                            <ThemeToggle />
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-2.5 rounded-full font-semibold text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/60 dark:border-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all shadow-sm hover:shadow-md"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="px-6 py-2.5 rounded-full font-semibold outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-400 hover:to-yellow-400 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Masuk
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 font-semibold text-sm tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
                        Metode Eksklusif
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-8">
                        Sistem Terapi <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">InDepth</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-4">
                        Di InDepth Mental Wellness, kami tidak sekadar melakukan hipnoterapi.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
                        Kami menggunakan <strong>sistem metodologi terstruktur</strong> yang dirancang untuk mengakses akar masalah, bukan hanya meredakan gejala. Tiga metode utama kami dirancang untuk memberikan pendekatan yang presisi, terarah, dan sesuai kebutuhan individu.
                    </p>
                </div>

                {/* Methods Stack */}
                <div className="space-y-24 mb-32">

                    {/* Method 1: InDepth Trance State */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 group">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                                Metode 01
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">InDepth Trance State</h2>
                            <p className="text-xl text-gold-600 dark:text-gold-400 font-medium mb-6">Mengakses Akar Masalah dari Dalam</p>

                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                InDepth Trance State adalah kondisi hipnotik mendalam yang memungkinkan klien mengakses lapisan bawah sadar dan kecerdasan tubuh <em>(somatic mind)</em>.
                                <br /><br />
                                <strong>Bukan sekadar relaksasi. Bukan sekadar sugesti.</strong>
                                <br /><br />
                                Metode ini membawa klien ke kondisi <em>trans-hypnosleep</em> yang stabil, di mana:
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    'Emosi tertahan dapat diidentifikasi',
                                    'Trauma lama dapat dilepaskan',
                                    'Keyakinan yang membatasi dapat diperbarui',
                                    'Sumber masalah psikosomatis dapat ditemukan'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <svg className="w-6 h-6 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                                    Kelebihan Utama:
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Fokus pada akar masalah</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Minim resistensi pikiran sadar</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Efektif untuk trauma & fobia</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Aktivasi komunikasi internal</li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.15)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gold-500/20 blur-[100px] rounded-full group-hover:bg-gold-500/30 transition-colors duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" alt="InDepth Trance State" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Method 2: Supreme Trance State */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 group">
                        <div className="lg:w-1/2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-bl from-gray-900/10 to-transparent border border-gray-900/10 dark:border-white/10 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 dark:opacity-30"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gray-900/10 dark:bg-white/10 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" alt="Supreme Trance State" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/5 dark:bg-white/10 border border-gray-900/10 dark:border-white/20 text-gray-900 dark:text-white text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white animate-pulse"></span>
                                Metode 02
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Supreme Trance State</h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-6">Kedalaman Maksimal dengan Kendali Penuh</p>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Supreme Trance State adalah pengembangan lanjutan dari InDepth Trance State. Pada metode ini, klien tidak hanya masuk ke kedalaman bawah sadar, tetapi juga mempertahankan kesadaran tinggi secara simultan.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kedalaman</p>
                                    <p className="text-sm text-gray-500">Tetap Tercapai</p>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kesadaran</p>
                                    <p className="text-sm text-gray-500">Tetap Aktif</p>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kendali</p>
                                    <p className="text-sm text-gray-500">Tetap Stabil</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Cocok Untuk:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-gray-400"></div> Kasus kompleks & kronis</li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-gray-400"></div> Gangguan jangka panjang</li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-gray-400"></div> Rekonstruksi masa lalu</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Keunggulan:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-gold-500"></div> Gabungan kontrol sadar</li>
                                        <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-gold-500"></div> Rekonstruksi sangat terstruktur</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 inline-block px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold rounded-lg border border-red-500/20">
                                ⚠️ Eksklusif hanya dilakukan oleh hipnoterapis senior InDepth.
                            </div>
                        </div>
                    </div>

                    {/* Method 3: InDepth Solution */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 group">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                                Metode 03
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">InDepth Solution</h2>
                            <p className="text-xl text-gold-600 dark:text-gold-400 font-medium mb-6">Solusi Versi Tubuh Anda Sendiri</p>

                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Pendekatan sistematis untuk menggali solusi terbaik berdasarkan kecerdasan tubuh klien sendiri.
                                Dalam kondisi InDepth Trance State, dilakukan wawancara terstruktur dengan <em>somatic mind</em> untuk mengetahui:
                            </p>

                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 dark:border-gray-800/50 shadow-sm mb-8">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Apakah kondisi ini dapat diselesaikan?',
                                        'Berapa waktu tercepat yang realistis?',
                                        'Syarat apa yang harus dipenuhi?',
                                        'Pantangan apa yang dihindari?'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                            <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 mt-[-2px] text-xs">?</div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Hasil Solusi 100%:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-lg text-gold-700 dark:text-gold-400 text-sm font-medium">Personal</span>
                                        <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-lg text-gold-700 dark:text-gold-400 text-sm font-medium">Spesifik</span>
                                        <span className="px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-lg text-gold-700 dark:text-gold-400 text-sm font-medium">Tidak Generik</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Sangat Efektif Untuk:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Masalah medis tak terjelaskan (psikosomatis)</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div> Kebuntuan terapi sebelumnya</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-tr from-gold-500/20 to-transparent border border-gold-500/30 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.2)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-15"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-gold-400/20 dark:bg-gold-500/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" alt="InDepth Solution" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why InDepth Selection */}
                <div className="relative rounded-[3rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl border border-gold-500/20 shadow-2xl p-10 md:p-16 mb-24 text-center group">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Mengapa InDepth Berbeda?</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto mb-12">
                            Banyak layanan hipnoterapi berfokus pada sugesti belaka. <strong className="text-gold-600 dark:text-gold-400 font-bold">InDepth berfokus pada sistem.</strong>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {[
                                { title: 'Metodologi', desc: 'Terstruktur' },
                                { title: 'Dokumentasi', desc: 'Transparan' },
                                { title: 'Standar Legal', desc: 'Sangat Jelas' },
                                { title: 'Pendekatan', desc: 'Komunikasi Bawah Sadar' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/60 dark:bg-black/40 border border-gold-500/20 rounded-2xl p-6 group-hover:-translate-y-1 transition-transform">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.title}</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xl font-bold text-gray-900 dark:text-white">
                            <span className="flex items-center gap-2"><svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Pendekatan Presisi</span>
                            <span className="hidden md:block w-2 h-2 rounded-full bg-gold-500/50"></span>
                            <span className="flex items-center gap-2"><svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Proses Terstruktur</span>
                            <span className="hidden md:block w-2 h-2 rounded-full bg-gold-500/50"></span>
                            <span className="flex items-center gap-2"><svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Solusi Mendalam</span>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent"></div>

                    <div className="relative p-12 md:p-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                            Temukan Metode yang Tepat Untuk Anda
                        </h2>
                        <p className="text-xl text-gray-400 font-light mb-10">
                            Konsultasikan kebutuhan Anda dengan tim profesional kami untuk menentukan pendekatan terapi yang paling efektif.
                        </p>
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full font-bold text-gray-900 bg-gradient-to-r from-gold-400 to-yellow-400 hover:from-gold-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(208,170,33,0.3)] hover:shadow-[0_0_30px_rgba(208,170,33,0.5)] hover:-translate-y-1 transition-all duration-300 ring-2 ring-gold-500/50 ring-offset-2 ring-offset-black">
                            Mulai Konsultasi Gratis
                            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl pt-20 pb-10 mt-20">
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
                                <li><Link href={route('methods.index')} className="text-gold-600 font-bold transition-colors">Metode</Link></li>
                                <li><Link href={route('blog.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Artikel</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Hubungi Kami</h4>
                            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gold-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <a href="https://share.google/NtOQpAGwlAfChYbxP" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">Semarang</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">+62 812 3456 7890</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    <a href="https://instagram.com/indepth" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">@indepth</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} InDepth Mental Wellness. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
