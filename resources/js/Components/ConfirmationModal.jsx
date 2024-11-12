import React from "react";
import { Transition } from "@headlessui/react"; // Import for transitions

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Transition show={isOpen}>
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <Transition.Child
                    enter="transform transition ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="transform transition ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-4"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 mx-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Action</h2>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={onClose}
                                className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded transition duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded transition duration-150"
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
