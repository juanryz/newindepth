import React from 'react';

/**
 * Premium session mode toggle: Offline | Online
 * Used in Welcome.jsx, Layanan.jsx, and sub-layanan pages.
 *
 * @param {'offline'|'online'} mode - Current session mode
 * @param {Function} onChange - Callback when mode changes
 */
export default function SessionModeToggle({ mode = 'offline', onChange }) {
    const isOnline = mode === 'online';

    return (
        <div className="inline-flex items-center gap-1 p-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/80 dark:border-gray-700/50 rounded-full shadow-lg">
            <button
                type="button"
                onClick={() => onChange('offline')}
                className={`relative px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                    !isOnline
                        ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-[0_4px_15px_rgba(208,170,33,0.3)]'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
                <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Offline
                </span>
            </button>
            <button
                type="button"
                onClick={() => onChange('online')}
                className={`relative px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                    isOnline
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
                <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Online
                </span>
            </button>
        </div>
    );
}
