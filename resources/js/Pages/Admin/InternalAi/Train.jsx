import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

const CATEGORIES = [
    { value: 'general', label: '📋 Umum' },
    { value: 'tone', label: '🎯 Gaya Bahasa' },
    { value: 'content', label: '📝 Konten' },
    { value: 'forbidden', label: '🚫 Larangan' },
];

export default function Train({ agent, instructions }) {
    const [activeTab, setActiveTab] = useState('do');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const { data, setData, post, processing, reset } = useForm({
        type: 'do',
        instruction: '',
        category: 'general',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.internal-ai.instructions.store', agent.id), {
            onSuccess: () => reset('instruction'),
            preserveScroll: true,
        });
    };

    const toggleActive = (item) => {
        router.put(route('admin.internal-ai.instructions.update', [agent.id, item.id]), {
            instruction: item.instruction,
            is_active: !item.is_active,
            category: item.category,
        }, { preserveScroll: true });
    };

    const saveEdit = (item) => {
        router.put(route('admin.internal-ai.instructions.update', [agent.id, item.id]), {
            instruction: editText,
            is_active: item.is_active,
            category: item.category,
        }, {
            preserveScroll: true,
            onSuccess: () => { setEditingId(null); setEditText(''); },
        });
    };

    const deleteItem = (item) => {
        if (!confirm('Hapus instruksi ini?')) return;
        router.delete(route('admin.internal-ai.instructions.destroy', [agent.id, item.id]), { preserveScroll: true });
    };

    const currentItems = activeTab === 'do' ? (instructions?.dos || []) : (instructions?.donts || []);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <Link href={route('admin.internal-ai.index')} className="text-sm text-indigo-500 hover:text-indigo-700 font-medium mb-2 inline-block">
                        ← Kembali ke Manajemen Agent
                    </Link>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        🧠 Training: {agent.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Training - ${agent.name}`} />

            <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Agent Info */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 mb-6 border border-gray-200/60 dark:border-gray-700/50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl flex-shrink-0">
                        🤖
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-gray-900 dark:text-white">{agent.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{agent.description || 'Tidak ada deskripsi.'}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${agent.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                        {agent.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                </div>

                {/* System Prompt Preview */}
                {agent.system_prompt && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">🧩 System Prompt Dasar</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{agent.system_prompt}</p>
                    </div>
                )}

                {/* Info */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-5 mb-8 border border-indigo-200/50 dark:border-indigo-800/30">
                    <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-1">💡 Cara Training</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Gunakan tab <strong>DO</strong> untuk hal yang harus dilakukan AI, dan <strong>DON'T</strong> untuk hal yang dilarang.
                        Instruksi aktif akan otomatis diinjeksi ke dalam sistem saat karyawan chat dengan agent ini.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-3 mb-6">
                    {[
                        { key: 'do', label: `✅ DO (${instructions?.dos?.length || 0})`, active: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30', inactive: 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20' },
                        { key: 'dont', label: `🚫 DON'T (${instructions?.donts?.length || 0})`, active: 'bg-red-500 text-white shadow-lg shadow-red-500/30', inactive: 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950/20' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => { setActiveTab(tab.key); setData('type', tab.key); }}
                            className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab.key ? tab.active : tab.inactive}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Add Instruction Form */}
                <form onSubmit={submit} className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                        {activeTab === 'do' ? '➕ Tambah Instruksi DO (AI Harus)' : "➕ Tambah Instruksi DON'T (AI Dilarang)"}
                    </p>
                    <div className="flex gap-3">
                        <select
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium dark:text-gray-300 w-40 flex-shrink-0"
                        >
                            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                        <input
                            type="text"
                            value={data.instruction}
                            onChange={e => setData('instruction', e.target.value)}
                            placeholder={activeTab === 'do'
                                ? 'Contoh: Selalu jawab dengan sopan dan profesional'
                                : 'Contoh: Jangan memberikan informasi gaji karyawan lain'}
                            className="flex-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium dark:text-gray-300 focus:ring-2 focus:ring-indigo-500/20"
                            required
                        />
                        <button
                            type="submit"
                            disabled={processing || !data.instruction.trim()}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all disabled:opacity-50 flex-shrink-0 ${activeTab === 'do' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'}`}
                        >
                            Tambah
                        </button>
                    </div>
                </form>

                {/* Instructions List */}
                <div className="space-y-3">
                    {currentItems.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                            <p className="text-4xl mb-3">{activeTab === 'do' ? '✅' : '🚫'}</p>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Belum ada instruksi {activeTab === 'do' ? 'DO' : "DON'T"}.</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Tambahkan instruksi di atas untuk mulai melatih agent ini.</p>
                        </div>
                    ) : (
                        currentItems.map((item, index) => {
                            const cat = CATEGORIES.find(c => c.value === item.category) || CATEGORIES[0];
                            return (
                                <div
                                    key={item.id}
                                    className={`bg-white dark:bg-gray-800 rounded-2xl p-4 border transition-all ${item.is_active ? 'border-gray-200/50 dark:border-gray-700/50' : 'border-gray-200/30 dark:border-gray-700/30 opacity-50'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${activeTab === 'do' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                                            {index + 1}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            {cat.label}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            {editingId === item.id ? (
                                                <input
                                                    type="text"
                                                    value={editText}
                                                    onChange={e => setEditText(e.target.value)}
                                                    className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-300"
                                                    autoFocus
                                                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(item); if (e.key === 'Escape') setEditingId(null); }}
                                                />
                                            ) : (
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{item.instruction}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {editingId === item.id ? (
                                                <>
                                                    <button onClick={() => saveEdit(item)} className="text-emerald-500 hover:text-emerald-700 text-xs font-bold">Simpan</button>
                                                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 text-xs font-bold">Batal</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => toggleActive(item)} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${item.is_active ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-200' : 'bg-gray-100 dark:bg-gray-900 text-gray-400 hover:bg-gray-200'}`}>
                                                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                                                    </button>
                                                    <button onClick={() => { setEditingId(item.id); setEditText(item.instruction); }} className="text-indigo-400 hover:text-indigo-600 p-1" title="Edit">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </button>
                                                    <button onClick={() => deleteItem(item)} className="text-red-400 hover:text-red-600 p-1" title="Hapus">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Prompt Preview */}
                {(instructions?.dos?.length > 0 || instructions?.donts?.length > 0) && (
                    <div className="mt-10 bg-gray-900 dark:bg-gray-950 rounded-3xl p-6 border border-gray-700/50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                            👁️ Preview Prompt yang Akan Dikirim ke AI
                        </p>
                        <pre className="text-xs text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                            {agent.system_prompt && `[System Prompt]\n${agent.system_prompt}\n`}
                            {instructions?.dos?.filter(d => d.is_active).length > 0 && (
                                "\nATURAN TAMBAHAN (WAJIB DIIKUTI):\n" +
                                instructions.dos.filter(d => d.is_active).map((d, i) => `${i + 1}. ${d.instruction}\n`).join('')
                            )}
                            {instructions?.donts?.filter(d => d.is_active).length > 0 && (
                                "\nLARANGAN (JANGAN DILANGGAR):\n" +
                                instructions.donts.filter(d => d.is_active).map(d => `- JANGAN: ${d.instruction}\n`).join('')
                            )}
                        </pre>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
