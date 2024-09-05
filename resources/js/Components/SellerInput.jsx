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
                'focus:outline-none focus:ring-0 border  focus:border-lime-600 focus:border hover:border-gray-900   py-3 px-4 w-full rounded-md  border-gray-500 bg-transparent ' +
                className
            }
            ref={input}
        />
    );
});
