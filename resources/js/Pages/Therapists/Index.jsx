import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function TherapistsIndex({ therapists }) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar auth={null} />
            <Head title="Tim Terapis Kami" />

            <div className="py-12 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Temui Tim <span className="text-gold-500">Pakar</span> Kami
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                            Psikolog dan hipnoterapis bersertifikat yang siap membantu Anda mencapai kesejahteraan mental yang optimal.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {therapists.map((therapist) => (
                            <div key={therapist.id} className="pt-6">
                                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full relative group hover:-translate-y-2 transition-transform duration-300">
                                    {/* Decor */}
                                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-gold-400 blur-2xl opacity-20 rounded-full"></div>

                                    <div className="-mt-6">
                                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-gray-700 p-1 border-2 border-gold-200 shadow-md">
                                            {therapist.avatar ? (
                                                <img
                                                    src={`/storage/${therapist.avatar}`}
                                                    alt={therapist.name}
                                                    className="rounded-full object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gold-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                                    {therapist.name?.charAt(0) || '?'}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white tracking-tight text-center">
                                            {therapist.name}
                                        </h3>
                                        <p className="text-base text-gold-600 dark:text-gold-400 text-center font-medium mt-1">
                                            {therapist.specialization || 'Clinical Hypnotherapist'}
                                        </p>

                                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-3 min-h-[60px]">
                                            {therapist.bio || 'Membantu klien mengatasi berbagai masalah psikologis melalui pendekatan klinis.'}
                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <Link
                                                href={route('therapists.show', therapist.id)}
                                                className="inline-flex items-center px-4 py-2 border border-gold-500 text-sm font-medium rounded-full text-gold-600 bg-white hover:bg-gold-50 dark:bg-gray-800 dark:text-gold-400 dark:border-gold-400 dark:hover:bg-gray-700 transition"
                                            >
                                                Lihat Profil & Jadwal
                                                <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {therapists.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">Belum ada profil terapis aktif yang tersedia saat ini.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
