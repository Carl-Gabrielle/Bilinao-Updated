import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'focus:outline-none focus:ring-1 focus:shadow-outline  hover:border-gray-900 py-3 px-4 w-full rounded-full border-gray-500 bg-transparent ' +
                className
            }
            ref={input}
        />
    );
});
