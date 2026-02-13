import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import Header from "@modules/Header.tsx";
import React, {useEffect, useState} from "react";
import {clearError, RegisterCredentials, loginUser, setErrors} from "@store/auth/authSlice.ts";
import {useAppDispatch, useAppSelector} from "@store/store.ts";


interface FromData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<FromData>({
        email: '',
        password: '',
    });
    const {isAuthenticated, errors} = useAppSelector((state) => {
        return state.auth
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Очистка предыдущих ошибок
        dispatch(clearError());

        const r: RegisterCredentials = {
            email: formData.email,
            password: formData.password,
        }
        try {
            await dispatch(loginUser(r));

            // Успешная регистрация - редирект произойдет через useEffect
        } catch (error) {
            // Ошибка уже в store
            console.error('Registration failed:', error);
        }
    };

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
                navigate(-1);
            }, 1000);
        }
    }, [isAuthenticated, navigate]);

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
                {/* Кнопка назад в углу */}
                <button
                    onClick={() => navigate('/')}
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
                        {t('login.title')}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    {t('login.email')}
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

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t('login.password')}
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
                            </div>

                            <button
                                type="submit"
                                className="text-primary-color w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t('login.signIn')}
                            </button>
                        </form>

                        {/* Ссылка на регистрацию */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                         {t('login.noAccount')}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    {t('login.createAccount')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
