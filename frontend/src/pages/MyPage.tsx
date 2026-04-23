// MyPage.tsx
import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import CollectionTabs from "@components/Collections/CollectionTabs.tsx";
import CardGrid from "@components/Card/CardGrid.tsx";
import {useNavigate} from 'react-router-dom';
import {
    myCollections,
    fetchMyCards,
    fetchCardsByCollection,
    setSelectedCollectionId,
    resetPagination,
    updateCardCollections, MyCardState, fetchLikedCards
} from "@store/card/myCardSlice.ts";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDropMenu} from '@/hooks/useDropMenu';
import {DropMenu} from '@components/Card/DropMenu';
import {COMMON, LIKED} from "@/constants/collections.ts";

export default function MyPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        myCards,
        collections,
        collectionsLoading,
        isLoading,
        isUpdating,
        selectedCollectionId,
        pagination
    }: MyCardState = useAppSelector((state) => state.myCards);

    const {isAuthenticated} = useAppSelector((state) => state.auth);

    const {menuState, closeMenu} = useDropMenu();
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

        if (selectedCollectionId === COMMON) {
            // Загружаем все карточки пользователя
            dispatch(fetchMyCards({page: 1, perPage: 12}));
        } else if (selectedCollectionId === LIKED) {
            dispatch(fetchLikedCards({
                page: 1,
                perPage: 12
            }));
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

        if (selectedCollectionId === COMMON) {
            dispatch(fetchMyCards({page: nextPage, perPage: 12}));
        } else {
            dispatch(fetchCardsByCollection({
                collectionId: selectedCollectionId,
                page: nextPage,
                perPage: 12
            }));
        }
    };

    const handleSelectCollection = (id: string) => {
        if (selectedCollectionId === id) {
            return;
        }
        dispatch(setSelectedCollectionId(id));
        dispatch(resetPagination());
    };

    const handleCardDrop = async (
        cardId: string,
        targetCollectionId: string,
        sourceCollectionId: string
    ) => {
        try {
            // Находим карточку
            const card = myCards.find(c => c.id === cardId);
            if (!card) return;

            // Получаем текущие ID коллекций карточки
            const currentCollectionIds = card.collectionIds || [];

            let newCollectionIds: string[];

            if (targetCollectionId === COMMON) {
                // Перемещение в "Общую" - удаляем все коллекции
                newCollectionIds = [];
            } else {
                // Проверяем, есть ли уже такая коллекция
                if (currentCollectionIds.includes(targetCollectionId)) {
                    console.log('Карточка уже в этой коллекции');
                    return;
                }

                // Если sourceCollectionId передан, значит это перемещение
                if (sourceCollectionId !== null) {
                    // Перемещение - удаляем из исходной коллекции и добавляем в целевую
                    newCollectionIds = currentCollectionIds
                        .filter(id => id !== sourceCollectionId)
                        .concat(targetCollectionId);
                } else {
                    // Копирование - просто добавляем новую коллекцию
                    newCollectionIds = [...currentCollectionIds, targetCollectionId];
                }
            }

            // Отправляем запрос на обновление
            await dispatch(updateCardCollections({
                cardId,
                collectionIds: newCollectionIds
            })).unwrap();

            console.log('Карточка успешно обработана');

            // Обновляем список карточек
            refreshCards();

        } catch (error) {
            console.error('Ошибка при обработке карточки:', error);
        }
    };

    const refreshCards = () => {
        if (selectedCollectionId === COMMON) {
            dispatch(fetchMyCards({page: 1, perPage: 12}));
        } else {
            dispatch(fetchCardsByCollection({
                collectionId: selectedCollectionId,
                page: 1,
                perPage: 12
            }));
        }
    };

    const handleCopyCard = async () => {
        if (!menuState.cardId || menuState.targetCollectionId === undefined) return;

        try {
            const card = myCards.find(c => c.id === menuState.cardId);
            if (!card) return;

            const currentCollectionIds = card.collectionIds || [];

            let newCollectionIds: string[];

            if (menuState.targetCollectionId === null) {
                // Копирование в "Общую" - добавляем все коллекции?
                // Или оставляем как есть? Решайте сами
                newCollectionIds = currentCollectionIds;
            } else {
                // Копирование - добавляем новую коллекцию к существующим
                if (currentCollectionIds.includes(menuState.targetCollectionId)) {
                    console.log('Карточка уже в этой коллекции');
                    closeMenu();
                    return;
                }
                newCollectionIds = [...currentCollectionIds, menuState.targetCollectionId];
            }

            await dispatch(updateCardCollections({
                cardId: menuState.cardId,
                collectionIds: newCollectionIds
            })).unwrap();

            console.log('Карточка успешно скопирована');
            closeMenu();

            // Обновляем список карточек
            refreshCards();

        } catch (error) {
            console.error('Ошибка при копировании карточки:', error);
            closeMenu();
        }
    };

    const handleMoveCard = async () => {
        if (!menuState.cardId || menuState.targetCollectionId === undefined) return;

        try {
            const card = myCards.find(c => c.id === menuState.cardId);
            if (!card) return;

            const currentCollectionIds = card.collectionIds || [];

            // Определяем, из какой коллекции перемещаем
            // Берем первую коллекцию из sourceCollectionIds как исходную
            const sourceCollectionId = menuState.sourceCollectionIds[0];

            let newCollectionIds: string[];

            if (menuState.targetCollectionId === null) {
                newCollectionIds = [];
            } else {
                newCollectionIds = currentCollectionIds.filter((id: string) => id !== sourceCollectionId).concat(menuState.targetCollectionId);
            }

            await dispatch(updateCardCollections({
                cardId: menuState.cardId,
                collectionIds: newCollectionIds
            })).unwrap();

            console.log('Карточка успешно перемещена');
            closeMenu();

            // Обновляем список карточек
            refreshCards();

        } catch (error) {
            console.error('Ошибка при перемещении карточки:', error);
            closeMenu();
        }
    };

    // Добавим обработчик клавиши ESC для закрытия меню
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && menuState.isOpen) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [menuState.isOpen, closeMenu]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Header/>
            <Main>
                <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                    {/* Оверлей при перетаскивании */}
                    {isUpdating && (
                        <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-center pb-8">
                            <div
                                className="flex items-center gap-3 px-5 py-3 bg-gray-900/90 text-white rounded-2xl shadow-2xl animate-[fadeInUp_0.2s_ease-out]">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                </svg>
                                <span className="text-sm font-medium">Перемещение карточки...</span>
                            </div>
                        </div>
                    )}
                    <div className="max-w-7xl mx-auto">
                        {/* Заголовок */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {t('my.title') || 'Мои карточки'}
                                </h1>
                            </div>
                            <button
                                onClick={() => navigate('/card/create', {
                                    state: {
                                        selectedCollectionId: selectedCollectionId,
                                    }
                                })}
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
                            onCardDrop={handleCardDrop}
                        />

                        {/* Сетка карточек */}
                        {myCards.length > 0 ? (
                            <CardGrid
                                cards={myCards}
                                isLoading={isLoading}
                                onLoadMore={handleLoadMore}
                                hasMore={pagination.hasMore}
                                onCardDrop={handleCardDrop}
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
                                            onClick={() => navigate('/card/create')}
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
                {/* Меню выбора действия при перетаскивании */}
                {menuState.isOpen && (
                    <DropMenu
                        position={menuState.position}
                        onCopy={handleCopyCard}
                        onMove={handleMoveCard}
                        onClose={closeMenu}
                        sourceCollectionId={menuState.sourceCollectionIds[0]}
                        targetCollectionId={menuState.targetCollectionId}
                    />
                )}
            </Main>
            <Footer/>
        </DndProvider>
    );
}