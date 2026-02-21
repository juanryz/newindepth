export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-[1.25rem] bg-red-600 px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-[0_8px_20px_-6px_rgba(220,38,38,0.4)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_12px_24px_-8px_rgba(220,38,38,0.5)] hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/20 disabled:opacity-50 disabled:pointer-events-none ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
