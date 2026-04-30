import {useRef, useState, useEffect, useCallback} from 'react';
import css from './CollectionTabs.module.css';
import {Collection} from '@store/store.ts';
import CollectionDropZone from './CollectionDropZone';
import {LIKED} from '@/constants/collections.ts';

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
                                           onCardDrop,
                                       }: CollectionTabsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // Refs to the <button> elements keyed by collection id
    const tabRefsRef = useRef<Record<string, HTMLButtonElement | null>>({});

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
        const ro = new ResizeObserver(checkScroll);
        if (scrollContainerRef.current) ro.observe(scrollContainerRef.current);
        return () => {
            window.removeEventListener('resize', checkScroll);
            ro.disconnect();
        };
    }, [collections, checkScroll]);

    // ── Center active tab in the scroll container ──────────────────────────────
    // We manually compute scrollLeft instead of using scrollIntoView because
    // scrollIntoView can scroll the entire page, not just the container.
    // We walk up the offsetParent chain from the button to the scroll container
    // to get the true accumulated offsetLeft regardless of intermediate wrappers
    // (CollectionDropZone, flex children, etc.).
    const centerActiveTab = useCallback((animated: boolean) => {
        const container = scrollContainerRef.current;
        const btn = tabRefsRef.current[selectedId];
        if (!container || !btn) return;

        // Walk offsetParent chain to accumulate true offset relative to container
        let left = 0;
        let el: HTMLElement | null = btn;
        while (el && el !== container) {
            left += el.offsetLeft;
            el = el.offsetParent as HTMLElement | null;
        }

        const target = left + btn.offsetWidth / 2 - container.clientWidth / 2;
        let clamped = Math.max(0, Math.min(target, container.scrollWidth - container.clientWidth));
        if (target - clamped < 200) {
            clamped -= 300
        }

        container.scrollTo({
            left: clamped,
            behavior: animated ? 'smooth' : 'instant',
        });
    }, [selectedId]);

    // Center with animation whenever the active tab changes
    useEffect(() => {
        const raf1 = requestAnimationFrame(() => {
            const raf2 = requestAnimationFrame(() => {
                centerActiveTab(true);
                checkScroll();
            });
            return () => cancelAnimationFrame(raf2);
        });
        return () => cancelAnimationFrame(raf1);
    }, [selectedId, centerActiveTab, checkScroll]);

    // Center without animation on initial collections load (once per collections change)
    const initializedForRef = useRef<Collection[] | null>(null);
    useEffect(() => {
        if (collections.length === 0) return;
        if (initializedForRef.current === collections) return;
        initializedForRef.current = collections;

        const raf1 = requestAnimationFrame(() => {
            const raf2 = requestAnimationFrame(() => {
                centerActiveTab(false);
                checkScroll();
            });
            return () => cancelAnimationFrame(raf2);
        });
        return () => cancelAnimationFrame(raf1);
    }, [collections, centerActiveTab, checkScroll]);

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
            {/* Scroll-left button */}
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

            {/* Scrollable tab strip */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className={css.scrollContainer}
            >
                {collections.map((collection) => {
                    const isActive = selectedId === collection.id;
                    const isDropActive = collection.id !== LIKED && !isActive;

                    return (
                        <CollectionDropZone
                            key={collection.id}
                            collectionId={collection.id}
                            onCardDrop={onCardDrop}
                            isActive={isDropActive}
                        >
                            <button
                                ref={(el) => {
                                    tabRefsRef.current[collection.id] = el;
                                }}
                                onClick={() => onSelect(collection.id)}
                                className={`${css.tabBase} ${
                                    isActive ? css.tabBtnActive : css.tabBtn
                                }`}
                            >
                                {collection.name}
                                <span className={css.count}>({collection.card_count})</span>
                            </button>
                        </CollectionDropZone>
                    );
                })}
            </div>

            {/* Scroll-right button */}
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