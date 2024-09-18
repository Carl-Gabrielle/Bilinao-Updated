export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex items-center justify-center  bg-gray-800 text-white w-full font-semibold py-3 px-4 rounded-full transition duration-200' ${disabled} ` +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
