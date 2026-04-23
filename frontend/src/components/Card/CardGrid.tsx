// components/Card/CardGrid.tsx
import CardItem from './CardItem';
import {useEffect} from 'react';
import {Card, useAppSelector} from "@store/store.ts";

interface CardGridProps {
    cards: Card[];
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
    onCardDrop?: (cardId: string, targetCollectionId: string, sourceCollectionId: string) => void;
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
                    {[...Array(3)].map((_, i) => (
                        <div key={`skeleton-${i}`}>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                                <div className="relative w-full overflow-clip" style={{aspectRatio: '9/16'}}>
                                    <div className="w-full h-full bg-gray-300 animate-pulse"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}