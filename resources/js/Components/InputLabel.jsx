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
                `block text-sm font-bold text-gray-900 dark:text-white ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
