import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {useEffect, useRef, useState, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {
    fetchPublicCards,
    searchPublicCards,
    setSearchQuery,
    resetHomePagination,
} from "@store/home/homeSlice.ts";
import CardGrid from "@components/Card/CardGrid.tsx";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

export default function HomePage() {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const {cards, isLoading, error, searchQuery, pagination} = useAppSelector((state) => state.home);

    const [inputValue, setInputValue] = useState('');
    const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Initial load
    useEffect(() => {
        dispatch(resetHomePagination());
        dispatch(fetchPublicCards({page: 1, perPage: 12}));
    }, [dispatch]);

    // Debounced search
    useEffect(() => {
        if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

        searchTimerRef.current = setTimeout(() => {
            dispatch(setSearchQuery(inputValue));
            dispatch(resetHomePagination());

            if (inputValue.trim()) {
                dispatch(searchPublicCards({query: inputValue.trim(), page: 1, perPage: 12}));
            } else {
                dispatch(fetchPublicCards({page: 1, perPage: 12}));
            }
        }, 400);

        return () => {
            if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
        };
    }, [inputValue, dispatch]);

    const handleLoadMore = useCallback(() => {
        if (isLoading || !pagination.hasMore) return;
        const nextPage = pagination.page + 1;

        if (searchQuery.trim()) {
            dispatch(searchPublicCards({query: searchQuery.trim(), page: nextPage, perPage: pagination.perPage}));
        } else {
            dispatch(fetchPublicCards({page: nextPage, perPage: pagination.perPage}));
        }
    }, [isLoading, pagination, searchQuery, dispatch]);

    const handleClear = () => {
        setInputValue('');
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Header/>
            <Main>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                        {/* Search bar */}
                        <div className="mb-8">
                            <div className="relative max-w-2xl mx-auto">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    {isLoading && pagination.page === 1 ? (
                                        <svg className="w-5 h-5 text-indigo-400 animate-spin" fill="none"
                                             viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                                    stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                        </svg>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t('home.search.placeholder')}
                                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent shadow-sm text-sm transition-all duration-200"
                                />
                                {inputValue && (
                                    <button
                                        onClick={handleClear}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Search status */}
                            {searchQuery && !isLoading && (
                                <p className="text-center text-sm text-gray-500 mt-3">
                                    {pagination.total > 0
                                        ? t('home.search.results', {count: pagination.total, query: searchQuery})
                                        : t('home.search.noResults', {query: searchQuery})
                                    }
                                </p>
                            )}
                        </div>

                        {/* Section title */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {searchQuery ? t('home.search.title') : t('home.cards.latest')}
                            </h2>
                            {!searchQuery && pagination.total > 0 && (
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {t('home.cards.totalCount', {count: pagination.total})}
                                </p>
                            )}
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Cards or empty state */}
                        {cards.length > 0 || isLoading ? (
                            <CardGrid
                                cards={cards}
                                isLoading={isLoading}
                                onLoadMore={handleLoadMore}
                                hasMore={pagination.hasMore}
                            />
                        ) : (
                            <div className="text-center py-20">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <h3 className="text-gray-700 font-medium mb-1">
                                    {searchQuery ? t('home.search.empty') : t('home.cards.empty')}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {searchQuery ? t('home.search.emptyHint') : t('home.cards.emptyHint')}
                                </p>
                            </div>
                        )}

                        {/* All loaded message */}
                        {!isLoading && !pagination.hasMore && cards.length > 0 && (
                            <p className="text-center text-sm text-gray-400 mt-6 pb-4">
                                {t('home.cards.allLoaded')}
                            </p>
                        )}
                    </div>
                </div>
            </Main>
            <Footer/>
        </DndProvider>
    );
}