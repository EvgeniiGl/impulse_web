// components/Card/CardGrid.tsx
import CardItem from './CardItem';
import {useEffect} from 'react';
import {Card, useAppSelector} from "@store/store.ts";

interface CardGridProps {
    cards: Card[];
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
    onCardDrop?: (cardId: string, targetCollectionId: string | null, sourceCollectionId: string | null) => void;
    showAccessType?: boolean;
}

export default function CardGrid({
                                     cards,
                                     isLoading,
                                     onLoadMore,
                                     hasMore,
                                     onCardDrop,
                                     showAccessType = true
                                 }: CardGridProps) {
    const hiddenCardIds = useAppSelector(state => state.report.hiddenCardIds);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;

            if (docHeight - (scrollTop + winHeight) < 500 && !isLoading && hasMore) {
                onLoadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, hasMore, onLoadMore]);

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
            {cards
                .filter(card => !hiddenCardIds.includes(card.id)).map((card) => (
                    <div key={card.id}>
                        <CardItem
                            card={card}
                            onDrop={onCardDrop}
                            showAccessType={showAccessType}
                        />
                    </div>
                ))}
            {isLoading && (
                <>
                    {[...Array(4)].map((_, i) => (
                        <div key={`skeleton-${i}`} className="rounded-lg animate-pulse flex flex-col">
                            <div className="w-full" style={{aspectRatio: '9/20'}}>
                                <div className="w-full h-full bg-gray-300"/>
                            </div>
                            <div className="p-3 space-y-2 flex-1 flex flex-col">
                                <div className="h-4 bg-gray-300 rounded w-3/4"/>
                                <div className="h-3 bg-gray-300 rounded w-1/2 mt-auto"/>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}