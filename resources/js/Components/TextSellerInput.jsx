import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                ' w-full px-4 py-3 border hover:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-500 bg-transparent' +
                className
            }
            ref={input}
        />
    );
});
