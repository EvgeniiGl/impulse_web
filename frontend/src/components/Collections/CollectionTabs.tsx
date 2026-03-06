// components/Collections/CollectionTabs.tsx
import {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import css from './CollectionTabs.module.css'
import {Collection} from "@store/store.ts";
import CollectionDropZone from './CollectionDropZone';

interface CollectionTabsProps {
    collections: Collection[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    isLoading: boolean;
    onCardDrop?: (cardId: string, targetCollectionId: string | null, sourceCollectionId: string | null) => void;
}

export default function CollectionTabs({
                                           collections,
                                           selectedId,
                                           onSelect,
                                           isLoading,
                                           onCardDrop
                                       }: CollectionTabsProps) {
    const {t} = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [collections]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 300);
        }
    };

    if (isLoading) {
        return (
            <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"/>
                ))}
            </div>
        );
    }

    return (
        <div className="mb-6">
            <div className="flex items-center gap-2">
                {/* Левая кнопка прокрутки */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                )}

                {/* Контейнер с табами */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide"
                >
                    {/* Остальные коллекции */}
                    {collections.map((collection) => {
                        return <CollectionDropZone
                            collectionId={collection.id}
                            onCardDrop={onCardDrop}
                            isActive={true}
                        >
                            <button
                                onClick={() => onSelect(collection.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                                    (selectedId === collection.id)
                                        ? `${css.tabBtnActive}`
                                        : `${css.tabBtn}`
                                }`}
                            >
                                {collection.name}
                                <span className="ml-2 text-xs opacity-75">
                                    ({collection.card_count})
                                </span>
                            </button>
                        </CollectionDropZone>
                    })}
                </div>

                {/* Правая кнопка прокрутки */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}