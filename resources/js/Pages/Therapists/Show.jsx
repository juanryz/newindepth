import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export default function TherapistShow({ therapist, schedules }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const availableDates = Object.keys(schedules).sort();

    return (
        <GuestLayout>
            <Head title={`Profil Terapis - ${therapist.name}`} />

            <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumbs */}
                    <nav className="flex mb-8" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gold-600 dark:text-gray-400 dark:hover:text-gold-400">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <Link href={route('therapists.index')} className="ml-1 text-sm font-medium text-gray-700 hover:text-gold-600 md:ml-2 dark:text-gray-400 dark:hover:text-gold-400">
                                        Tim Terapis
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-500">{therapist.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
                        <div className="md:flex">
                            {/* Profile Sidebar */}
                            <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800/50 p-8 border-r border-gray-100 dark:border-gray-700">
                                <div className="flex flex-col items-center">
                                    <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center relative">
                                        {/* Glow effect behind avatar */}
                                        <div className="absolute inset-0 bg-gold-400/20 blur-xl"></div>

                                        {therapist.avatar ? (
                                            <img src={`/storage/${therapist.avatar}`} alt={therapist.name} className="h-full w-full object-cover z-10" />
                                        ) : (
                                            <span className="text-4xl font-bold bg-gradient-to-br from-gold-400 to-yellow-600 bg-clip-text text-transparent z-10">
                                                {therapist.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
                                        {therapist.name}
                                    </h1>
                                    <p className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gold-50 text-gold-700 border border-gold-200 dark:bg-gold-900/30 dark:text-gold-400 dark:border-gold-800">
                                        {therapist.specialization || 'Clinical Hypnotherapist'}
                                    </p>
                                </div>

                                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wide">Tentang</h3>
                                    <div className="mt-3 prose prose-sm text-gray-500 dark:text-gray-400">
                                        <p>{therapist.bio || 'Terapis profesional bersertifikat yang siap membantu kesejahteraan mental Anda.'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Area - Schedule */}
                            <div className="md:w-2/3 p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Jadwal Tersedia</h2>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                                        14 Hari Kedepan
                                    </span>
                                </div>

                                {availableDates.length > 0 ? (
                                    <>
                                        {/* Date Carousel/List */}
                                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2 px-1">
                                            {availableDates.map((dateStr) => {
                                                const dateObj = parseISO(dateStr);
                                                const isSelected = selectedDate === dateStr;

                                                return (
                                                    <button
                                                        key={dateStr}
                                                        onClick={() => setSelectedDate(dateStr)}
                                                        className={`flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl w-20 transition-all ${isSelected
                                                            ? 'bg-gradient-to-br from-gold-500 to-yellow-500 text-white shadow-lg shadow-gold-500/30 scale-105'
                                                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-gold-400 dark:hover:border-gold-500 hover:shadow-md'
                                                            }`}
                                                    >
                                                        <span className={`text-xs font-medium uppercase ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            {format(dateObj, 'EEE', { locale: id })}
                                                        </span>
                                                        <span className="text-xl font-bold mt-1">
                                                            {format(dateObj, 'd')}
                                                        </span>
                                                        <span className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                                            {format(dateObj, 'MMM', { locale: id })}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Time Slots */}
                                        <div className="mt-8">
                                            {selectedDate ? (
                                                <div className="animate-fade-in-up">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center">
                                                        <svg className="w-5 h-5 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        Sesi Tersedia on {format(parseISO(selectedDate), 'EEEE, d MMMM yyyy', { locale: id })}
                                                    </h3>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                        {schedules[selectedDate].map((schedule) => (
                                                            <div
                                                                key={schedule.id}
                                                                className="relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center hover:bg-gold-50 dark:hover:bg-gray-700 transition-colors group"
                                                            >
                                                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                                    {schedule.time_slot}
                                                                </span>
                                                                <Link
                                                                    href={route('bookings.create', { schedule: schedule.id })}
                                                                    className="mt-3 text-xs w-full text-center py-2 bg-indigo-600 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] hover:bg-indigo-700 shadow-md"
                                                                >
                                                                    Pilih  Beli
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30">
                                                    <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-gray-500 dark:text-gray-400">Pilih tanggal di atas untuk melihat jam tersedia.</p>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-16 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Jadwal Penuh / Belum Tersedia</h3>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                            Sayang sekali, {therapist.name} saat ini tidak memiliki slot jadwal kosong dalam 14 hari ke depan. Silakan cek kembali nanti atau pilih terapis lain.
                                        </p>
                                        <div className="mt-6">
                                            <Link href={route('therapists.index')} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                                Lihat Terapis Lain
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </GuestLayout>
    );
}
