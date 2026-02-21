import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function AiChatPopup({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Halo! Saya asisten virtual InDepth. Ada yang bisa saya bantu seputar layanan kami?' }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    if (!isOpen) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            const response = await axios.post(route('ai-chat'), {
                history: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
            });

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: response.data.reply,
                redirect_whatsapp: response.data.redirect_whatsapp
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Mohon maaf, terjadi gangguan koneksi. Silakan hubungi kami di WhatsApp.',
                redirect_whatsapp: true
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 transform ${isMinimized ? 'translate-y-[calc(100%-60px)]' : 'translate-y-0'}`}>
            <div className={`
                bg-white/80 dark:bg-gray-900/90 backdrop-blur-2xl 
                rounded-[2.5rem] border border-white/60 dark:border-gray-800/50 
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] 
                flex flex-col overflow-hidden transition-all duration-500
                ${isMinimized ? 'w-16 h-16 rounded-full' : 'w-[22rem] sm:w-96 h-[32rem]'}
            `}>

                {/* Header */}
                <div className="p-5 flex items-center justify-between bg-white/20 dark:bg-white/5 border-b border-white/20 dark:border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-lg">
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
                                onClick={() => setIsMinimized(true)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500"
                                title="Minimize"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" /></svg>
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-xl transition-colors text-gray-500"
                                title="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )}

                    {isMinimized && (
                        <button
                            onClick={() => setIsMinimized(false)}
                            className="absolute inset-0 z-10"
                        />
                    )}
                </div>

                {/* Messages */}
                {!isMinimized && (
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide"
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                                    max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed
                                    ${msg.role === 'user'
                                        ? 'bg-gold-500 text-white rounded-tr-none shadow-md'
                                        : 'bg-white/50 dark:bg-gray-800/50 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 rounded-tl-none shadow-sm'
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
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                Chat WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex justify-start">
                                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-3xl rounded-tl-none border border-white/50 dark:border-gray-700/50 shadow-sm">
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
                    <div className="p-5 border-t border-white/20 dark:border-white/5 bg-white/20 dark:bg-white/5">
                        <form onSubmit={handleSend} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tulis pertanyaan..."
                                className="w-full bg-white dark:bg-gray-800 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-gold-500/50 dark:text-gray-200 shadow-sm"
                                disabled={isThinking}
                            />
                            <button
                                type="submit"
                                disabled={isThinking || !input.trim()}
                                className="absolute right-2 top-1.5 p-1.5 bg-gold-500 text-white rounded-xl hover:bg-gold-600 disabled:opacity-50 disabled:hover:bg-gold-500 transition-colors"
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
}
