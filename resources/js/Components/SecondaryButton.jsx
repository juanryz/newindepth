export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-[1.25rem] border border-gray-200 bg-white px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-gray-700 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800 disabled:opacity-50 disabled:pointer-events-none ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
