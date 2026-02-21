export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br from-gold-400 to-gold-600 px-8 py-3 text-sm font-bold uppercase tracking-widest text-gray-900 shadow-[0_8px_20px_rgba(208,170,33,0.3)] backdrop-blur-md transition-all duration-300 ease-in-out hover:from-gold-500 hover:to-gold-700 hover:shadow-[0_12px_30px_rgba(208,170,33,0.4)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none dark:from-gold-500 dark:to-gold-700 dark:text-gray-950 dark:focus:ring-offset-gray-950 ${disabled && 'opacity-50'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
