export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-[11px] font-black uppercase tracking-[0.15em] text-gray-950 dark:text-white opacity-80 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
