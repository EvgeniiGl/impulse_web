import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import Footer from "@modules/Footer.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {AccessType, useAppDispatch, useAppSelector} from "@store/store.ts";
import {
    createCollection,
    clearError,
} from "@store/card/cardSlice.ts";
import {MyCardState, myCollections} from "@store/card/myCardSlice.ts";
import CollectionList from "@components/Collections/CollectionList.tsx";

export default function CreateCollectionPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        name: '',
        access_type: 'public' as AccessType,
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false); // Добавляем состояние для блокировки повторных отправок
    const {isAuthenticated} = useAppSelector((state) => state.auth);

    const {
        collections,
        collectionsLoading,
    }: MyCardState = useAppSelector((state) => state.myCards);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(myCollections());
        } else {
            navigate('/login');
        }
    }, [isAuthenticated]);

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

    // const handleAccessTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         access_type: e.target.value as AccessType
    //     }));
    // };

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

        if (isSubmitting) {
            return;
        }

        dispatch(clearError());

        if (!validateForm()) {
            return;
        }

        // Устанавливаем флаг отправки
        setIsSubmitting(true);

        try {
            await dispatch(createCollection({
                name: formData.name.trim(),
                access_type: formData.access_type,
            })).unwrap();
        } catch (error) {
            console.error('Collection creation failed:', error);
        } finally {
            dispatch(myCollections());
            setIsSubmitting(false);
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
                                        disabled={isSubmitting} // Блокируем ввод во время отправки
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                            validationErrors.name
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } ${isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}`}
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
                                {/*<div>*/}
                                {/*    <label htmlFor="access_type"*/}
                                {/*           className="block text-sm font-medium text-gray-700 mb-2">*/}
                                {/*        {t('cards.accessType') || 'Тип доступа'} **/}
                                {/*    </label>*/}
                                {/*    <select*/}
                                {/*        id="access_type"*/}
                                {/*        name="access_type"*/}
                                {/*        value={formData.access_type}*/}
                                {/*        onChange={handleAccessTypeChange}*/}
                                {/*        disabled={isSubmitting} // Блокируем select во время отправки*/}
                                {/*        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"*/}
                                {/*    >*/}
                                {/*        <option value="private">*/}
                                {/*            {t('cards.private') || 'Приватная'} - {t('cards.privateDesc') || 'Только вы'}*/}
                                {/*        </option>*/}
                                {/*        <option value="public">*/}
                                {/*            {t('cards.public') || 'Публичная'} - {t('cards.publicDesc') || 'Все пользователи'}*/}
                                {/*        </option>*/}
                                {/*    </select>*/}
                                {/*    <p className="mt-1 text-xs text-gray-500">*/}
                                {/*        {formData.access_type === 'public'*/}
                                {/*            ? t('cards.publicInfo') || 'Коллекция будет видна всем пользователям'*/}
                                {/*            : t('cards.privateInfo') || 'Коллекция видна только вам'*/}
                                {/*        }*/}
                                {/*    </p>*/}
                                {/*</div>*/}

                                {/* Кнопки */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                                    >
                                        {isSubmitting ? (
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
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Вкладки коллекций */}
                    <div className="max-w-5xl mx-auto m-8">
                        <CollectionList
                            collections={collections}
                            isLoading={collectionsLoading}
                        />
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}
