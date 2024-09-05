import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm,Link} from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='w-full  max-w-lg mx-auto px-4 '>
        <div className="bg-white p-8 rounded-2xl shadow-lg ">
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                            <div className="flex flex-col items-center space-y-4 mt-6">
                <div className="w-full flex justify-end">
                    <PrimaryButton disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
                <div className="w-full flex justify-center text-md font-semibold text-slate-800">
                    <Link href="/login" >
                        Back to Login
                    </Link>
                </div>
            </div>
            </form>
            </div>
            </div>
            </div>
            </>
    );
}
