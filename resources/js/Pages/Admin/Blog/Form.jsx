import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

// Debounce helper
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function BlogForm({ post, seoRules }) {
    const isEditing = !!post;

    const { data, setData, post: formPost, processing, errors, transform } = useForm({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        body: post?.body || '',
        primary_keyword: post?.primary_keyword || '',
        secondary_keywords: post?.secondary_keywords || '',
        meta_title: post?.meta_title || '',
        meta_description: post?.meta_description || '',
        meta_keywords: post?.meta_keywords || '',
        is_published: post?.is_published || false,
        featured_image: null,
    });

    const [seoAnalysis, setSeoAnalysis] = useState(post?.seo_analysis || null);
    const [seoScore, setSeoScore] = useState(post?.seo_score || 0);
    const [intent, setIntent] = useState(post?.search_intent || 'Detecting...');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // AI Generator state
    const [showGenerator, setShowGenerator] = useState(false);
    const [genKeyword, setGenKeyword] = useState('');
    const [genSecondary, setGenSecondary] = useState('');
    const [genTone, setGenTone] = useState('profesional dan informatif');
    const [genAudience, setGenAudience] = useState('masyarakat umum Indonesia');
    const [isGenerating, setIsGenerating] = useState(false);
    const [genProgress, setGenProgress] = useState('');
    const [genError, setGenError] = useState('');

    const debouncedData = useDebounce({
        title: data.title,
        body: data.body,
        primary_keyword: data.primary_keyword,
        meta_description: data.meta_description
    }, 1500);

    useEffect(() => {
        const runAnalysis = async () => {
            if (!debouncedData.title && !debouncedData.body) return;

            setIsAnalyzing(true);
            try {
                const response = await axios.post(route('admin.blog.analyze'), debouncedData);
                setSeoScore(response.data.score);
                setSeoAnalysis(response.data.checks);
                setIntent(response.data.intent);
            } catch (err) {
                console.error("SEO Analysis failed", err);
            } finally {
                setIsAnalyzing(false);
            }
        };

        runAnalysis();
    }, [debouncedData]);

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            transform((data) => ({
                ...data,
                _method: 'put',
            }));
            formPost(route('admin.blog.update', post.id), {
                forceFormData: true,
            });
        } else {
            formPost(route('admin.blog.store'));
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-500 bg-emerald-500';
        if (score >= 50) return 'text-amber-500 bg-amber-500';
        return 'text-red-500 bg-red-500';
    };

    // AI Content Generation
    const handleGenerate = async (type = 'full') => {
        if (!genKeyword.trim()) {
            setGenError('Masukkan keyword utama terlebih dahulu.');
            return;
        }

        setIsGenerating(true);
        setGenError('');
        setGenProgress(type === 'full' ? 'Menggenerate artikel lengkap (~30-60 detik)...' : 'Menggenerate meta...');

        try {
            const response = await axios.post(route('admin.blog.generate'), {
                primary_keyword: genKeyword,
                secondary_keywords: genSecondary,
                tone: genTone,
                audience: genAudience,
                type: type,
            });

            const result = response.data;

            if (result.error) {
                setGenError(result.error);
                return;
            }

            if (type === 'full') {
                if (result.h1 || result.seo_title) setData('title', result.h1 || result.seo_title);
                if (result.meta_description) setData('meta_description', result.meta_description);
                if (result.seo_title) setData('meta_title', result.seo_title);
                if (result.body) setData('body', result.body);
                if (result.primary_keyword) setData('primary_keyword', result.primary_keyword);
                setGenProgress('✅ Artikel berhasil digenerate!');
            } else {
                if (result.seo_title) setData('meta_title', result.seo_title);
                if (result.meta_description) setData('meta_description', result.meta_description);
                setGenProgress('✅ Meta berhasil digenerate!');
            }

            setTimeout(() => setGenProgress(''), 3000);
        } catch (err) {
            setGenError('Gagal generate konten. ' + (err.response?.data?.message || err.message));
        } finally {
            setIsGenerating(false);
        }
    };

    // SEO rules helper
    const getRule = (key, fallback) => {
        if (!seoRules || !seoRules[key]) return fallback;
        return seoRules[key].value;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blog" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            &larr; Batal
                        </Link>
                        <h2 className="font-black text-xl text-gray-800 dark:text-white uppercase tracking-tight">
                            {isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/seo-settings"
                            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        >
                            ⚙️ SEO Settings
                        </Link>
                        <button
                            onClick={() => setShowGenerator(!showGenerator)}
                            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border ${showGenerator
                                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50'
                                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30'
                                }`}
                        >
                            🤖 {showGenerator ? 'Tutup' : 'AI Generator'}
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* AI GENERATOR PANEL */}
                    {showGenerator && (
                        <div className="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-[2.5rem] border border-indigo-200/50 dark:border-indigo-800/30 shadow-2xl overflow-hidden">
                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-lg shadow-lg shadow-purple-500/30">
                                        🤖
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">AI Content Generator</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Generate artikel SEO-friendly otomatis berdasarkan keyword</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <InputLabel value="Keyword Utama *" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" />
                                        <TextInput
                                            className="w-full font-bold text-lg"
                                            value={genKeyword}
                                            onChange={(e) => setGenKeyword(e.target.value)}
                                            placeholder="Contoh: hipnoterapi"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Secondary / LSI Keywords" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" />
                                        <TextInput
                                            className="w-full text-sm"
                                            value={genSecondary}
                                            onChange={(e) => setGenSecondary(e.target.value)}
                                            placeholder="terapi hipnosis, terapi pikiran bawah sadar, hipnoterapi trauma"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Tone / Gaya Bahasa" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" />
                                        <select
                                            className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300"
                                            value={genTone}
                                            onChange={(e) => setGenTone(e.target.value)}
                                        >
                                            <option value="profesional dan informatif">Profesional & Informatif</option>
                                            <option value="hangat dan empatik">Hangat & Empatik</option>
                                            <option value="akademis dan ilmiah">Akademis & Ilmiah</option>
                                            <option value="santai dan conversational">Santai & Conversational</option>
                                            <option value="persuasif dan motivasi">Persuasif & Motivasi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <InputLabel value="Target Audience" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" />
                                        <select
                                            className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300"
                                            value={genAudience}
                                            onChange={(e) => setGenAudience(e.target.value)}
                                        >
                                            <option value="masyarakat umum Indonesia">Masyarakat Umum</option>
                                            <option value="profesional kesehatan">Profesional Kesehatan</option>
                                            <option value="mahasiswa psikologi">Mahasiswa Psikologi</option>
                                            <option value="orang tua">Orang Tua</option>
                                            <option value="remaja dan dewasa muda">Remaja & Dewasa Muda</option>
                                        </select>
                                    </div>
                                </div>

                                {/* SEO Rules Summary */}
                                {seoRules && (
                                    <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-200/50 dark:border-gray-700/50">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">📋 SEO Rules yang aktif</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center">
                                            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                                <p className="text-lg font-black text-indigo-600">{getRule('article_ideal_words', 2000)}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">kata min</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                                <p className="text-lg font-black text-indigo-600">{getRule('h2_min_count', 5)}-{getRule('h2_max_count', 8)}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">heading H2</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                                <p className="text-lg font-black text-indigo-600">{getRule('keyword_density_min', 1)}-{getRule('keyword_density_max', 1.5)}%</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">density</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                                <p className="text-lg font-black text-indigo-600">{getRule('faq_min_questions', 4)}-{getRule('faq_ideal_questions', 5)}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">FAQ</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                                <p className="text-lg font-black text-indigo-600">{getRule('internal_link_min', 3)}-{getRule('internal_link_ideal', 5)}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">int. link</p>
                                            </div>
                                            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                                <p className="text-lg font-black text-indigo-600">{getRule('image_min_count', 2)}-{getRule('image_ideal_count', 3)}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase">gambar</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {genError && (
                                    <div className="p-4 mb-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50">
                                        ❌ {genError}
                                    </div>
                                )}

                                {genProgress && (
                                    <div className="p-4 mb-4 text-sm text-indigo-800 dark:text-indigo-300 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50">
                                        {isGenerating && (
                                            <div className="flex gap-1 mb-2">
                                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                            </div>
                                        )}
                                        {genProgress}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleGenerate('full')}
                                        disabled={isGenerating}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-95"
                                    >
                                        {isGenerating ? '⏳ Generating...' : '🚀 Generate Artikel Lengkap'}
                                    </button>
                                    <button
                                        onClick={() => handleGenerate('meta')}
                                        disabled={isGenerating}
                                        className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        🏷️ Generate Meta Only
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* MAIN EDITOR FORM */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 md:p-10">
                                <form onSubmit={submit} className="space-y-8">

                                    {/* TITLE & KEYWORD */}
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <InputLabel htmlFor="title" value="Judul Artikel (H1)" className="text-[10px] font-black uppercase tracking-widest text-gray-400" />
                                                <span className={`text-[10px] font-bold ${data.title.length >= (getRule('h1_min_length', 60)) && data.title.length <= (getRule('h1_max_length', 80))
                                                        ? 'text-emerald-500'
                                                        : data.title.length > (getRule('h1_max_length', 80))
                                                            ? 'text-red-500'
                                                            : 'text-gray-400'
                                                    }`}>
                                                    {data.title.length} / {getRule('h1_min_length', 60)}-{getRule('h1_max_length', 80)} karakter
                                                </span>
                                            </div>
                                            <input
                                                id="title"
                                                type="text"
                                                className="block w-full text-2xl font-black bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-all"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Masukkan judul yang menarik..."
                                                required
                                            />
                                            {errors.title && <p className="text-xs text-red-600 mt-2 font-bold">{errors.title}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="primary_keyword" value="Primary Keyword" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                                                <TextInput
                                                    id="primary_keyword"
                                                    className="w-full font-bold"
                                                    value={data.primary_keyword}
                                                    onChange={(e) => setData('primary_keyword', e.target.value)}
                                                    placeholder="Contoh: hipnoterapi trauma"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="secondary_keywords" value="Secondary Keywords (Komma)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                                                <TextInput
                                                    id="secondary_keywords"
                                                    className="w-full text-xs"
                                                    value={data.secondary_keywords}
                                                    onChange={(e) => setData('secondary_keywords', e.target.value)}
                                                    placeholder="Contoh: trauma psikologis, cara kerja hipnoterapi"
                                                />
                                            </div>
                                            <div>
                                                <InputLabel value="Search Intent" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                                                <div className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-black inline-block min-w-full md:min-w-0">
                                                    {intent}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* EXCERPT */}
                                    <div>
                                        <InputLabel htmlFor="excerpt" value="Excerpt (Ringkasan Singkat)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                                        <textarea
                                            id="excerpt"
                                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 text-sm font-medium transition-all min-h-[100px]"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            placeholder="Ringkasan singkat untuk tampilan kartu blog..."
                                        />
                                    </div>

                                    {/* CONTENT - RICH TEXT */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <InputLabel htmlFor="body" value="Konten Artikel" className="text-[10px] font-black uppercase tracking-widest text-gray-400" />
                                            <span className={`text-[10px] font-bold ${(() => {
                                                    const plain = data.body ? data.body.replace(/<[^>]+>/g, '') : '';
                                                    const words = plain.split(/\s+/).filter(w => w.length > 0).length;
                                                    const minWords = getRule('article_min_words', 1800);
                                                    return words >= minWords ? 'text-emerald-500' : 'text-gray-400';
                                                })()
                                                }`}>
                                                {data.body ? data.body.replace(/<[^>]+>/g, '').split(/\s+/).filter(w => w.length > 0).length : 0} / {getRule('article_min_words', 1800)}+ kata
                                            </span>
                                        </div>
                                        <div className="mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden pb-14">
                                            <ReactQuill
                                                theme="snow"
                                                value={data.body}
                                                onChange={(content) => setData('body', content)}
                                                className="h-[500px]"
                                                modules={{
                                                    toolbar: [
                                                        [{ 'header': [1, 2, 3, false] }],
                                                        ['bold', 'italic', 'underline', 'strike'],
                                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                        ['link', 'image'],
                                                        ['clean']
                                                    ],
                                                }}
                                            />
                                        </div>
                                        {errors.body && <p className="text-xs text-red-600 mt-2 font-bold">{errors.body}</p>}
                                    </div>

                                    {/* IMAGE & SEO META */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                        <div className="space-y-4">
                                            <InputLabel value="Media Settings" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" />
                                            <div className="relative group p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl hover:border-indigo-500/50 transition-all text-center">
                                                {isEditing && post.featured_image && !data.featured_image && (
                                                    <img src={`/storage/${post.featured_image}`} alt="Current" className="h-32 mx-auto rounded-2xl mb-4 shadow-lg" />
                                                )}
                                                <input
                                                    id="featured_image"
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => setData('featured_image', e.target.files[0])}
                                                />
                                                <div className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                                                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <p className="text-xs font-black uppercase tracking-widest">{data.featured_image ? data.featured_image.name : 'Upload Featured Image'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <InputLabel value="Metadata" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" />
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-bold text-gray-400">SEO Title</span>
                                                    <span className={`text-[10px] font-bold ${data.meta_title.length >= (getRule('seo_title_min_length', 55)) && data.meta_title.length <= (getRule('seo_title_max_length', 65))
                                                            ? 'text-emerald-500'
                                                            : 'text-gray-400'
                                                        }`}>
                                                        {data.meta_title.length}/{getRule('seo_title_min_length', 55)}-{getRule('seo_title_max_length', 65)}
                                                    </span>
                                                </div>
                                                <TextInput
                                                    className="w-full text-xs font-bold"
                                                    value={data.meta_title}
                                                    onChange={(e) => setData('meta_title', e.target.value)}
                                                    placeholder="SEO Title (Meta Title)"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-bold text-gray-400">Meta Description</span>
                                                    <span className={`text-[10px] font-bold ${data.meta_description.length >= (getRule('meta_desc_min_length', 140)) && data.meta_description.length <= (getRule('meta_desc_max_length', 160))
                                                            ? 'text-emerald-500'
                                                            : 'text-gray-400'
                                                        }`}>
                                                        {data.meta_description.length}/{getRule('meta_desc_min_length', 140)}-{getRule('meta_desc_max_length', 160)}
                                                    </span>
                                                </div>
                                                <textarea
                                                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-xs font-medium min-h-[100px]"
                                                    value={data.meta_description}
                                                    onChange={(e) => setData('meta_description', e.target.value)}
                                                    placeholder="Meta Description..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-10 border-t border-gray-100 dark:border-gray-700/50">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={data.is_published}
                                                    onChange={(e) => setData('is_published', e.target.checked)}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-y-[-50%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                            </div>
                                            <span className="text-sm font-black text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-tight">Publikasikan</span>
                                        </label>

                                        <PrimaryButton className="px-10 py-4 !rounded-2xl shadow-xl shadow-indigo-500/20" disabled={processing}>
                                            {isEditing ? 'Simpan Perubahan' : 'Publish Sekarang'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* SEO SIDEBAR DASHBOARD */}
                        <div className="lg:col-span-4 space-y-6 sticky top-24">
                            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-6 md:p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">SEO Score</h3>
                                    {isAnalyzing && (
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    )}
                                </div>

                                {/* Circular Score Display or Bar */}
                                <div className="space-y-4">
                                    <div className="flex items-end justify-between px-2">
                                        <span className={`text-6xl font-black ${seoScore >= 80 ? 'text-emerald-500' : (seoScore >= 50 ? 'text-amber-500' : 'text-red-500')}`}>
                                            {seoScore}
                                        </span>
                                        <span className="text-sm font-bold text-gray-400 mb-2">/ 100</span>
                                    </div>
                                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${getScoreColor(seoScore).split(' ')[1]}`}
                                            style={{ width: `${seoScore}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <hr className="my-8 border-gray-100 dark:border-gray-700/50" />

                                {/* SEO CHECKLIST */}
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Real-time Checkup</h4>
                                    <div className="space-y-4">
                                        {seoAnalysis ? Object.entries(seoAnalysis).map(([key, groupChecks]) => (
                                            <div key={key} className="space-y-3">
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{key.replace('_', ' ')}</p>
                                                <ul className="space-y-3">
                                                    {Array.isArray(groupChecks) && groupChecks.map((check, i) => (
                                                        <li key={i} className="flex gap-3 group">
                                                            <div className="shrink-0 mt-0.5">
                                                                {check.status === 'success' ? (
                                                                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                                                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                                    </div>
                                                                ) : check.status === 'warning' ? (
                                                                    <div className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                                                                        <span className="text-[10px] font-black">!</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                                                                        <span className="text-[10px] font-black">?</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">{check.name}</p>
                                                                <p className="text-[10px] text-gray-400 leading-tight mt-0.5 line-clamp-2">{check.message}</p>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )) : (
                                            <div className="py-10 text-center space-y-4 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-3xl">
                                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto text-gray-300">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed">Analisis Otomatis Akan Berjalan Saat Anda Menulis...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-10 p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v7h-2z" /></svg>
                                    </div>
                                    <h5 className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Pro-Tip</h5>
                                    <p className="text-xs font-bold leading-relaxed mb-4">Pastikan keyword utama Anda muncul di {getRule('intro_keyword_within_words', 50)} kata pertama artikel!</p>
                                    <Link
                                        href="/admin/seo-settings"
                                        className="text-[9px] font-black uppercase bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all tracking-widest"
                                    >
                                        Lihat SEO Settings →
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
