import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import Footer from "@modules/Footer.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import {AccessType, Collection, useAppDispatch, useAppSelector} from "@store/store.ts";
import {CreateCardRequest} from "@api/cardsApi.ts";
import CollectionSelect from "@components/Form/Select/CollectionSelect.tsx";
import {
    myCollections,
    setSelectedCollections,
    createCard,
    clearError,
    clearSuccess,
} from "@store/card/myCardSlice.ts";

export default function CreateCardPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const collectionId = location.state?.selectedCollectionId;

    const [formData, setFormData] = useState<CreateCardRequest & { show_title_on_image?: boolean }>({
        title: '',
        description: '',
        access_type: 'private',
        is_active: false,
        file: null,
        collection_ids: [],
        show_title_on_image: false, // Добавлено новое поле
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const {
        isCreating,
        error,
        success,
        collectionsLoading,
        collections,
        selectedCollections
    } = useAppSelector((state) => state.myCards);
    const {isAuthenticated, user} = useAppSelector((state) => state.auth);

    // Проверка авторизации
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(myCollections())
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

    useEffect(() => {
        if (collections.length > 0 && collectionId) {
            const collectionToSelect = collections.find(c => c.id === collectionId);
            if (collectionToSelect) {
                // Устанавливаем в selectedCollections
                dispatch(setSelectedCollections([collectionToSelect]));

                // Устанавливаем в formData
                setFormData(prev => ({
                    ...prev,
                    collection_ids: [collectionToSelect.id]
                }));
            }
        } else {
            dispatch(setSelectedCollections([]));
            setFormData(prev => ({
                ...prev,
                collection_ids: []
            }));
        }

    }, [collections, collectionId]);

    // Очистка ошибок при размонтировании
    useEffect(() => {
        return () => {
            dispatch(clearError());
            dispatch(clearSuccess());
        };
    }, [dispatch]);

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

    // Обработчик для чекбокса
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
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
                    file: t('errors.invalidFileType')
                }));
                return;
            }

            // Проверка размера файла (макс 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setValidationErrors(prev => ({
                    ...prev,
                    file: t('errors.fileTooLarge')
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
            errors.title = t('errors.titleRequired');
        } else if (formData.title.length > 100) {
            errors.title = t('errors.titleTooLong');
        }

        if (formData.description && formData.description.length > 5000) {
            errors.description = t('errors.descriptionTooLong');
        }

        if (!formData.file) {
            errors.file = t('errors.fileRequired');
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
            access_type: formData.access_type,
            is_active: false,
            collection_ids: formData.collection_ids,
            file: formData.file,
            show_title_on_image: formData.show_title_on_image
        };

        try {
            await dispatch(createCard({card: cardData, file: formData.file!})).unwrap();
        } catch (error) {
            console.error('Card creation failed:', error);
        }
    };

    const onCollectionsChange = (collections: Collection[]) => {
        const collectionIds = collections.map(i => i.id)
        setFormData(prev => ({
            ...prev,
            collection_ids: collectionIds
        }));
        dispatch(setSelectedCollections(collections))
    }

    return (
        <>
            <Header/>
            <Main>
                <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Заголовок */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {t('cards.createCard')}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                {t('cards.subtitle')}
                            </p>
                        </div>

                        {/* Форма */}
                        <div className="bg-white shadow-md rounded-lg p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Название с чекбоксом */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            {t('cards.titleLabel')} *
                                        </label>

                                        {/* Чекбокс "Отображать на картинке" */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="show_title_on_image"
                                                name="show_title_on_image"
                                                checked={formData.show_title_on_image}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 text-[var(--color-primary)] border-gray-300 rounded checked:bg-[var(--color-primary)] checked:hover:bg-[var(--color-primary-dark)] checked:focus:bg-[var(--color-primary-dark)] transition-colors"
                                                style={{
                                                    accentColor: 'var(--color-primary)'
                                                }}
                                            />
                                            <label htmlFor="show_title_on_image"
                                                   className="ml-2 block text-sm text-gray-700">
                                                {t('cards.showTitleOnImage')}
                                            </label>
                                        </div>
                                    </div>

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
                                        placeholder={t('cards.titlePlaceholder')}
                                        required
                                    />

                                    {validationErrors.title && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                                    )}

                                    <div className="flex justify-between mt-1">
                                        <p className="text-xs text-gray-500">
                                            {formData.title.length}/100
                                        </p>
                                        {formData.show_title_on_image && (
                                            <p className="text-xs text-[var(--text-primary)]">
                                                {t('cards.titleWillBeShown')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Описание */}
                                <div>
                                    <label htmlFor="description"
                                           className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('cards.descriptionLabel')}
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
                                        placeholder={t('cards.descriptionPlaceholder')}
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
                                    <CollectionSelect
                                        collections={collections}
                                        collectionsLoading={collectionsLoading}
                                        selectedCollections={selectedCollections}
                                        onCollectionsChange={onCollectionsChange}
                                        t={t}
                                    />
                                </div>

                                {/* Тип доступа */}
                                <div>
                                    <label htmlFor="access_type"
                                           className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('cards.accessType')} *
                                    </label>
                                    <select
                                        id="access_type"
                                        name="access_type"
                                        value={formData.access_type}
                                        onChange={handleAccessTypeChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    >
                                        <option value="private">
                                            {t('cards.private')} - {t('cards.privateDesc')}
                                        </option>
                                        <option value="public">
                                            {t('cards.public')} - {t('cards.publicDesc')}
                                        </option>
                                    </select>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {formData.access_type === 'public'
                                            ? t('cards.publicInfo')
                                            : t('cards.privateInfo')
                                        }
                                    </p>
                                </div>

                                {/* Загрузка файла */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('cards.fileLabel' as any)} *
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
                                                    {t('cards.uploadText')}
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

                                            {/* Пример отображения названия на превью (опционально) */}
                                            {formData.show_title_on_image && formData.title && (
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                                                    <p className="text-lg font-semibold">{formData.title}</p>
                                                </div>
                                            )}

                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                                title={t('common.remove')}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>
                                            <p className="mt-2 text-sm text-gray-600">
                                                {t('cards.fileSelected')}: {formData.file?.name}
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
                                        <p className="font-medium">{t('common.error')}</p>
                                        <p className="text-sm">{error}</p>
                                    </div>
                                )}

                                {/* Сообщение об успехе */}
                                {success && (
                                    <div
                                        className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                        <p className="font-medium">{t('common.success')}</p>
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
                                                {t('cards.creating')}
                                            </span>
                                        ) : (
                                            t('cards.create')
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/my')}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                                    >
                                        {t('common.cancel')}
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