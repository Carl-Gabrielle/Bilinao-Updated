import React, { useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, title = "Confirm Action" }) => {
    const modalRef = useRef();

    // Close on outside click
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Transition show={isOpen}>
            <div
                className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                role="dialog"
            >
                <Transition.Child
                    enter="transform transition ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transform transition ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 mx-4"
                    >
                        <h2 id="modal-title" className="text-lg font-semibold mb-4 text-gray-800">
                            {title}
                        </h2>
                        <p id="modal-description" className="text-gray-600 mb-4">
                            {message}
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={onClose}
                                className=" text-primary px-4 py-0.5 rounded-2xl transition duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="bg-blue-200 text-blue-600 px-4 py-0.5 rounded-2xl transition duration-150"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    );
};

export default ConfirmationModal;
