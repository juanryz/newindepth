import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

function useDebounce(value, delay) {
    const [dv, setDv] = useState(value);
    useEffect(() => { const t = setTimeout(() => setDv(value), delay); return () => clearTimeout(t); }, [value, delay]);
    return dv;
}

const PROGRESS_STEPS = [
    { icon: '🔍', label: 'Menganalisis keyword & kompetisi...', duration: 4000 },
    { icon: '📋', label: 'Membuat outline & struktur H2/H3...', duration: 8000 },
    { icon: '📝', label: 'Generate meta title & description...', duration: 3000 },
    { icon: '✍️', label: 'Menulis konten lengkap (2000+ kata)...', duration: 40000 },
    { icon: '🔗', label: 'Menambahkan 5 internal & 2 external link...', duration: 8000 },
    { icon: '🖼️', label: 'Menyisipkan 3 gambar ke dalam konten...', duration: 5000 },
    { icon: '📊', label: 'Mengoptimasi keyword density & SEO 90+...', duration: 8000 },
    { icon: '🛡️', label: 'Memfilter kata terlarang...', duration: 3000 },
    { icon: '❓', label: 'Membuat FAQ section...', duration: 5000 },
    { icon: '✅', label: 'Finalisasi & review artikel...', duration: 3000 },
];

export default function BlogForm({ post, seoRules, forbiddenWords = [] }) {
    const isEditing = !!post;
    const { data, setData, post: formPost, processing, errors, transform } = useForm({
        title: post?.title || '', excerpt: post?.excerpt || '', body: post?.body || '',
        primary_keyword: post?.primary_keyword || '', secondary_keywords: post?.secondary_keywords || '',
        meta_title: post?.meta_title || '', meta_description: post?.meta_description || '',
        meta_keywords: post?.meta_keywords || '', is_published: post?.is_published || false,
        featured_image: null, scheduled_at: post?.scheduled_at ? post.scheduled_at.slice(0, 16) : '',
    });

    const [seoAnalysis, setSeoAnalysis] = useState(post?.seo_analysis || null);
    const [seoScore, setSeoScore] = useState(post?.seo_score || 0);
    const [intent, setIntent] = useState(post?.search_intent || 'Mendeteksi...');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [genKeyword, setGenKeyword] = useState('');
    const [genSecondary, setGenSecondary] = useState('');
    const [genTone, setGenTone] = useState('profesional dan informatif');
    const [genAudience, setGenAudience] = useState('masyarakat umum Indonesia');
    const [isGenerating, setIsGenerating] = useState(false);
    const [genError, setGenError] = useState('');
    const [currentStep, setCurrentStep] = useState(-1);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [showIdeas, setShowIdeas] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [ideasKeyword, setIdeasKeyword] = useState('');
    const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
    const [foundForbidden, setFoundForbidden] = useState([]);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [imageStyle, setImageStyle] = useState('profesional');
    const [editingForbidden, setEditingForbidden] = useState(false);
    const [localForbiddenWords, setLocalForbiddenWords] = useState(forbiddenWords || []);
    const [newForbiddenWord, setNewForbiddenWord] = useState('');
    const [savingForbidden, setSavingForbidden] = useState(false);
    const [forbiddenSaved, setForbiddenSaved] = useState(false);
    const stepTimers = useRef([]);

    const debouncedData = useDebounce({ title: data.title, body: data.body, primary_keyword: data.primary_keyword, meta_description: data.meta_description }, 1500);

    useEffect(() => {
        const run = async () => {
            if (!debouncedData.title && !debouncedData.body) return;
            setIsAnalyzing(true);
            try {
                const r = await axios.post(route('admin.blog.analyze'), debouncedData);
                setSeoScore(r.data.score); setSeoAnalysis(r.data.checks); setIntent(r.data.intent);
            } catch (e) { console.error("Analisis SEO gagal", e); }
            finally { setIsAnalyzing(false); }
        };
        run();
    }, [debouncedData]);

    useEffect(() => {
        if (!localForbiddenWords.length) return;
        const allText = (data.title + ' ' + data.body + ' ' + data.meta_description).toLowerCase();
        setFoundForbidden(localForbiddenWords.filter(w => allText.includes(w.toLowerCase())));
    }, [data.title, data.body, data.meta_description, localForbiddenWords]);

    const startProgressSteps = () => {
        setCurrentStep(0); setCompletedSteps([]);
        stepTimers.current.forEach(t => clearTimeout(t));
        stepTimers.current = [];
        let elapsed = 0;
        PROGRESS_STEPS.forEach((step, i) => {
            if (i > 0) {
                const t = setTimeout(() => {
                    setCompletedSteps(prev => [...prev, i - 1]);
                    setCurrentStep(i);
                }, elapsed);
                stepTimers.current.push(t);
            }
            elapsed += step.duration;
        });
    };

    const stopProgressSteps = (success = true) => {
        stepTimers.current.forEach(t => clearTimeout(t));
        if (success) { setCompletedSteps(PROGRESS_STEPS.map((_, i) => i)); setCurrentStep(-1); }
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) { transform((d) => ({ ...d, _method: 'put' })); formPost(route('admin.blog.update', post.id), { forceFormData: true }); }
        else formPost(route('admin.blog.store'));
    };

    const getScoreColor = (s) => s >= 80 ? 'text-emerald-500 bg-emerald-500' : s >= 50 ? 'text-amber-500 bg-amber-500' : 'text-red-500 bg-red-500';

    const handleGenerate = async (type = 'full') => {
        const kw = type === 'ideas' ? ideasKeyword : genKeyword;
        if (!kw.trim()) { setGenError('Masukkan keyword utama terlebih dahulu.'); return; }
        setGenError('');

        // Ideas uses separate loading state
        if (type === 'ideas') {
            setIsLoadingIdeas(true);
            console.log('[AI Ideas] Searching for ideas with keyword:', kw);
            try {
                const r = await axios.post(route('admin.blog.generate'), { primary_keyword: kw, secondary_keywords: '', tone: genTone, audience: genAudience, type: 'ideas' });
                console.log('[AI Ideas] Response:', r.data);
                if (r.data.error) { setGenError(r.data.error); setIsLoadingIdeas(false); return; }
                if (r.data.ideas) { setIdeas(r.data.ideas); setShowIdeas(true); setGenError(''); }
            } catch (err) {
                console.error('[AI Ideas] Error:', err);
                setGenError('Gagal mencari ide. ' + (err.response?.data?.message || err.message));
            }
            finally { setIsLoadingIdeas(false); }
            return;
        }

        setIsGenerating(true);
        if (type === 'full') startProgressSteps();
        try {
            const r = await axios.post(route('admin.blog.generate'), { primary_keyword: kw, secondary_keywords: genSecondary, tone: genTone, audience: genAudience, type });
            if (r.data.error) { setGenError(r.data.error); stopProgressSteps(false); return; }
            if (type === 'full') {
                if (r.data.h1 || r.data.seo_title) setData('title', r.data.h1 || r.data.seo_title);
                if (r.data.meta_description) setData('meta_description', r.data.meta_description);
                if (r.data.seo_title) setData('meta_title', r.data.seo_title);
                if (r.data.body) setData('body', r.data.body);
                if (r.data.primary_keyword) setData('primary_keyword', r.data.primary_keyword);
                stopProgressSteps(true);
            } else if (type === 'meta') {
                if (r.data.seo_title) setData('meta_title', r.data.seo_title);
                if (r.data.meta_description) setData('meta_description', r.data.meta_description);
            }
        } catch (err) { setGenError('Gagal generate. ' + (err.response?.data?.message || err.message)); stopProgressSteps(false); }
        finally { setIsGenerating(false); }
    };

    const handleGenerateImage = async () => {
        const kw = genKeyword || data.primary_keyword || 'hipnoterapi';
        if (!kw.trim()) { setGenError('Masukkan keyword untuk generate gambar.'); return; }
        setIsGeneratingImage(true); setGenError('');
        try {
            const r = await axios.post(route('admin.blog.generate-image'), { keyword: kw, style: imageStyle });
            if (r.data.error) { setGenError(r.data.error); return; }
            if (r.data.url) setGeneratedImageUrl(r.data.url);
            if (r.data.path) setData('featured_image_path', r.data.path);
        } catch (err) { setGenError('Gagal generate gambar. ' + (err.response?.data?.message || err.message)); }
        finally { setIsGeneratingImage(false); }
    };

    const [selectedIdeaTitle, setSelectedIdeaTitle] = useState('');

    const useIdea = (idea) => {
        // Use the AI-generated keyword directly (now unique per idea)
        const mainKeyword = (idea.keyword || idea.title).toLowerCase().replace(/[?!.:]/g, '').trim();
        const secondaryKw = idea.description ? idea.description.split('.')[0] : '';

        // Force reset first to trigger re-render
        setGenKeyword('');
        setGenSecondary('');

        setTimeout(() => {
            setGenKeyword(mainKeyword);
            setGenSecondary(secondaryKw);

            // Show selected confirmation
            setSelectedIdeaTitle(idea.title);
            setTimeout(() => setSelectedIdeaTitle(''), 4000);

            // Scroll to keyword input
            setShowGenerator(true);
            setTimeout(() => {
                const el = document.querySelector('[placeholder="Contoh: hipnoterapi"]');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.focus();
                    el.style.borderColor = '#6366f1';
                    el.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.3)';
                    setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2000);
                }
            }, 100);
        }, 50);
    };
    const getRule = (key, fb) => seoRules?.[key]?.value ?? fb;
    const getWordCount = () => data.body ? data.body.replace(/<[^>]+>/g, '').split(/\s+/).filter(w => w.length > 0).length : 0;

    const addForbiddenWord = () => {
        const word = newForbiddenWord.trim().toLowerCase();
        if (!word) return;
        if (localForbiddenWords.some(w => w.toLowerCase() === word)) {
            setNewForbiddenWord('');
            return;
        }
        setLocalForbiddenWords(prev => [...prev, word]);
        setNewForbiddenWord('');
    };

    const removeForbiddenWord = (wordToRemove) => {
        setLocalForbiddenWords(prev => prev.filter(w => w !== wordToRemove));
    };

    const saveForbiddenWords = async () => {
        setSavingForbidden(true);
        setForbiddenSaved(false);
        try {
            const r = await axios.post(route('admin.blog.update-forbidden-words'), { words: localForbiddenWords });
            if (r.data.success) {
                setForbiddenSaved(true);
                setTimeout(() => setForbiddenSaved(false), 3000);
            }
        } catch (err) { console.error('Gagal menyimpan kata terlarang', err); }
        finally { setSavingForbidden(false); }
    };

    const handleForbiddenKeyDown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addForbiddenWord(); }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blog" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">&larr; Kembali</Link>
                        <h2 className="font-black text-xl text-gray-800 dark:text-white uppercase tracking-tight">{isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/seo-settings" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">⚙️ Pengaturan SEO</Link>
                        <button onClick={() => setShowGenerator(!showGenerator)} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border ${showGenerator ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20'}`}>
                            🤖 {showGenerator ? 'Tutup AI' : 'AI Generator'}
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'} />

            {/* TOAST: Ide Terpilih */}
            {selectedIdeaTitle && (
                <div className="fixed top-20 right-6 z-[9999] animate-bounce-in max-w-sm">
                    <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl shadow-indigo-500/30 flex items-center gap-3">
                        <span className="text-lg">✅</span>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Ide Terpilih</p>
                            <p className="text-xs font-bold line-clamp-1">{selectedIdeaTitle}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12"><div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                {/* PERINGATAN KATA TERLARANG */}
                {foundForbidden.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">🚫</span>
                            <div>
                                <p className="text-sm font-bold text-red-700 dark:text-red-300">Kata Terlarang Terdeteksi!</p>
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Kata berikut harus dihindari:</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {foundForbidden.map((w, i) => <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-[10px] font-black uppercase rounded-lg">{w}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* AI GENERATOR */}
                {showGenerator && (
                    <div className="mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-[2.5rem] border border-indigo-200/50 dark:border-indigo-800/30 shadow-2xl overflow-hidden">
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-lg shadow-lg shadow-purple-500/30">🤖</div>
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">AI Content Generator</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Generate artikel SEO-friendly otomatis berdasarkan keyword</p>
                                </div>
                            </div>

                            {/* IDE ARTIKEL */}
                            <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-5 mb-6 border border-gray-200/50 dark:border-gray-700/50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">💡 Cari Ide Artikel</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Belum punya ide? Masukkan topik dan AI akan menyarankan artikel yang relevan.</p>
                                <div className="flex gap-3">
                                    <TextInput className="flex-1 text-sm" value={ideasKeyword} onChange={(e) => setIdeasKeyword(e.target.value)} placeholder="Masukkan topik, misal: hipnoterapi, kecemasan..." />
                                    <button type="button" onClick={() => handleGenerate('ideas')} disabled={isLoadingIdeas} className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-amber-500/20 min-w-[120px]">
                                        {isLoadingIdeas ? '⏳ Mencari...' : '💡 Cari Ide'}
                                    </button>
                                </div>

                                {/* ERROR IN IDEAS */}
                                {genError && !isLoadingIdeas && (
                                    <div className="mt-3 p-3 text-sm text-red-800 dark:text-red-300 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50">
                                        ❌ {genError}
                                    </div>
                                )}

                                {/* IDEAS LOADING PROGRESS */}
                                {isLoadingIdeas && (
                                    <div className="mt-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4 border border-amber-200/50 dark:border-amber-800/30">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                                            </div>
                                            <span className="text-sm font-bold text-amber-700 dark:text-amber-300">Sedang mencari ide artikel...</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                                                <span>🔍</span><span>Menganalisis topik "{ideasKeyword}"...</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-amber-600/60 dark:text-amber-400/60">
                                                <span>📊</span><span>Mengevaluasi potensi traffic...</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-amber-600/40 dark:text-amber-400/40">
                                                <span>💡</span><span>Menyusun rekomendasi artikel...</span>
                                            </div>
                                        </div>
                                        <div className="mt-3 h-1.5 bg-amber-200/50 dark:bg-amber-800/30 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 rounded-full animate-pulse" style={{ width: '70%', transition: 'width 3s' }}></div>
                                        </div>
                                    </div>
                                )}

                                {/* IDEAS RESULTS */}
                                {showIdeas && ideas.length > 0 && !isLoadingIdeas && (
                                    <div className="mt-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">✅ {ideas.length} Ide Artikel Ditemukan — Klik salah satu untuk digunakan</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {ideas.map((idea, i) => {
                                                const isSelected = selectedIdeaTitle === idea.title;
                                                return (
                                                    <button type="button" key={i} onClick={() => useIdea(idea)}
                                                        className={`text-left p-4 rounded-2xl border-2 transition-all group cursor-pointer hover:shadow-lg active:scale-[0.98] ${isSelected
                                                            ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-400 dark:border-indigo-500 shadow-lg shadow-indigo-500/10'
                                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-indigo-500/10'
                                                            }`}>
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className={`text-sm font-bold line-clamp-2 transition-colors ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'}`}>{idea.title}</p>
                                                            {isSelected && <span className="text-lg shrink-0">✅</span>}
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{idea.description}</p>
                                                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                                                            <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase rounded-md">{idea.keyword}</span>
                                                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-md ${idea.volume === 'tinggi' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' : idea.volume === 'sedang' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-500'}`}>📊 {idea.volume}</span>
                                                            <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 text-[9px] font-bold uppercase rounded-md">{idea.intent}</span>
                                                        </div>
                                                        <p className={`text-[10px] font-bold mt-2 flex items-center gap-1 transition-transform ${isSelected ? 'text-emerald-500' : 'text-indigo-500 group-hover:translate-x-1'}`}>
                                                            {isSelected ? '✅ Terpilih — keyword sudah diisi' : '👉 Gunakan ide ini'}
                                                        </p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div><InputLabel value="Keyword Utama *" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" /><TextInput className="w-full font-bold text-lg" value={genKeyword} onChange={(e) => setGenKeyword(e.target.value)} placeholder="Contoh: hipnoterapi" /></div>
                                <div><InputLabel value="Secondary / LSI Keywords" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" /><TextInput className="w-full text-sm" value={genSecondary} onChange={(e) => setGenSecondary(e.target.value)} placeholder="terapi hipnosis, terapi bawah sadar" /></div>
                                <div><InputLabel value="Gaya Bahasa" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" />
                                    <select className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300" value={genTone} onChange={(e) => setGenTone(e.target.value)}>
                                        <option value="profesional dan informatif">Profesional & Informatif</option><option value="hangat dan empatik">Hangat & Empatik</option><option value="akademis dan ilmiah">Akademis & Ilmiah</option><option value="santai dan conversational">Santai & Conversational</option><option value="persuasif dan motivasi">Persuasif & Motivasi</option>
                                    </select></div>
                                <div><InputLabel value="Target Pembaca" className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" />
                                    <select className="w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300" value={genAudience} onChange={(e) => setGenAudience(e.target.value)}>
                                        <option value="masyarakat umum Indonesia">Masyarakat Umum</option><option value="profesional kesehatan">Profesional Kesehatan</option><option value="mahasiswa psikologi">Mahasiswa Psikologi</option><option value="orang tua">Orang Tua</option><option value="remaja dan dewasa muda">Remaja & Dewasa Muda</option>
                                    </select></div>
                            </div>

                            {/* ATURAN SEO AKTIF */}
                            {seoRules && (
                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-200/50 dark:border-gray-700/50">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">📋 Aturan SEO Aktif</p>
                                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                                        {[{ v: getRule('article_ideal_words', 2000), l: 'kata min' }, { v: `${getRule('h2_min_count', 5)}-${getRule('h2_max_count', 8)}`, l: 'heading H2' }, { v: `${getRule('keyword_density_min', 1)}-${getRule('keyword_density_max', 1.5)}%`, l: 'density' }, { v: `${getRule('faq_min_questions', 4)}-${getRule('faq_ideal_questions', 5)}`, l: 'FAQ' }, { v: `${getRule('internal_link_min', 3)}-${getRule('internal_link_ideal', 5)}`, l: 'int. link' }, { v: `${getRule('image_min_count', 2)}-${getRule('image_ideal_count', 3)}`, l: 'gambar' }].map((x, i) =>
                                            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700"><p className="text-lg font-black text-indigo-600">{x.v}</p><p className="text-[9px] font-bold text-gray-400 uppercase">{x.l}</p></div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {genError && <div className="p-4 mb-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50">❌ {genError}</div>}

                            {/* PROGRESS DETAIL STEPS */}
                            {isGenerating && currentStep >= 0 && (
                                <div className="mb-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl p-5 border border-indigo-200/50 dark:border-indigo-700/50">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">⏳ Progres Generate Artikel</p>
                                    <div className="space-y-3">
                                        {PROGRESS_STEPS.map((step, i) => {
                                            const done = completedSteps.includes(i);
                                            const active = currentStep === i;
                                            return (
                                                <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${done ? 'opacity-60' : active ? 'opacity-100' : 'opacity-30'}`}>
                                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 transition-all ${done ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' : active ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 animate-pulse ring-2 ring-indigo-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                                        {done ? '✓' : step.icon}
                                                    </div>
                                                    <span className={`text-sm font-bold ${done ? 'text-emerald-600 dark:text-emerald-400 line-through' : active ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-400'}`}>{step.label}</span>
                                                    {active && <div className="flex gap-1 ml-2"><span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></span><span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span><span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span></div>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${Math.round(((completedSteps.length) / PROGRESS_STEPS.length) * 100)}%` }}></div>
                                    </div>
                                </div>
                            )}

                            {/* ALL DONE */}
                            {!isGenerating && completedSteps.length === PROGRESS_STEPS.length && (
                                <div className="p-4 mb-4 text-sm rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 font-bold">✅ Artikel berhasil digenerate! Silakan review konten sebelum publish.</div>
                            )}

                            <div className="flex flex-wrap gap-3">
                                <button onClick={() => handleGenerate('full')} disabled={isGenerating} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-95">
                                    {isGenerating ? '⏳ Sedang Generate...' : '🚀 Generate Artikel Lengkap'}
                                </button>
                                <button onClick={() => handleGenerate('meta')} disabled={isGenerating} className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 transition-all disabled:opacity-50">
                                    🏷️ Generate Meta Saja
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* FORM UTAMA */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 md:p-10">
                            <form onSubmit={submit} className="space-y-8">
                                {/* JUDUL & KEYWORD */}
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <InputLabel htmlFor="title" value="Judul Artikel (H1)" className="text-[10px] font-black uppercase tracking-widest text-gray-400" />
                                            <span className={`text-[10px] font-bold ${data.title.length >= getRule('h1_min_length', 60) && data.title.length <= getRule('h1_max_length', 80) ? 'text-emerald-500' : data.title.length > getRule('h1_max_length', 80) ? 'text-red-500' : 'text-gray-400'}`}>{data.title.length} / {getRule('h1_min_length', 60)}-{getRule('h1_max_length', 80)} karakter</span>
                                        </div>
                                        <input id="title" type="text" className="block w-full text-2xl font-black bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-white" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Masukkan judul yang menarik..." required />
                                        {errors.title && <p className="text-xs text-red-600 mt-2 font-bold">{errors.title}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><InputLabel htmlFor="primary_keyword" value="Keyword Utama" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" /><TextInput id="primary_keyword" className="w-full font-bold" value={data.primary_keyword} onChange={(e) => setData('primary_keyword', e.target.value)} placeholder="Contoh: hipnoterapi trauma" /></div>
                                        <div><InputLabel htmlFor="secondary_keywords" value="Keyword Sekunder (Komma)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" /><TextInput id="secondary_keywords" className="w-full text-xs" value={data.secondary_keywords} onChange={(e) => setData('secondary_keywords', e.target.value)} placeholder="trauma psikologis, cara kerja hipnoterapi" /></div>
                                        <div><InputLabel value="Intensi Pencarian" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" /><div className="px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-black">{intent}</div></div>
                                    </div>
                                </div>

                                {/* RINGKASAN */}
                                <div><InputLabel htmlFor="excerpt" value="Ringkasan Singkat" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" />
                                    <textarea id="excerpt" className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 text-sm font-medium min-h-[100px]" value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} placeholder="Ringkasan singkat untuk tampilan kartu blog..." /></div>

                                {/* KONTEN */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <InputLabel htmlFor="body" value="Konten Artikel" className="text-[10px] font-black uppercase tracking-widest text-gray-400" />
                                        <span className={`text-[10px] font-bold ${getWordCount() >= getRule('article_min_words', 1800) ? 'text-emerald-500' : 'text-gray-400'}`}>{getWordCount()} / {getRule('article_min_words', 1800)}+ kata</span>
                                    </div>
                                    <div className="mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden pb-14 focus-within:ring-2 focus-within:ring-indigo-500/20">
                                        <style>{`.dark .ql-editor{color:#e2e8f0;font-size:1rem;line-height:1.7}.dark .ql-editor.ql-blank::before{color:#64748b}.dark .ql-toolbar{border-bottom:1px solid #334155!important;background:#0f172a}.dark .ql-container{border:none!important}.dark .ql-snow .ql-stroke{stroke:#94a3b8}.dark .ql-snow .ql-fill{fill:#94a3b8}.dark .ql-snow .ql-picker{color:#94a3b8}.dark .ql-snow .ql-picker-options{background-color:#1e293b;border:1px solid #334155}.ql-editor{min-height:450px;font-family:inherit}.ql-toolbar.ql-snow{border:none!important;padding:12px}.ql-editor img{max-width:100%;height:auto;border-radius:12px;margin:16px 0}.ql-editor figure{margin:24px 0;text-align:center}.ql-editor figcaption{font-size:0.85em;color:#6b7280;margin-top:8px;font-style:italic}`}</style>
                                        <ReactQuill theme="snow" value={data.body} onChange={(c) => setData('body', c)} className="h-[500px]" modules={{ toolbar: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'image'], ['clean']] }} />
                                    </div>
                                    {errors.body && <p className="text-xs text-red-600 mt-2 font-bold">{errors.body}</p>}
                                </div>

                                {/* GAMBAR & META */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                    <div className="space-y-4">
                                        <InputLabel value="Gambar Utama" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" />
                                        {/* GENERATE IMAGE AI */}
                                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-800/30">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-3">🎨 Generate Gambar AI</p>
                                            <select className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium mb-3 dark:text-gray-300" value={imageStyle} onChange={(e) => setImageStyle(e.target.value)}>
                                                <option value="profesional">Profesional &amp; Clean</option><option value="hangat">Hangat &amp; Calming</option><option value="minimalis">Minimalis &amp; Elegan</option><option value="ilustrasi">Ilustrasi Digital</option><option value="fotografi">Fotografi</option>
                                            </select>
                                            <button type="button" onClick={handleGenerateImage} disabled={isGeneratingImage} className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all disabled:opacity-50">
                                                {isGeneratingImage ? '⏳ Generating gambar...' : '🎨 Generate Gambar Utama'}
                                            </button>
                                            {generatedImageUrl && (
                                                <div className="mt-3">
                                                    <p className="text-[10px] font-bold text-emerald-500 mb-2">✅ Gambar berhasil di-generate!</p>
                                                    <img src={generatedImageUrl} alt={`Gambar untuk ${genKeyword || data.primary_keyword || 'artikel'}`}
                                                        className="rounded-xl shadow-lg w-full"
                                                        onError={(e) => { e.target.src = `https://picsum.photos/seed/${Date.now()}/800/450`; }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {/* UPLOAD MANUAL */}
                                        <div className="relative group p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl hover:border-indigo-500/50 transition-all text-center">
                                            {isEditing && post.featured_image && !data.featured_image && <img src={`/storage/${post.featured_image}`} alt="Gambar saat ini" className="h-32 mx-auto rounded-2xl mb-4 shadow-lg" />}
                                            <input id="featured_image" type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setData('featured_image', e.target.files[0])} />
                                            <div className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                                                <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="text-xs font-black uppercase tracking-widest">{data.featured_image ? data.featured_image.name : 'Atau Unggah Manual'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <InputLabel value="Metadata SEO" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" />
                                        <div>
                                            <div className="flex items-center justify-between mb-1"><span className="text-[10px] font-bold text-gray-400">Judul SEO</span><span className={`text-[10px] font-bold ${data.meta_title.length >= getRule('seo_title_min_length', 55) && data.meta_title.length <= getRule('seo_title_max_length', 65) ? 'text-emerald-500' : 'text-gray-400'}`}>{data.meta_title.length}/{getRule('seo_title_min_length', 55)}-{getRule('seo_title_max_length', 65)}</span></div>
                                            <TextInput className="w-full text-xs font-bold" value={data.meta_title} onChange={(e) => setData('meta_title', e.target.value)} placeholder="Judul untuk mesin pencari..." />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1"><span className="text-[10px] font-bold text-gray-400">Deskripsi Meta</span><span className={`text-[10px] font-bold ${data.meta_description.length >= getRule('meta_desc_min_length', 140) && data.meta_description.length <= getRule('meta_desc_max_length', 160) ? 'text-emerald-500' : 'text-gray-400'}`}>{data.meta_description.length}/{getRule('meta_desc_min_length', 140)}-{getRule('meta_desc_max_length', 160)}</span></div>
                                            <textarea className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 text-xs font-medium min-h-[100px]" value={data.meta_description} onChange={(e) => setData('meta_description', e.target.value)} placeholder="Deskripsi halaman untuk mesin pencari..." />
                                        </div>
                                    </div>
                                </div>

                                {/* JADWAL */}
                                <div className="pt-6 border-t border-gray-100 dark:border-gray-700/50">
                                    <InputLabel value="Pengaturan Publikasi" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative"><input type="checkbox" className="sr-only peer" checked={data.is_published} onChange={(e) => { setData('is_published', e.target.checked); if (e.target.checked) setData('scheduled_at', ''); }} />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </div>
                                            <span className="text-sm font-black text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-tight">Publikasikan Sekarang</span>
                                        </label>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2"><span className="text-lg">📅</span><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jadwalkan Publikasi</span></div>
                                            <input type="datetime-local" className={`w-full bg-gray-50 dark:bg-gray-900 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 ${data.scheduled_at ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'}`}
                                                value={data.scheduled_at} onChange={(e) => { setData('scheduled_at', e.target.value); if (e.target.value) setData('is_published', false); }} disabled={data.is_published} min={new Date().toISOString().slice(0, 16)} />
                                            {data.scheduled_at && !data.is_published && <p className="text-[10px] text-indigo-500 font-bold mt-2">📅 Akan dipublikasikan pada {new Date(data.scheduled_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} pukul {new Date(data.scheduled_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end pt-6 border-t border-gray-100 dark:border-gray-700/50">
                                    <PrimaryButton className="px-10 py-4 !rounded-2xl shadow-xl shadow-indigo-500/20" disabled={processing}>
                                        {data.is_published ? (isEditing ? 'Simpan & Publikasikan' : 'Publikasikan Sekarang') : data.scheduled_at ? 'Jadwalkan Publikasi' : (isEditing ? 'Simpan Perubahan' : 'Simpan Draf')}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-4 space-y-6 sticky top-24">
                        {/* KATA TERLARANG - INLINE TAG EDITOR */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🚫</span>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Kata Terlarang</h4>
                                    <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600">({localForbiddenWords.length})</span>
                                </div>
                                <button type="button" onClick={() => setEditingForbidden(!editingForbidden)}
                                    className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg transition-all ${editingForbidden ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'}`}>
                                    {editingForbidden ? '✕ Tutup' : '✏️ Edit'}
                                </button>
                            </div>

                            {/* TAG INPUT - EDIT MODE */}
                            {editingForbidden && (
                                <div className="mb-3 space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium px-3 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 dark:text-gray-300"
                                            value={newForbiddenWord}
                                            onChange={(e) => setNewForbiddenWord(e.target.value)}
                                            onKeyDown={handleForbiddenKeyDown}
                                            placeholder="Ketik kata lalu tekan Enter..."
                                        />
                                        <button type="button" onClick={addForbiddenWord}
                                            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase rounded-xl transition-all shadow-sm">
                                            + Tambah
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-gray-400 dark:text-gray-500">Tekan Enter atau klik Tambah. Klik ✕ pada kata untuk menghapus.</p>

                                    {/* SAVE BUTTON */}
                                    <button type="button" onClick={saveForbiddenWords} disabled={savingForbidden}
                                        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20">
                                        {savingForbidden ? '⏳ Menyimpan...' : forbiddenSaved ? '✅ Tersimpan!' : '💾 Simpan Perubahan'}
                                    </button>
                                </div>
                            )}

                            {/* TAGS DISPLAY */}
                            <div className="flex flex-wrap gap-1.5">
                                {localForbiddenWords.map((w, i) => (
                                    <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${foundForbidden.includes(w)
                                        ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 ring-1 ring-red-300 dark:ring-red-700'
                                        : 'bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {w}
                                        {editingForbidden && (
                                            <button type="button" onClick={() => removeForbiddenWord(w)}
                                                className="ml-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-200 dark:hover:bg-red-800 text-red-500 transition-all text-[10px] font-black">
                                                ✕
                                            </button>
                                        )}
                                    </span>
                                ))}
                            </div>

                            {/* STATUS */}
                            {localForbiddenWords.length === 0 && (
                                <p className="text-[10px] text-gray-400 mt-2 italic">Belum ada kata terlarang. Klik Edit untuk menambahkan.</p>
                            )}
                            {foundForbidden.length > 0 && (
                                <p className="text-[10px] text-red-500 font-bold mt-2">⚠️ {foundForbidden.length} kata terlarang terdeteksi di konten!</p>
                            )}
                            {foundForbidden.length === 0 && localForbiddenWords.length > 0 && (
                                <p className="text-[10px] text-emerald-500 font-bold mt-2">✅ Konten bersih dari kata terlarang</p>
                            )}
                        </div>

                        {/* SEO SCORE */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8"><h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Skor SEO</h3>
                                {isAnalyzing && <div className="flex gap-1"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></span><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span></div>}
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-end justify-between px-2"><span className={`text-6xl font-black ${seoScore >= 80 ? 'text-emerald-500' : seoScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{seoScore}</span><span className="text-sm font-bold text-gray-400 mb-2">/ 100</span></div>
                                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden"><div className={`h-full transition-all duration-1000 ${getScoreColor(seoScore).split(' ')[1]}`} style={{ width: `${seoScore}%` }}></div></div>
                            </div>
                            <hr className="my-8 border-gray-100 dark:border-gray-700/50" />
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Pemeriksaan Realtime</h4>
                                <div className="space-y-4">
                                    {seoAnalysis ? Object.entries(seoAnalysis).map(([key, checks]) => (
                                        <div key={key} className="space-y-3">
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{({ title: 'Judul', meta: 'Meta', content: 'Konten', structure: 'Struktur', links: 'Tautan', media: 'Media' })[key] || key}</p>
                                            <ul className="space-y-3">{Array.isArray(checks) && checks.map((c, i) => (
                                                <li key={i} className="flex gap-3 group"><div className="shrink-0 mt-0.5">
                                                    {c.status === 'success' ? <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center"><svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg></div>
                                                        : c.status === 'warning' ? <div className="w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center"><span className="text-[10px] font-black">!</span></div>
                                                            : <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center"><span className="text-[10px] font-black">i</span></div>}
                                                </div><div className="min-w-0"><p className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">{c.name}</p><p className="text-[10px] text-gray-400 leading-tight mt-0.5 line-clamp-2">{c.message}</p></div></li>
                                            ))}</ul></div>
                                    )) : (
                                        <div className="py-10 text-center space-y-4 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-3xl">
                                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed">Analisis otomatis berjalan saat Anda menulis...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-10 p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                                <h5 className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Tips SEO</h5>
                                <p className="text-xs font-bold leading-relaxed mb-4">Pastikan keyword utama muncul di {getRule('intro_keyword_within_words', 50)} kata pertama artikel!</p>
                                <Link href="/admin/seo-settings" className="text-[9px] font-black uppercase bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all tracking-widest">Lihat Pengaturan SEO →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
        </AuthenticatedLayout >
    );
}
