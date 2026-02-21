import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';

const SUGGESTIONS = [
    "Apa itu InDepth Trance State?",
    "Layanan apa saja yang tersedia?",
    "Di mana lokasi kliniknya?",
    "Berapa biaya sesinya?"
];

export default function AiChatPopup({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Halo! Saya asisten virtual InDepth. Ada yang bisa saya bantu seputar layanan kami?' }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    if (!isOpen || !mounted) return null;

    const handleSend = async (textToSend) => {
        const messageText = typeof textToSend === 'string' ? textToSend : input;
        if (!messageText || !messageText.trim() || isThinking) return;

        const userMsg = { role: 'user', content: messageText.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            // Use route helper only if available, otherwise fallback to direct path
            const apiUrl = typeof window.route === 'function' ? window.route('ai-chat') : '/api/ai-chat';

            const response = await axios.post(apiUrl, {
                history: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
            });

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.reply,
                redirect_whatsapp: response.data.redirect_whatsapp
            }]);
        } catch (error) {
            console.error("AI Chat Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Mohon maaf, terjadi gangguan koneksi. Silakan hubungi kami di WhatsApp.',
                redirect_whatsapp: true
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSend();
    };

    const chatContent = (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 999999,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.5s ease',
                transformOrigin: 'bottom right',
                pointerEvents: 'none'
            }}
        >
            <div
                style={{ pointerEvents: 'auto' }}
                className={`
                    bg-white dark:bg-gray-900 
                    rounded-[2.5rem] border border-gray-200 dark:border-gray-800 
                    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] 
                    flex flex-col overflow-hidden transition-all duration-500
                    ${isMinimized ? 'w-20 h-20 rounded-full cursor-pointer' : 'w-[22rem] sm:w-96 h-[32rem]'}
                `}
            >

                {/* Header */}
                <div
                    onClick={() => isMinimized && setIsMinimized(false)}
                    className={`p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 ${isMinimized ? 'h-full justify-center p-0' : 'bg-white dark:bg-gray-900'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-lg ${isMinimized ? 'w-12 h-12' : 'w-10 h-10'}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        </div>
                        {!isMinimized && (
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">InDepth Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Online</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {!isMinimized && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-500"
                                type="button"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" /></svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose(); }}
                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-xl transition-colors text-gray-500"
                                type="button"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Messages */}
                {!isMinimized && (
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 dark:bg-gray-950/30"
                    >
                        {messages && messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                                    max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed
                                    ${msg.role === 'user'
                                        ? 'bg-gold-500 text-white rounded-tr-none shadow-md'
                                        : 'bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm'
                                    }
                                `}>
                                    {msg.content}

                                    {msg.redirect_whatsapp && (
                                        <div className="mt-4">
                                            <a
                                                href="https://wa.me/6282220800034"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.012l-.02.041L6.41 18.275l3.414-.895.14.073c.613.321 1.341.488 2.067.489 3.18 0 5.766-2.586 5.767-5.766.001-3.18-2.585-5.766-5.767-5.766zm3.375 8.203c-.147.412-.733.845-1.022.933-.29.088-.569.132-1.22-.126-.731-.29-1.896-.734-2.603-1.442-.622-.621-1.042-1.341-1.233-1.666-.191-.325-.015-.503.146-.664.148-.148.326-.379.488-.569.163-.19.214-.325.326-.541.111-.217.056-.406-.028-.569-.084-.162-.733-1.748-.999-2.399-.26-.635-.526-.548-.733-.559-.204-.01-.43-.012-.66-.012-.224 0-.589.083-.895.421-.304.338-1.164 1.139-1.164 2.774 0 1.635 1.189 3.214 1.353 3.441.165.226 2.339 3.573 5.666 5.013.792.341 1.411.545 1.894.70.795.253 1.517.217 2.09.131.637-.095 1.964-.803 2.24-1.579.278-.775.278-1.441.196-1.577-.083-.136-.304-.217-.638-.38z" /></svg>
                                                Chat WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Input Area */}
                {!isMinimized && (
                    <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        {/* Suggestions */}
                        {messages && messages.length === 1 && !isThinking && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {SUGGESTIONS.map((s, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSend(s)}
                                        className="text-[11px] font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gold-50 dark:hover:bg-gold-900/20 hover:text-gold-600 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 transition-all active:scale-95"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tulis pertanyaan..."
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-gold-500/50 dark:text-gray-200"
                                disabled={isThinking}
                            />
                            <button
                                type="submit"
                                disabled={isThinking || !input.trim()}
                                className="absolute right-2 top-1.5 p-1.5 bg-gold-500 text-white rounded-xl hover:bg-gold-600 disabled:opacity-50 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </button>
                        </form>
                        <p className="text-[10px] text-gray-400 text-center mt-3 uppercase font-bold tracking-tighter">AI Assistant powered by InDepth</p>
                    </div>
                )}

            </div>
        </div>
    );

    return createPortal(chatContent, document.body);
}
