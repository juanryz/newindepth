import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl pt-20 pb-10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/">
                            <img src="/images/logo-color.png" alt="InDepth Logo" className="h-[120px] md:h-[160px] w-auto object-contain block dark:hidden mb-6" />
                            <img src="/images/logo-white.png" alt="InDepth Logo" className="h-[120px] md:h-[160px] w-auto object-contain hidden dark:block mb-6" />
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-md">
                            Klinik Hipnoterapi & Psikoterapi Premium di Semarang. Menyediakan layanan kesehatan mental terpadu dengan pendekatan personal dan profesional. Membantu Anda menemukan kembali ketenangan batin.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Navigasi</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Home</Link></li>
                            <li><Link href={route('methods.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Metode</Link></li>
                            <li><Link href={route('blog.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Artikel</Link></li>
                            <li><Link href={route('courses.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">E-Learning</Link></li>
                            <li><Link href={route('testimonials.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Testimoni</Link></li>
                            <li><Link href={route('disclaimer')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors font-bold">Disclaimer Resmi</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Lokasi & Kontak</h4>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <a
                                    href="https://maps.app.goo.gl/KUmgnva1hi9vvrNP7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gold-500 transition-colors leading-relaxed"
                                >
                                    Gajah Mungkur, Jl. Kelud Raya No.34b, Petompon, Kota Semarang, Jawa Tengah 50237
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <a href="https://wa.me/6282220800034" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                                    +62 822 2080 0034
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} InDepth Mental Wellness. Hak Cipta Dilindungi.
                    </p>
                    <div className="flex gap-6">
                        {/* Social links could be added here if needed */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
