import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import Footer from "@modules/Footer.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {createCard, clearError, clearSuccess, myCollections, AccessType} from "@store/card/cardSlice.ts";
import {CreateCardRequest} from "@api/cardsApi.ts";

export default function CreatePage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<CreateCardRequest>({
        title: '',
        description: '',
        creator_id: '',
        access_type: 'private',
        is_active: false,
        file: null,
        collection_ids: [],
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const {isCreating, error, success, collectionsLoading, collections} = useAppSelector((state) => state.card);
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

    useEffect(() => {
        dispatch(myCollections())
    }, []);

    const handleCollectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            collection_ids: selectedOptions
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            // Проверка типа файла
            if (!file.type.startsWith('image/')) {
                setValidationErrors(prev => ({
                    ...prev,
                    file: t('errors.invalidFileType') || 'Пожалуйста, выберите изображение'
                }));
                return;
            }

            // Проверка размера файла (макс 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setValidationErrors(prev => ({
                    ...prev,
                    file: t('errors.fileTooLarge') || 'Файл слишком большой (макс 5MB)'
                }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                file
            }));

            // Очистка ошибки файла
            setValidationErrors(prev => ({
                ...prev,
                file: ''
            }));

            // Создание превью
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({
            ...prev,
            file: null
        }));
        setPreview(null);
        setValidationErrors(prev => ({
            ...prev,
            file: ''
        }));
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) {
            errors.title = t('errors.titleRequired') || 'Введите название карточки';
        } else if (formData.title.length > 100) {
            errors.title = t('errors.titleTooLong') || 'Название не должно превышать 100 символов';
        }

        if (formData.description && formData.description.length > 5000) {
            errors.description = t('errors.descriptionTooLong') || 'Описание не должно превышать 5000 символов';
        }

        if (!formData.file) {
            errors.file = t('errors.fileRequired') || 'Выберите файл';
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

        const cardData: CreateCardRequest = {
            title: formData.title.trim(),
            description: formData.description?.trim() || null,
            creator_id: user.id,
            access_type: formData.access_type,
            is_active: false,
            collection_ids: formData.collection_ids,
            file: formData.file
        };

        try {
            await dispatch(createCard({card: cardData, file: formData.file!})).unwrap();
        } catch (error) {
            console.error('Card creation failed:', error);
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
                                {t('createCard.title') || 'Создать карточку'}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {t('createCard.subtitle') || 'Заполните форму для создания новой карточки'}
                            </p>
                        </div>

                        {/* Форма */}
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Название */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('createCard.titleLabel') || 'Название карточки'} *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        maxLength={100}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                            validationErrors.title
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder={t('createCard.titlePlaceholder') || 'Введите название'}
                                        required
                                    />
                                    {validationErrors.title && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.title.length}/100
                                    </p>
                                </div>

                                {/* Описание */}
                                <div>
                                    <label htmlFor="description"
                                           className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('createCard.descriptionLabel') || 'Описание'}
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        maxLength={5000}
                                        rows={4}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                                            validationErrors.description
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder={t('createCard.descriptionPlaceholder') || 'Введите описание (опционально)'}
                                    />
                                    {validationErrors.description && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.description?.length}/5000
                                    </p>
                                </div>

                                {/* Коллекции */}
                                <div>
                                    <label
                                        htmlFor="collections"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        {t('createCard.collections') || 'Коллекции'}
                                        <span
                                            className="text-gray-400 ml-1">({t('createCard.optional') || 'необязательно'})</span>
                                    </label>

                                    {collectionsLoading ? (
                                        <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                                            <p className="text-sm text-gray-500">{t('common.loading') || 'Загрузка...'}</p>
                                        </div>
                                    ) : collections.length === 0 ? (
                                        <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                                            <p className="text-sm text-gray-500">
                                                {t('createCard.noCollections') || 'У вас пока нет коллекций'}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => navigate('/collections/create')}
                                                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                {t('createCard.createCollection') || 'Создать коллекцию'}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <select
                                                id="collections"
                                                name="collections"
                                                multiple
                                                value={formData.collection_ids}
                                                onChange={handleCollectionChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition min-h-[120px]"
                                            >
                                                {collections.map((collection) => (
                                                    <option key={collection.id} value={collection.id}>
                                                        {collection.name}
                                                        {collection.access_type === 'public' && ' 🌐'}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {t('createCard.collectionsHint') || 'Удерживайте Ctrl (Cmd на Mac) для выбора нескольких коллекций'}
                                            </p>
                                            {formData.collection_ids.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {formData.collection_ids.map(id => {
                                                        const collection = collections.find(c => c.id === id);
                                                        return collection ? (
                                                            <span
                                                                key={id}
                                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                                            >
                                                                {collection.name}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setFormData(prev => ({
                                                                            ...prev,
                                                                            collection_ids: prev.collection_ids.filter(cId => cId !== id)
                                                                        }));
                                                                    }}
                                                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                                                >
                                                                ×
                                                              </button>
                                                            </span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Тип доступа */}
                                <div>
                                    <label htmlFor="access_type"
                                           className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('createCard.accessType') || 'Тип доступа'} *
                                    </label>
                                    <select
                                        id="access_type"
                                        name="access_type"
                                        value={formData.access_type}
                                        onChange={handleAccessTypeChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    >
                                        <option value="private">
                                            {t('createCard.private') || 'Приватная'} - {t('createCard.privateDesc') || 'Только вы'}
                                        </option>
                                        <option value="public">
                                            {t('createCard.public') || 'Публичная'} - {t('createCard.publicDesc') || 'Все пользователи'}
                                        </option>
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.access_type === 'public'
                                            ? t('createCard.publicInfo') || 'Карточка будет видна всем пользователям'
                                            : t('createCard.privateInfo') || 'Карточка видна только вам'
                                        }
                                    </p>
                                </div>

                                {/* Загрузка файла */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('createCard.fileLabel' as any) || 'Изображение'} *
                                    </label>

                                    {!preview ? (
                                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
                                            validationErrors.file
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-300 hover:border-blue-500'
                                        }`}>
                                            <input
                                                type="file"
                                                id="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="file"
                                                className="cursor-pointer flex flex-col items-center"
                                            >
                                                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                                </svg>
                                                <span className="text-sm text-gray-600">
                                                    {t('createCard.uploadText') || 'Нажмите для загрузки изображения'}
                                                </span>
                                                <span className="text-xs text-gray-500 mt-1">
                                                    PNG, JPG, GIF до 5MB
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                                title={t('common.remove') || 'Удалить'}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {t('createCard.fileSelected') || 'Файл выбран'}: {formData.file?.name}
                                            </p>
                                        </div>
                                    )}
                                    {validationErrors.file && (
                                        <p className="mt-2 text-sm text-red-600">{validationErrors.file}</p>
                                    )}
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
                                        className="text-primary-color flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
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
                                                {t('createCard.creating') || 'Создание...'}
                                            </span>
                                        ) : (
                                            t('createCard.create') || 'Создать карточку'
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


