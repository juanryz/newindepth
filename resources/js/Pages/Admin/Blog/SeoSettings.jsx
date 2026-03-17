import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const GROUP_LABELS = {
    title: { label: 'Judul & SEO Title', icon: '🏷️', desc: 'Pengaturan panjang judul SEO dan H1' },
    meta: { label: 'Meta & URL', icon: '🔗', desc: 'Meta description, slug, dan URL' },
    content: { label: 'Konten Artikel', icon: '📝', desc: 'Panjang artikel, paragraf, dan readability' },
    structure: { label: 'Struktur & Schema', icon: '🏗️', desc: 'Heading H2/H3, list, dan schema markup' },
    keyword: { label: 'Keyword & Density', icon: '🎯', desc: 'Keyword density, LSI, dan kemunculan' },
    links: { label: 'Internal & External Link', icon: '🔗', desc: 'Jumlah link untuk SEO authority' },
    media: { label: 'Gambar & Media', icon: '🖼️', desc: 'Jumlah gambar dan alt text' },
    faq: { label: 'FAQ Section', icon: '❓', desc: 'Pertanyaan FAQ untuk rich snippet' },
};

export default function SeoSettings({ settings, rules }) {
    const { flash } = usePage().props;
    const [editedSettings, setEditedSettings] = useState({});
    const [activeGroup, setActiveGroup] = useState(Object.keys(settings)[0] || 'title');
    const [saving, setSaving] = useState(false);

    const handleChange = (id, value) => {
        setEditedSettings(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        const changedSettings = Object.entries(editedSettings).map(([id, value]) => ({
            id: parseInt(id),
            value: String(value),
        }));

        if (changedSettings.length === 0) return;

        setSaving(true);
        router.post(route('admin.seo-settings.update'), {
            settings: changedSettings,
        }, {
            onFinish: () => setSaving(false),
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        if (confirm('Reset semua pengaturan SEO ke default? Tindakan ini tidak bisa dibatalkan.')) {
            router.post(route('admin.seo-settings.reset'), {}, {
                preserveScroll: true,
            });
        }
    };

    const renderInput = (setting) => {
        const currentValue = editedSettings[setting.id] !== undefined
            ? editedSettings[setting.id]
            : setting.value;

        const isChanged = editedSettings[setting.id] !== undefined && editedSettings[setting.id] !== setting.value;

        if (setting.type === 'boolean') {
            return (
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={currentValue === 'true' || currentValue === true}
                        onChange={(e) => handleChange(setting.id, e.target.checked ? 'true' : 'false')}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                </label>
            );
        }

        if (setting.type === 'text') {
            return (
                <textarea
                    className={`w-full bg-gray-50 dark:bg-gray-900/50 border rounded-xl text-sm font-medium min-h-[80px] transition-all focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 ${isChanged ? 'border-indigo-500 dark:border-indigo-400' : 'border-gray-200 dark:border-gray-700'
                        }`}
                    value={currentValue}
                    onChange={(e) => handleChange(setting.id, e.target.value)}
                />
            );
        }

        return (
            <div className="flex items-center gap-3">
                <input
                    type={setting.type === 'integer' || setting.type === 'float' ? 'number' : 'text'}
                    step={setting.type === 'float' ? '0.1' : '1'}
                    className={`w-28 bg-gray-50 dark:bg-gray-900/50 border rounded-xl text-sm font-bold text-center transition-all focus:ring-2 focus:ring-indigo-500/20 dark:text-white ${isChanged ? 'border-indigo-500 dark:border-indigo-400' : 'border-gray-200 dark:border-gray-700'
                        }`}
                    value={currentValue}
                    onChange={(e) => handleChange(setting.id, e.target.value)}
                />
                {setting.unit && (
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{setting.unit}</span>
                )}
                {isChanged && (
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest animate-pulse">changed</span>
                )}
            </div>
        );
    };

    const groupKeys = Object.keys(settings);
    const changedCount = Object.keys(editedSettings).length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="font-black text-xl text-gray-800 dark:text-white uppercase tracking-tight">
                            Pengaturan SEO
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin.blog.index')}
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all border border-indigo-200 dark:border-indigo-800/50 mr-2"
                        >
                            &larr; Kembali ke Blog
                        </Link>
                        <a
                            href={route('admin.seo-settings.export')}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        >
                            📤 Export JSON
                        </a>
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all border border-red-200 dark:border-red-800/50"
                        >
                            🔄 Reset Default
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Pengaturan SEO" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="p-4 mb-6 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 animate-pulse">
                            ✅ {flash.success}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* GROUP NAVIGATION */}
                        <div className="lg:col-span-3 space-y-2 sticky top-24">
                            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">Kategori</h3>
                                {groupKeys.map(key => {
                                    const info = GROUP_LABELS[key] || { label: key, icon: '⚙️', desc: '' };
                                    const count = settings[key]?.length || 0;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setActiveGroup(key)}
                                            className={`w-full text-left px-4 py-3 rounded-2xl mb-1 transition-all group ${activeGroup === key
                                                ? 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-900/50 border border-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">{info.icon}</span>
                                                <div className="min-w-0">
                                                    <p className={`text-xs font-black truncate ${activeGroup === key
                                                        ? 'text-indigo-700 dark:text-indigo-300'
                                                        : 'text-gray-700 dark:text-gray-300'
                                                        }`}>{info.label}</p>
                                                    <p className="text-[10px] text-gray-400 truncate">{count} pengaturan</p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* AI Training Info */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] p-6 text-white shadow-xl">
                                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">🤖 AI Training</h4>
                                <p className="text-xs font-bold leading-relaxed opacity-90">
                                    Semua pengaturan ini digunakan oleh AI untuk menganalisis dan menggenerate konten. Perubahan akan langsung berlaku.
                                </p>
                                <a
                                    href={route('admin.seo-settings.export')}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 inline-block text-[9px] font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all"
                                >
                                    Download Rules JSON →
                                </a>
                            </div>
                        </div>

                        {/* SETTINGS EDITOR */}
                        <div className="lg:col-span-9">
                            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-6 md:p-8">
                                {(() => {
                                    const info = GROUP_LABELS[activeGroup] || { label: activeGroup, icon: '⚙️', desc: '' };
                                    return (
                                        <div className="mb-8">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl">{info.icon}</span>
                                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{info.label}</h3>
                                            </div>
                                            {info.desc && (
                                                <p className="text-xs text-gray-400 dark:text-gray-500 ml-10">{info.desc}</p>
                                            )}
                                        </div>
                                    );
                                })()}

                                <div className="space-y-1">
                                    {settings[activeGroup]?.map((setting) => (
                                        <div
                                            key={setting.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-gray-700/50"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {setting.label}
                                                </p>
                                                {setting.description && (
                                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                                                        {setting.description}
                                                    </p>
                                                )}
                                                {setting.default_value && setting.default_value !== setting.value && (
                                                    <p className="text-[10px] text-amber-500 dark:text-amber-400 mt-1 font-bold">
                                                        Default: {setting.default_value} {setting.unit || ''}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="shrink-0">
                                                {renderInput(setting)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STICKY SAVE BAR */}
                    {changedCount > 0 && (
                        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 shadow-2xl shadow-black/10">
                            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                        {changedCount} pengaturan diubah
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setEditedSettings({})}
                                        className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <PrimaryButton
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="!rounded-2xl !px-8 !py-3 !text-[10px] !tracking-widest !font-black !shadow-xl !shadow-indigo-500/20"
                                    >
                                        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
