import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import Footer from "@modules/Footer.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {AccessType, Collection, useAppDispatch, useAppSelector} from "@store/store.ts";
import {CreateCardRequest, UpdateCardRequest} from "@api/cardsApi.ts";
import CollectionSelect from "@components/Form/Select/CollectionSelect.tsx";
import ColorPicker from "@components/Form/ColorPicker/ColorPicker.tsx";
import {TextColor, DEFAULT_TEXT_COLOR} from "@/constants/colors";
import {
    myCollections,
    setSelectedCollections,
    createCard,
    clearError,
    clearSuccess,
} from "@store/card/myCardSlice.ts";
import {fetchCard, resetCurrentCard, updateCard} from '@store/card/cardSlice.ts';

export default function CardEditorPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {id} = useParams<{ id: string }>();

    const isEditMode = !!id;
    const collectionId = location.state?.selectedCollectionId;

    const [formData, setFormData] = useState<CreateCardRequest & {
        show_title_on_image?: boolean;
        title_color?: TextColor;
    }>({
        title: '',
        description: '',
        access_type: 'private',
        is_active: false,
        file: null,
        collection_ids: [],
        show_title_on_image: false,
        title_color: DEFAULT_TEXT_COLOR,
    });
    const [preview, setPreview] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    // Флаг: был ли выбран новый файл в режиме редактирования
    const [_, setHasNewFile] = useState(false);

    const {
        isCreating,
        error,
        success,
        collectionsLoading,
        collections,
        selectedCollections
    } = useAppSelector((state) => state.myCards);

    const {currentCard, isLoading: isCardLoading, isUpdating} = useAppSelector((state) => state.card);
    const {isAuthenticated, user} = useAppSelector((state) => state.auth);

    // Проверка авторизации
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(myCollections());
        }
    }, [isAuthenticated, navigate, dispatch]);

    // Загрузка карточки для редактирования
    useEffect(() => {
        if (isEditMode && id) {
            dispatch(fetchCard(id));
        }
        return () => {
            dispatch(resetCurrentCard());
        };
    }, [id, isEditMode, dispatch]);

    useEffect(() => {
        if (currentCard && currentCard.creator?.id !== user?.id) {
            navigate('/');
        }
    }, [currentCard]);

    // Заполнение формы данными карточки при редактировании
    useEffect(() => {
        if (isEditMode && currentCard) {
            setFormData({
                title: currentCard.title || '',
                description: currentCard.description || '',
                access_type: currentCard.access_type,
                is_active: currentCard.is_active,
                file: null,
                collection_ids: currentCard.collectionIds || [],
                show_title_on_image: currentCard.show_title_on_image,
                title_color: (currentCard.title_color as TextColor) || DEFAULT_TEXT_COLOR,
            });
            setPreview(currentCard.url || null);
            setHasNewFile(false);

            // Синхронизируем selectedCollections с коллекциями карточки
            if (currentCard.collectionIds && currentCard.collectionIds.length > 0) {
                if (currentCard.collections) {
                    dispatch(setSelectedCollections(currentCard.collections));
                }
            } else if (currentCard.collectionIds && currentCard.collectionIds.length > 0 && collections.length > 0) {
                // Если есть только ID, находим коллекции по ID
                const cardCollections = collections.filter(c =>
                    currentCard.collectionIds.includes(c.id)
                );
                dispatch(setSelectedCollections(cardCollections));
            }
        }
    }, [currentCard, isEditMode, collections, dispatch]);

    // Установка выбранной коллекции при создании
    useEffect(() => {
        if (!isEditMode && collectionId && collections.length > 0) {
            const collection = collections.find(c => c.id === collectionId);
            if (collection) {
                setFormData(prev => ({
                    ...prev,
                    collection_ids: [collectionId]
                }));
                dispatch(setSelectedCollections([collection]));
            }
        }
    }, [collectionId, collections, isEditMode, dispatch]);

    // Обработка успешного создания
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(clearSuccess());
                navigate('/my');
            }, 1500);
        }
    }, [success, navigate, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleColorChange = (color: TextColor) => {
        setFormData(prev => ({
            ...prev,
            title_color: color
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            if (!file.type.startsWith('image/')) {
                setValidationErrors(prev => ({
                    ...prev,
                    file: t('errors.invalidFileType')
                }));
                return;
            }

            const maxSize = 25 * 1024 * 1024;
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

            setValidationErrors(prev => ({
                ...prev,
                file: ''
            }));

            setHasNewFile(true);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Title опционален, но если есть - проверяем длину
        if (formData.title && formData.title.length > 100) {
            errors.title = t('errors.titleTooLong');
        }

        if (formData.description && formData.description.length > 5000) {
            errors.description = t('errors.descriptionTooLong');
        }

        // Файл обязателен ВСЕГДА
        // При создании: должен быть выбран файл
        // При редактировании: должен быть либо существующий файл (preview), либо новый выбранный
        if (!isEditMode) {
            // Создание - файл обязателен
            if (!formData.file) {
                errors.file = t('errors.fileRequired');
            }
        } else {
            // Редактирование - должен быть либо preview (существующий), либо новый файл
            if (!preview && !formData.file) {
                errors.file = t('errors.fileRequired');
            }
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

        // Определяем, показывать ли заголовок на изображении
        // Только если есть заголовок и включен toggle
        const showTitleOnImage = !!(formData.title?.trim() && formData.show_title_on_image);

        // Цвет заголовка имеет смысл только если показываем заголовок
        const titleColor = showTitleOnImage ? formData.title_color : undefined;

        if (isEditMode && id) {
            // Обновление карточки
            const updateData: UpdateCardRequest = {
                title: formData.title?.trim() || '',
                description: formData.description?.trim() || null,
                access_type: formData.access_type,
                collection_ids: formData.collection_ids,
                show_title_on_image: showTitleOnImage,
                is_active: formData.is_active,
            };

            // Добавляем title_color только если показываем заголовок
            if (titleColor) {
                updateData.title_color = titleColor;
            }

            // Добавляем файл только если был выбран новый
            if (formData.file) {
                updateData.file = formData.file;
            }

            try {
                await dispatch(updateCard({id, data: updateData})).unwrap();
                navigate(`/card/${id}`);
            } catch (error) {
                console.error('Card update failed:', error);
            }
        } else {
            // Создание карточки
            if (!formData.file) {
                setValidationErrors(prev => ({...prev, file: t('errors.fileRequired')}));
                return;
            }

            const cardData: CreateCardRequest = {
                title: formData.title?.trim() || '',
                description: formData.description?.trim() || null,
                access_type: formData.access_type,
                is_active: false,
                collection_ids: formData.collection_ids,
                file: formData.file,
                show_title_on_image: showTitleOnImage,
            };

            // Добавляем title_color только если показываем заголовок
            if (titleColor) {
                cardData.title_color = titleColor;
            }

            try {
                await dispatch(createCard({card: cardData, file: formData.file})).unwrap();
            } catch (error) {
                console.error('Card creation failed:', error);
            }
        }
    };

    const onCollectionsChange = (collections: Collection[]) => {
        const collectionIds = collections.map(i => i.id);
        setFormData(prev => ({
            ...prev,
            collection_ids: collectionIds
        }));
        dispatch(setSelectedCollections(collections));
    };

    // Загрузка карточки для редактирования
    if (isEditMode && isCardLoading) {
        return (
            <>
                <Header/>
                <Main>
                    <div className="flex h-screen items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"/>
                            <h2 className="mt-4 text-xl font-medium text-gray-700">{t('common.loading')}</h2>
                        </div>
                    </div>
                </Main>
                <Footer/>
            </>
        );
    }

    // Показывать toggle и color picker только если есть заголовок
    const canShowTitleOnImage = !!(formData.title?.trim());

    return (
        <>
            <Header/>
            <Main>
                <div className="flex h-screen">
                    {/* Левая панель - превью изображения */}
                    <div style={{display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '50%'}}>
                        <div style={{flex: 1, minHeight: 0}}>
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '500px',
                                padding: '30px',
                            }}>
                                <div style={{
                                    aspectRatio: '9/16',
                                    height: '100%',
                                    position: 'relative',
                                    maxHeight: '900px'
                                }}>
                                    {preview ? (
                                        <label
                                            htmlFor="file"
                                            className="block w-full h-full cursor-pointer group relative"
                                        >
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: 'var(--radius-xl)',
                                                    border: '1px solid var(--color-gray-400)',
                                                }}
                                            />
                                            {/* Отображение названия на превью */}
                                            {formData.show_title_on_image && formData.title && (
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
                                                >
                                                    <div className="text-center">
                                                        <h3
                                                            className="font-['Pacifico'] text-3xl md:text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-3"
                                                            style={{color: formData.title_color}}
                                                        >
                                                            {formData.title}
                                                        </h3>
                                                        <div
                                                            className="w-16 h-0.5 mx-auto"
                                                            style={{
                                                                background: `linear-gradient(to right, transparent, ${formData.title_color}, transparent)`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Hover overlay для смены изображения */}
                                            <div
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                                                style={{borderRadius: 'var(--radius-xl)'}}
                                            >
                                                <div className="text-center text-white">
                                                    <svg className="w-12 h-12 mx-auto mb-2" fill="none"
                                                         stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={1.5}
                                                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={1.5}
                                                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    </svg>
                                                    <span
                                                        className="text-lg font-medium">{t('cards.changeImage')}</span>
                                                </div>
                                            </div>
                                            <input
                                                type="file"
                                                id="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    ) : (
                                        <div
                                            className={`w-full h-full flex items-center justify-center ${
                                                validationErrors.file ? 'border-red-500' : ''
                                            }`}
                                            style={{
                                                borderRadius: 'var(--radius-xl)',
                                                border: validationErrors.file
                                                    ? '2px dashed #ef4444'
                                                    : '2px dashed var(--color-gray-400)',
                                                backgroundColor: validationErrors.file
                                                    ? '#fef2f2'
                                                    : 'var(--color-gray-100)',
                                            }}
                                        >
                                            <label
                                                htmlFor="file"
                                                className="cursor-pointer flex flex-col items-center p-8"
                                            >
                                                <svg
                                                    className={`w-16 h-16 mb-4 ${validationErrors.file ? 'text-red-400' : 'text-gray-400'}`}
                                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                                </svg>
                                                <span
                                                    className={`text-lg font-medium ${validationErrors.file ? 'text-red-600' : 'text-gray-600'}`}>
                                                    {validationErrors.file || t('cards.uploadText')}
                                                </span>
                                                <span className="text-sm text-gray-500 mt-2">
                                                    PNG, JPG, GIF до 5MB
                                                </span>
                                            </label>
                                            <input
                                                type="file"
                                                id="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Правая панель - форма */}
                    <div className="p-8 overflow-y-auto flex-1">
                        {/* Заголовок страницы */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditMode ? t('cards.editCard') : t('cards.createCard')}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                {t('cards.subtitle')}
                            </p>
                        </div>

                        {/* Сообщения об ошибках */}
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <div className="flex">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <p className="ml-3 text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Сообщение об успехе */}
                        {success && (
                            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <div className="flex">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <p className="ml-3 text-sm text-green-700">
                                        {isEditMode ? t('cards.updateSuccess') : t('cards.createSuccess')}
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Название (опционально) */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        {t('cards.titleLabel')}
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg ${
                                        validationErrors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={t('cards.titlePlaceholder')}
                                />
                                {validationErrors.title && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                                )}
                            </div>

                            {/* Toggle: показать название на картинке - только если есть заголовок */}
                            {canShowTitleOnImage && (
                                <div className="flex items-center gap-3">
                                    <label htmlFor="show_title_on_image"
                                           className="flex items-center gap-3 cursor-pointer select-none">
                                        <div className="relative">
                                            <input
                                                id="show_title_on_image"
                                                name="show_title_on_image"
                                                type="checkbox"
                                                checked={formData.show_title_on_image}
                                                onChange={handleCheckboxChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-10 h-6 bg-gray-200 rounded-full
                                                            peer-checked:bg-[var(--color-primary)]
                                                            transition-colors duration-200"/>
                                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                                                            peer-checked:translate-x-4
                                                            transition-transform duration-200"/>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {t('cards.showTitleOnImage')}
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Выбор цвета текста - только если есть заголовок И включено отображение */}
                            {canShowTitleOnImage && formData.show_title_on_image && (
                                <ColorPicker
                                    selectedColor={formData.title_color || DEFAULT_TEXT_COLOR}
                                    onColorChange={handleColorChange}
                                    label={t('cards.titleColor')}
                                />
                            )}

                            {/* Описание */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('cards.descriptionLabel')}
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                                        validationErrors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={t('cards.descriptionPlaceholder')}
                                />
                                {validationErrors.description && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    {formData.description?.length || 0}/5000
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
                                <label htmlFor="access_type" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('cards.accessType')} *
                                </label>
                                <select
                                    id="access_type"
                                    name="access_type"
                                    value={formData.access_type}
                                    onChange={handleAccessTypeChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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

                            {/* Кнопки */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                    className="flex-1 bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--color-primary-dark)] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {(isCreating || isUpdating) ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none"
                                                 viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {isEditMode ? t('cards.updating') : t('cards.creating')}
                                        </span>
                                    ) : (
                                        isEditMode ? t('common.save') : t('cards.create')
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate(isEditMode ? `/card/${id}` : '/my')}
                                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}