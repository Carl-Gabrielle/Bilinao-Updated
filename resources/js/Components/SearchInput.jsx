import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <>
            <input
                {...props}
                type={type}
                className={
                    "focus:outline-none focus:ring-0 border  focus:border-slate-800 focus:border-2 hover:border-gray-900 ml-5    py-2 px-4 my-3 sm:w-60  w-36 md:w-32 lg:w-72 rounded-3xl  text-slate-800 border-slate-800 bg-transparent " +
                    className
                }
                ref={input}
            />
        </>
    );
});
