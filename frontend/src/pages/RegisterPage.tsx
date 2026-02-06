import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@store/store.ts';
import {
    setErrors,
    registerUser,
    clearError,
    RegisterCredentials,
} from '@store/auth/authSlice.ts';
import {useTranslation} from "react-i18next";
import Header from "@modules/Header.tsx";

interface FromData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const {isAuthenticated, errors} = useAppSelector((state) => {
        return state.auth
    });

    const [formData, setFormData] = useState<FromData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    // Очистка ошибок при размонтировании
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Перенаправление после успешной регистрации
    useEffect(() => {
        if (isAuthenticated) {
            // Можно показать уведомление
            setTimeout(() => {
                navigate('/'); // или '/dashboard'
            }, 1000);
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'register.errors.emailRequired';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'register.errors.emailInvalid';
        }

        if (!formData.password) {
            newErrors.password = 'register.errors.passwordRequired';
        } else if (formData.password.length < 8) {
            newErrors.password = 'register.errors.passwordTooShort';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'register.errors.confirmPasswordRequired';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'register.errors.passwordsDoNotMatch';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'register.errors.termsRequired';
        }

        dispatch(setErrors(newErrors));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Очистка предыдущих ошибок
        dispatch(clearError());

        if (validateForm()) {
            const r: RegisterCredentials = {
                email: formData.email,
                password: formData.password,
                name: formData.name,
            }
            try {
                await dispatch(registerUser(r)).unwrap();

                // Успешная регистрация - редирект произойдет через useEffect
            } catch (error) {
                // Ошибка уже в store
                console.error('Registration failed:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Очистка ошибки для конкретного поля
        if (errors[name]) {
            let newErrors = {...errors}
            delete newErrors[name];
            dispatch(setErrors(newErrors))
        }
    };

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
                {/* Кнопка назад */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    <span className="font-medium">{t('common.back')}</span>
                </button>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('register.title')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t('register.subtitle')}{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            {t('register.signInLink')}
                        </button>
                    </p>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Имя и Фамилия */}
                            <div className="">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        {t('register.name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${
                                            errors.name ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                    {errors.userName && (
                                        <p className="mt-1 text-sm text-red-600">{t(errors.name)}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('register.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{t(errors.email)}</p>
                                )}
                            </div>

                            {/* Пароль */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t('register.password')}
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`block w-full border ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{t(errors.password)}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">{t('register.passwordHint')}</p>
                            </div>

                            {/* Подтверждение пароля */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    {t('register.confirmPassword')}
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`block w-full border ${
                                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{t(errors.confirmPassword)}</p>
                                )}
                            </div>

                            {/* Согласие с условиями */}
                            <div>
                                <div className="flex items-start">
                                    <input
                                        id="agreeToTerms"
                                        name="agreeToTerms"
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className={`h - 4 w-4 mt-0.5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                                            errors.agreeToTerms ? 'border-red-500' : ''
                                        }`}
                                    />
                                    <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                                        {t('register.agreeToTerms')}{' '}
                                        <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                                            {t('register.termsOfService')}
                                        </a>{' '}
                                        {t('register.and')}{' '}
                                        <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                                            {t('register.privacyPolicy')}
                                        </a>
                                    </label>
                                </div>
                                {errors.agreeToTerms && (
                                    <p className="mt-1 text-sm text-red-600">{t(errors.agreeToTerms)}</p>
                                )}
                            </div>

                            {/* Кнопка регистрации */}
                            <button
                                type="submit"
                                className="text-primary-color w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                {t('register.signUp')}
                            </button>
                        </form>

                        {/* Разделитель */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        {t('register.orContinueWith')}
                                    </span>
                                </div>
                            </div>

                            {/* Социальные кнопки */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="ml-2">GitHub</span>
                                </button>

                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                                    </svg>
                                    <span className="ml-2">Twitter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;