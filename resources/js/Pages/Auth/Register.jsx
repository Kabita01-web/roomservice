// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Register" />

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="name" value="Name" />

//                     <TextInput
//                         id="name"
//                         name="name"
//                         value={data.name}
//                         className="mt-1 block w-full"
//                         autoComplete="name"
//                         isFocused={true}
//                         onChange={(e) => setData('name', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.name} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         onChange={(e) => setData('email', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                         required
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel
//                         htmlFor="password_confirmation"
//                         value="Confirm Password"
//                     />

//                     <TextInput
//                         id="password_confirmation"
//                         type="password"
//                         name="password_confirmation"
//                         value={data.password_confirmation}
//                         className="mt-1 block w-full"
//                         autoComplete="new-password"
//                         onChange={(e) =>
//                             setData('password_confirmation', e.target.value)
//                         }
//                         required
//                     />

//                     <InputError
//                         message={errors.password_confirmation}
//                         className="mt-2"
//                     />
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     <Link
//                         href={route('login')}
//                         className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Already registered?
//                     </Link>

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Register
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }





import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        agreeToTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const handleGoogleSignUp = () => {
        console.log("Google sign-up clicked");
        alert("Google sign-up integration would go here!");
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 ">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full m-4 p-10 overflow-y-auto h-[650px]">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create account
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Sign up to get started
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <InputLabel 
                                    htmlFor="name" 
                                    value="Full Name" 
                                    className="block text-gray-700 text-sm font-medium mb-2"
                                />

                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className={`bg-white w-full pl-11 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                                            errors.name
                                                ? "border-red-300 focus:ring-red-200"
                                                : "border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                                        }`}
                                        required
                                        autoComplete="name"
                                        autoFocus
                                    />
                                </div>
                                {errors.name && (
                                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel 
                                    htmlFor="email" 
                                    value="Email" 
                                    className="block text-gray-700 text-sm font-medium mb-2"
                                />

                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Enter your email"
                                        className={`bg-white w-full pl-11 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                                            errors.email
                                                ? "border-red-300 focus:ring-red-200"
                                                : "border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                                        }`}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && (
                                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel 
                                    htmlFor="password" 
                                    value="Password" 
                                    className="block text-gray-700 text-sm font-medium mb-2"
                                />

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Create a password"
                                        className={`bg-white w-full pl-11 pr-11 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                                            errors.password
                                                ? "border-red-300 focus:ring-red-200"
                                                : "border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                                        }`}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password}</span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel 
                                    htmlFor="password_confirmation" 
                                    value="Confirm Password" 
                                    className="block text-gray-700 text-sm font-medium mb-2"
                                />

                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <TextInput
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm your password"
                                        className={`bg-white w-full pl-11 pr-11 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                                            errors.password_confirmation
                                                ? "border-red-300 focus:ring-red-200"
                                                : "border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                                        }`}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password_confirmation}</span>
                                    </div>
                                )}
                            </div>

                            {/* Terms and Conditions */}
                            <div>
                                <label className="flex items-start gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        id="agreeToTerms"
                                        checked={data.agreeToTerms}
                                        onChange={(e) => setData('agreeToTerms', e.target.checked)}
                                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">
                                        I agree to the{" "}
                                        <a href="/Terms" className="text-gray-900 font-semibold hover:text-gray-700 transition-colors">
                                            Terms and Conditions
                                        </a>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.agreeToTerms}</span>
                                    </div>
                                )}
                            </div>

                            {/* Sign Up Button */}
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full text-white font-semibold py-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    "Create account"
                                )}
                            </PrimaryButton>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="text-gray-500 text-sm">or</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            {/* Google Sign Up */}
                            <button
                                type="button"
                                onClick={handleGoogleSignUp}
                                className="w-full bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium py-3 flex items-center justify-center gap-3 transition-all duration-200 text-gray-700"
                            >
                                <img
                                    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                                    alt="Google Logo"
                                    className="w-5 h-5"
                                />
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-sm text-center text-gray-600 mt-8">
                        Already have an account?{" "}
                        <Link
                            href={route('login')}
                            className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}