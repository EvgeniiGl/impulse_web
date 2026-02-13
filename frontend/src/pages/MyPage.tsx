import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {
    myCollections,
    fetchCards,
    fetchCardsByCollection,
    setSelectedCollectionId,
    resetPagination
} from "@store/card/cardSlice.ts";
import CollectionTabs from "@components/Collections/CollectionTabs.tsx";
import CardGrid from "@components/Card/CardGrid.tsx";
import {useNavigate} from 'react-router-dom';

export default function MyPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        cards,
        collections,
        collectionsLoading,
        isLoading,
        selectedCollectionId,
        pagination,
        error
    } = useAppSelector((state) => state.card);

    const {isAuthenticated} = useAppSelector((state) => state.auth);

    // Проверка авторизации
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Загрузка коллекций при монтировании
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(myCollections());
        }
    }, [isAuthenticated, dispatch]);

    // Загрузка карточек при изменении выбранной коллекции
    useEffect(() => {
        if (!isAuthenticated) return;

        if (selectedCollectionId === null) {
            // Загружаем все карточки пользователя
            dispatch(fetchCards({page: 1, perPage: 12}));
        } else {
            // Загружаем карточки коллекции
            dispatch(fetchCardsByCollection({
                collectionId: selectedCollectionId,
                page: 1,
                perPage: 12
            }));
        }
    }, [selectedCollectionId, isAuthenticated, dispatch]);

    const handleLoadMore = () => {
        const nextPage = pagination.page + 1;

        if (selectedCollectionId === null) {
            dispatch(fetchCards({page: nextPage, perPage: 12}));
        } else {
            dispatch(fetchCardsByCollection({
                collectionId: selectedCollectionId,
                page: nextPage,
                perPage: 12
            }));
        }
    };

    const handleSelectCollection = (id: string | null) => {
        dispatch(setSelectedCollectionId(id));
        dispatch(resetPagination());
    };

    return (
        <>
            <Header/>
            <Main>
                <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Заголовок */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {t('my.title') || 'Мои карточки'}
                                </h1>
                                <p className="mt-2 text-gray-600">
                                    {t('my.content') || 'Управляйте своими карточками и коллекциями'}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/create-card')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4v16m8-8H4"/>
                                </svg>
                                {t('my.createCard') || 'Создать карточку'}
                            </button>
                        </div>

                        {/* Вкладки коллекций */}
                        <CollectionTabs
                            collections={collections}
                            selectedId={selectedCollectionId}
                            onSelect={handleSelectCollection}
                            isLoading={collectionsLoading}
                        />

                        {/* Ошибка */}
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Информация о количестве карточек */}
                        {!isLoading && cards.length > 0 && (
                            <div className="mb-4 text-sm text-gray-600">
                                {t('my.showing') || 'Показано'}: {cards.length} {t('my.of') || 'из'} {pagination.total}
                            </div>
                        )}

                        {/* Сетка карточек */}
                        {cards.length > 0 ? (
                            <CardGrid
                                cards={cards}
                                isLoading={isLoading}
                                onLoadMore={handleLoadMore}
                                hasMore={pagination.hasMore}
                            />
                        ) : (
                            <div className="text-center py-12">
                                {isLoading ? (
                                    <div className="flex justify-center">
                                        <div
                                            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"/>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            {t('my.noCards') || 'Нет карточек'}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {t('my.createFirst') || 'Создайте свою первую карточку'}
                                        </p>
                                        <button
                                            onClick={() => navigate('/create-card')}
                                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M12 4v16m8-8H4"/>
                                            </svg>
                                            {t('my.createCard') || 'Создать карточку'}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}
