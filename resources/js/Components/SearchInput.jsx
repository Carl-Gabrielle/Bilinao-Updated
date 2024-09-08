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
                'focus:outline-none focus:ring-0 border  focus:border-lime-600 focus:border-2 hover:border-gray-900   py-3 px-4 my-3 w-60 rounded-full  border-gray-500 bg-transparent ' +
                className
            }
            ref={input}
        />
    );
});
