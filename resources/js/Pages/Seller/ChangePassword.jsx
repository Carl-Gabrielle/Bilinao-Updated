import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import SellerInput from '@/Components/SellerInput';
import Logo from '../Illustrations/LOGO.png'
const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (password !== passwordConfirmation) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password_confirmation: 'Passwords do not match.',
            }));
            return;
        }

        if (password.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters.',
            }));
            return;
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password must contain at least one special character.',
            }));
            return;
        }

        Inertia.post(
            route('seller.change_password.submit'),
            {
                password,
                password_confirmation: passwordConfirmation,
            },
            {
                onError: (error) => setErrors(error),
                onSuccess: (page) => {
                    if (page.props.flash.status) {
                        setStatus(page.props.flash.status);
                    }
                },
            }
        );
    };
    return (
        <>
            <Head title="Change Password" />
            <div className='flex flex-col items-center justify-center min-h-screen bg-slate-300 relative'>
                <img
                    src={Logo}
                    alt="Bili-Nao Logo"
                    className='h-10 w-auto absolute top-5 sm:top-8'
                />
                <div className='w-full max-w-lg mx-auto px-4 mt-16 sm:mt-20'>
                    <div className="bg-slate-200 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Change Your Password</h2>
                        <p className="text-center text-gray-600 mb-6 text-sm">
                            For enhanced security, we recommend updating your password within the Bili-Nao Seller Center.
                        </p>
                        {status && <p className="text-green-500 text-sm mb-4">{status}</p>}
                        {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <SellerInput
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    name="password"
                                    required
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">{errors.password}</span>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <SellerInput
                                    type="password"
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    name="password_confirmation"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <span className="text-red-500 text-sm">{errors.password_confirmation}</span>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-slate-800 text-white py-3 rounded-full transition duration-300 flex items-center justify-center font-bold"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ChangePassword;
