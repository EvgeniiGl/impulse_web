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
    const tabRefsRef = useRef<Record<string, HTMLButtonElement | null>>({});

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    // ── Drag-to-scroll state ───────────────────────────────────────────────────
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef(0);
    const dragScrollLeftRef = useRef(0);
    // Threshold in px — below this the mouseup is treated as a click, not a drag
    const DRAG_THRESHOLD = 5;
    const dragMovedRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

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

    // ── Mouse wheel horizontal scroll ─────────────────────────────────────────
    // We attach via useEffect with { passive: false } so we can call
    // preventDefault() and prevent the page from scrolling vertically.
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            // Only intercept when the cursor is actually over the scroll container
            if (!el.contains(e.target as Node)) return;
            // If the container has no overflow to scroll, let the event propagate
            if (el.scrollWidth <= el.clientWidth) return;

            e.preventDefault();
            // deltaY for vertical wheel, deltaX for horizontal trackpad swipe
            const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            el.scrollBy({left: delta * 1.5, behavior: 'auto'});
            checkScroll();
        };

        el.addEventListener('wheel', onWheel, {passive: false});
        return () => el.removeEventListener('wheel', onWheel);
    }, [checkScroll]);

    // ── Drag-to-scroll ─────────────────────────────────────────────────────────
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        // Only left button
        if (e.button !== 0) return;
        const el = scrollContainerRef.current;
        if (!el) return;

        isDraggingRef.current = true;
        dragMovedRef.current = false;
        dragStartXRef.current = e.clientX;
        dragScrollLeftRef.current = el.scrollLeft;
        setIsDragging(true);

        // Prevent text selection while dragging
        e.preventDefault();
    }, []);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            const el = scrollContainerRef.current;
            if (!el) return;

            const dx = e.clientX - dragStartXRef.current;
            if (Math.abs(dx) > DRAG_THRESHOLD) {
                dragMovedRef.current = true;
            }
            el.scrollLeft = dragScrollLeftRef.current - dx;
            checkScroll();
        };

        const onMouseUp = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            setIsDragging(false);
            // Сбрасываем флаг перемещения после того, как успеет сработать onClick
            setTimeout(() => {
                dragMovedRef.current = false;
            }, 0);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [checkScroll]);

    // Suppress click on a tab if the user actually dragged
    const handleTabClick = useCallback(
        (id: string, e: React.MouseEvent) => {
            if (dragMovedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            onSelect(id);
        },
        [onSelect],
    );

    // ── Center active tab ──────────────────────────────────────────────────────
    const centerActiveTab = useCallback((animated: boolean) => {
        const container = scrollContainerRef.current;
        const btn = tabRefsRef.current[selectedId];
        if (!container || !btn) return;

        let left = 0;
        let el: HTMLElement | null = btn;
        while (el && el !== container) {
            left += el.offsetLeft;
            el = el.offsetParent as HTMLElement | null;
        }

        const target = left + btn.offsetWidth / 2 - container.clientWidth / 2;
        let clamped = Math.max(0, Math.min(target, container.scrollWidth - container.clientWidth));
        if (target - clamped < 200) {
            clamped -= 300;
        }

        container.scrollTo({
            left: clamped,
            behavior: animated ? 'smooth' : 'instant',
        });
    }, [selectedId]);

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

            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                onMouseDown={handleMouseDown}
                className={`${css.scrollContainer} ${isDragging ? css.scrollContainerDragging : ''}`}
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
                                onClick={(e) => handleTabClick(collection.id, e)}
                                className={`${css.tabBase} ${
                                    isActive ? css.tabBtnActive : css.tabBtn
                                }`}
                                // Prevent drag from accidentally triggering native drag
                                draggable={false}
                            >
                                {collection.name}
                                <span className={css.count}>({collection.card_count})</span>
                            </button>
                        </CollectionDropZone>
                    );
                })}
            </div>

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