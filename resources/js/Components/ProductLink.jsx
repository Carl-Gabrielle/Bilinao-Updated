import { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";

const ProductLink = ({ productId, success }) => {
    const [copySuccess, setCopySuccess] = useState(success || null);

    const handleCopyLink = () => {
        const productLink = `http://127.0.0.1:8000/product/${productId}`;

        navigator.clipboard
            .writeText(productLink)
            .then(() => {
                setCopySuccess("Link copied to clipboard successfully!");
            })
            .catch((err) => {
                console.error("Failed to copy link: ", err);
            });
    };
    // hide success modal after 5seconds
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        if (copySuccess) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [copySuccess]);

    return (
        <div>
            {/* Link Icon */}
            <div
                className="border border-slate-500 p-2 rounded-full shadow-md cursor-pointer"
                onClick={handleCopyLink}
            >
                <FaLink />
            </div>
            {/* Display success message */}
            {isVisible && copySuccess && (
                <div id="toast" className="fixed bottom-0  z-50 w-full">
                    <div className="bg-slate-700 bg-opacity-60 backdrop-blur-lg px-6 py-5  shadow-inner flex flex-col gap-3 sm:flex-row items-center justify-between space-x-3 rounded-l-3xl">
                        <div className="flex items-center justify-center space-x-4 bg-slate-100  bg-opacity-80 backdrop-blur-lg  py-2 px-4 rounded-md">
                            <div className="sm:size-6  size-4 bg-green-500 flex items-center justify-center rounded-full">
                                <IoCheckmarkSharp className="text-slate-100  " />
                            </div>
                            <span className="sm:text-sm text-xs font-medium">
                                {copySuccess}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductLink;
