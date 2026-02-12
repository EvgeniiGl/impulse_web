import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import Footer from "@modules/Footer.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {
    createCollection,
    clearError,
    clearSuccess,
    AccessType
} from "@store/card/cardSlice.ts";

export default function CreateCollectionPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        name: '',
        access_type: 'private' as AccessType,
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const {
        isCreating,
        error,
        success,
    } = useAppSelector((state) => state.card);
    const {isAuthenticated, user} = useAppSelector((state) => state.auth);

    // Проверка авторизации
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Обработка успешного создания
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(clearSuccess());
                navigate('/my');
            }, 1000);
        }
    }, [success, navigate, dispatch]);

    // Очистка ошибок при размонтировании
    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearSuccess());
        };
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Очистка ошибки валидации при изменении поля
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleAccessTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            access_type: e.target.value as AccessType
        }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = t('errors.nameRequired') || 'Введите название коллекции';
        } else if (formData.name.length > 100) {
            errors.name = t('errors.nameTooLong') || 'Название не должно превышать 100 символов';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        if (!validateForm()) {
            return;
        }

        if (!user) {
            return;
        }

        try {
            await dispatch(createCollection({
                name: formData.name.trim(),
                access_type: formData.access_type,
                creator_id: user.id
            })).unwrap();
        } catch (error) {
            console.error('Collection creation failed:', error);
        }
    };

    return (
        <>
            <Header/>
            <Main>
                <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Заголовок */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {t('createCollection.title') || 'Создать коллекцию'}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {t('createCollection.subtitle') || 'Заполните форму для создания новой коллекции'}
                            </p>
                        </div>

                        {/* Форма */}
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Название */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('createCollection.nameLabel') || 'Название коллекции'} *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        maxLength={100}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                            validationErrors.name
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder={t('createCollection.namePlaceholder') || 'Введите название коллекции'}
                                        required
                                    />
                                    {validationErrors.name && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.name.length}/100
                                    </p>
                                </div>

                                {/* Тип доступа */}
                                <div>
                                    <label htmlFor="access_type"
                                           className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('createCollection.accessType') || 'Тип доступа'} *
                                    </label>
                                    <select
                                        id="access_type"
                                        name="access_type"
                                        value={formData.access_type}
                                        onChange={handleAccessTypeChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    >
                                        <option value="private">
                                            {t('createCollection.private') || 'Приватная'} - {t('createCollection.privateDesc') || 'Только вы'}
                                        </option>
                                        <option value="public">
                                            {t('createCollection.public') || 'Публичная'} - {t('createCollection.publicDesc') || 'Все пользователи'}
                                        </option>
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.access_type === 'public'
                                            ? t('createCollection.publicInfo') || 'Коллекция будет видна всем пользователям'
                                            : t('createCollection.privateInfo') || 'Коллекция видна только вам'
                                        }
                                    </p>
                                </div>

                                {/* Сообщения об ошибках */}
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                        <p className="font-medium">{t('common.error') || 'Ошибка'}</p>
                                        <p className="text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Сообщение об успехе */}
                                {success && (
                                    <div
                                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                        <p className="font-medium">{t('common.success') || 'Успешно'}</p>
                                        <p className="text-sm">{success}</p>
                                    </div>
                                )}

                                {/* Кнопки */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                                    >
                                        {isCreating ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none"
                                                     viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                {t('createCollection.creating') || 'Создание...'}
                                            </span>
                                        ) : (
                                            t('createCollection.create') || 'Создать коллекцию'
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/my')}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                                    >
                                        {t('common.cancel') || 'Отмена'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}
