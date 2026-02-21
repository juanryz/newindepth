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
                'border border-gray-300/50 rounded-xl bg-white/40 shadow-sm backdrop-blur-md focus:border-gold-500/80 focus:ring-4 focus:ring-gold-500/10 focus:bg-white/90 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-gold-400/80 dark:focus:ring-gold-400/10 dark:focus:bg-black/40 transition-all duration-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
