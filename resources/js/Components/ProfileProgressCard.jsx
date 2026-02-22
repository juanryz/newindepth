import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProfileProgressCard({ profileProgress, showLink = true }) {
    if (!profileProgress) return null;

    const { percentage, fields, completed_count, total_count, is_complete } = profileProgress;

    const barColor = percentage < 40
        ? 'bg-red-500'
        : percentage < 80
            ? 'bg-amber-500'
            : 'bg-green-500';

    return (
        <div className="bg-[#FAF8ED] dark:bg-gray-800/80 sm:rounded-[2.5rem] p-8 transition-all duration-700">
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 dark:text-white">Kelengkapan Profil</h3>
                <span className={`text-lg font-extrabold ${percentage === 100 ? 'text-green-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {percentage}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Field list */}
            <ul className="space-y-2">
                {Object.entries(fields).map(([key, { label, filled }]) => (
                    <li key={key} className="flex items-center gap-2 text-sm">
                        {filled ? (
                            <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        ) : (
                            <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        )}
                        <span className={filled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
                            {label}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 space-y-3">
                {showLink && percentage < 100 && (
                    <Link
                        href={route('profile.edit')}
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-indigo-200 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Lengkapi Profil
                    </Link>
                )}

            </div>
        </div>
    );
}
