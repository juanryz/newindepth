import React, { useEffect, useState } from 'react';

/**
 * PageLoader — shown on first visit while the page assets load.
 * Fades out once window 'load' fires (all resources done) or after 3s max.
 */
export default function PageLoader() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Simulate smooth progress bar up to ~90% while loading
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 18 + 4;
            if (current >= 90) {
                current = 90;
                clearInterval(interval);
            }
            setProgress(Math.min(current, 90));
        }, 120);

        const finish = () => {
            clearInterval(interval);
            setProgress(100);
            // Slight delay so user sees 100% before fade
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => setVisible(false), 500);
            }, 300);
        };

        // Trigger when all resources (images, fonts, scripts) are done
        if (document.readyState === 'complete') {
            finish();
        } else {
            window.addEventListener('load', finish, { once: true });
        }

        // Safety fallback: never show longer than 4 seconds
        const safety = setTimeout(finish, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(safety);
            window.removeEventListener('load', finish);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1206 50%, #0d0d0d 100%)',
                opacity: fadeOut ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            {/* Ambient glow blobs */}
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(208,170,33,0.12) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Logo mark */}
            <div className="relative flex flex-col items-center gap-6">

                {/* Animated ring */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg
                        viewBox="0 0 80 80"
                        className="absolute inset-0 w-full h-full"
                        style={{ animation: 'spin 2s linear infinite' }}
                    >
                        <circle
                            cx="40" cy="40" r="36"
                            fill="none"
                            stroke="rgba(208,170,33,0.15)"
                            strokeWidth="2"
                        />
                        <circle
                            cx="40" cy="40" r="36"
                            fill="none"
                            stroke="url(#goldGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="60 170"
                            style={{ animation: 'dash-spin 1.8s ease-in-out infinite' }}
                        />
                        <defs>
                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#d4aa21" />
                                <stop offset="100%" stopColor="#f5d96b" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center icon — brain/mind symbol */}
                    <svg
                        className="w-9 h-9 relative z-10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="url(#iconGold)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <defs>
                            <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#d4aa21" />
                                <stop offset="100%" stopColor="#f5d96b" />
                            </linearGradient>
                        </defs>
                        <path d="M12 2C9.243 2 7 4.243 7 7v1H6a3 3 0 000 6v1a5 5 0 0010 0v-1a3 3 0 000-6h-1V7c0-2.757-2.243-5-5-5z" />
                        <path d="M12 8v4M10 12h4" />
                    </svg>
                </div>

                {/* Brand name */}
                <div className="text-center">
                    <p
                        className="text-3xl font-black tracking-[0.25em] uppercase"
                        style={{
                            background: 'linear-gradient(90deg, #b8860b, #d4aa21, #f5d96b, #d4aa21, #b8860b)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmer 2.5s linear infinite',
                        }}
                    >
                        InDepth
                    </p>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-yellow-600/60 font-medium mt-1">
                        Mental Wellness
                    </p>
                </div>

                {/* Progress bar */}
                <div className="w-48 flex flex-col items-center gap-2 mt-2">
                    <div
                        className="w-full h-[2px] rounded-full overflow-hidden"
                        style={{ background: 'rgba(208,170,33,0.15)' }}
                    >
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #b8860b, #f5d96b)',
                                transition: 'width 0.2s ease-out',
                                boxShadow: '0 0 8px rgba(208,170,33,0.6)',
                            }}
                        />
                    </div>
                    <p
                        className="text-[9px] tracking-[0.3em] uppercase font-bold tabular-nums"
                        style={{ color: 'rgba(208,170,33,0.45)' }}
                    >
                        {Math.round(progress)}%
                    </p>
                </div>
            </div>

            {/* Tagline */}
            <p
                className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{ color: 'rgba(208,170,33,0.25)' }}
            >
                Sesi Privat · Profesional · Berdampak
            </p>

            {/* Keyframe styles */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes dash-spin {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -230; }
                }
                @keyframes shimmer {
                    0%   { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
        </div>
    );
}
