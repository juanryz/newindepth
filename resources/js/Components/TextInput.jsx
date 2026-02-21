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
                'border border-white/40 rounded-[1rem] bg-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.03)] backdrop-blur-xl focus:border-gold-500/50 focus:ring-8 focus:ring-gold-500/5 focus:bg-white/90 dark:border-white/5 dark:bg-black/40 dark:text-white dark:focus:border-gold-400/50 dark:focus:ring-gold-400/5 dark:focus:bg-black/60 transition-all duration-700 cubic-bezier(0.23,1,0.32,1) px-5 py-4 ' +
                className
            }
            ref={localRef}
        />
    );
});
