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
                `inline-flex items-center justify-center rounded-2xl border border-gold-300/60 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-gray-900 shadow-[0_8px_25px_rgba(208,170,33,0.45)] transition-all duration-300 ease-in-out hover:from-gold-300 hover:via-gold-400 hover:to-gold-500 hover:shadow-[0_14px_35px_rgba(208,170,33,0.6)] hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 dark:text-gray-950 dark:focus:ring-offset-gray-950 ${disabled && 'opacity-50 pointer-events-none'} ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
