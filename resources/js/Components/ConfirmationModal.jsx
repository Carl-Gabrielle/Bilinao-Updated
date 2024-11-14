import React from "react";
import { Transition } from "@headlessui/react";
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
                                className="border border-primary  text-primary  px-4 py-0.5 rounded-2xl transition duration-150"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="bg-red-200  text-red-600 px-4 py-0.5 rounded-2xl transition duration-150"
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
