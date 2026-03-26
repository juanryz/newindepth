import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const COLOR_MAP = {
    indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-200/60 dark:border-indigo-800/40', glow: 'hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20' },
    emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200/60 dark:border-emerald-800/40', glow: 'hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20' },
    rose: { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-200/60 dark:border-rose-800/40', glow: 'hover:shadow-rose-100 dark:hover:shadow-rose-900/20' },
    amber: { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200/60 dark:border-amber-800/40', glow: 'hover:shadow-amber-100 dark:hover:shadow-amber-900/20' },
    violet: { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-200/60 dark:border-violet-800/40', glow: 'hover:shadow-violet-100 dark:hover:shadow-violet-900/20' },
    sky: { bg: 'bg-sky-100 dark:bg-sky-900/40', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-200/60 dark:border-sky-800/40', glow: 'hover:shadow-sky-100 dark:hover:shadow-sky-900/20' },
};

function getColor(value) {
    return COLOR_MAP[value] || COLOR_MAP.indigo;
}

export default function InternalAiIndexPage({ agents }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-black text-gray-900 dark:text-white">🤖 AI Internal Indepth</h2>}
        >
            <Head title="AI Internal" />

            <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Pilih asisten AI yang ingin kamu ajak bicara. Setiap agent terlatih untuk area tertentu.
                    </p>
                </div>

                {agents.length === 0 ? (
                    <div className="text-center py-24 bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] rounded-3xl">
                        <div className="text-6xl mb-4">🤖</div>
                        <h3 className="text-lg font-black text-gray-600 dark:text-gray-300 mb-2">Belum Ada Agent Tersedia</h3>
                        <p className="text-sm text-gray-400">Hubungi admin untuk mengaktifkan agent AI internal.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {agents.map(agent => {
                            const c = getColor(agent.avatar_color);
                            return (
                                <Link
                                    key={agent.id}
                                    href={route('internal-ai.show', agent.id)}
                                    className={`group flex flex-col gap-4 p-6 rounded-3xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border ${c.border} shadow-sm hover:shadow-xl ${c.glow} transition-all duration-300 hover:-translate-y-1`}
                                >
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${c.bg} ${c.text} group-hover:scale-110 transition-transform duration-300`}>
                                        🤖
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className={`font-black text-gray-900 dark:text-white text-base mb-1 group-hover:${c.text} transition-colors`}>
                                            {agent.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                                            {agent.description || 'Asisten AI siap membantu pertanyaan Anda.'}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <div className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${c.text}`}>
                                        Mulai Chat
                                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
