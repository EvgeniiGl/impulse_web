import {useRef, useState, useEffect, useCallback} from 'react';
import css from './CollectionTabs.module.css';
import {Collection} from "@store/store.ts";
import CollectionDropZone from './CollectionDropZone';
import {LIKED} from "@/constants/collections.ts";

interface CollectionTabsProps {
    collections: Collection[];
    selectedId: string;
    onSelect: (id: string) => void;
    isLoading: boolean;
    onCardDrop?: (cardId: string, targetCollectionId: string, sourceCollectionId: string) => void;
}

export default function CollectionTabs({
                                           collections,
                                           selectedId,
                                           onSelect,
                                           isLoading,
                                           onCardDrop
                                       }: CollectionTabsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        // ResizeObserver следит за изменением размера самого контейнера
        const ro = new ResizeObserver(checkScroll);
        if (scrollContainerRef.current) ro.observe(scrollContainerRef.current);
        return () => {
            window.removeEventListener('resize', checkScroll);
            ro.disconnect();
        };
    }, [collections, checkScroll]);

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (!el) return;
        el.scrollBy({left: direction === 'left' ? -200 : 200, behavior: 'smooth'});
        setTimeout(checkScroll, 300);
    };

    if (isLoading) {
        return (
            <div className={css.skeleton}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={css.skeletonItem}/>
                ))}
            </div>
        );
    }

    return (
        <div className={css.wrapper}>
            {/* Кнопка прокрутки влево */}
            {canScrollLeft && (
                <button
                    className={css.scrollBtn}
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
            )}

            {/* Контейнер со скроллом — ключевые свойства в CSS-модуле */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className={css.scrollContainer}
            >
                {collections.map((collection) => {
                    const isDropActive = collection.id !== LIKED && selectedId !== collection.id;

                    return (
                        <CollectionDropZone
                            key={collection.id}
                            collectionId={collection.id}
                            onCardDrop={onCardDrop}
                            isActive={isDropActive}
                        >
                            <button
                                onClick={() => onSelect(collection.id)}
                                className={`${css.tabBase} ${
                                    selectedId === collection.id
                                        ? css.tabBtnActive
                                        : css.tabBtn
                                }`}
                            >
                                {collection.name}
                                <span className={css.count}>
                                    ({collection.card_count})
                                </span>
                            </button>
                        </CollectionDropZone>
                    );
                })}
            </div>

            {/* Кнопка прокрутки вправо */}
            {canScrollRight && (
                <button
                    className={css.scrollBtn}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            )}
        </div>
    );
}