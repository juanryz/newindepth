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
                'rounded-xl border-white/50 bg-white/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] backdrop-blur-md focus:border-gold-500 focus:ring-gold-500 focus:bg-white/80 dark:border-gray-700/50 dark:bg-gray-900/50 dark:text-gray-300 dark:focus:border-gold-500 dark:focus:ring-gold-500 dark:focus:bg-gray-900/80 transition-all duration-300 ' +
                className
            }
            ref={localRef}
        />
    );
});
