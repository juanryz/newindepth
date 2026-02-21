import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'border border-gray-300/80 rounded-xl bg-white/80 shadow-sm focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 focus:bg-white dark:border-gray-600/80 dark:bg-gray-800/80 dark:text-gray-100 dark:focus:border-gold-400 dark:focus:ring-gold-400/30 dark:focus:bg-gray-800 transition-all duration-200 ' +
                className
            }
            ref={localRef}
        />
    );
});
