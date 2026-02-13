import {Card} from "@store/card/cardSlice.ts";
import CardItem from './CardItem';
import {useEffect} from 'react';

interface CardGridProps {
    cards: Card[];
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
}

export default function CardGrid({cards, isLoading, onLoadMore, hasMore}: CardGridProps) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cards.map((card) => (
                <CardItem card={card}/>
            ))}
            {isLoading && (
                <>
                    {[...Array(4)].map((_, i) => (
                        <div key={`skeleton-${i}`} className="bg-gray-200 rounded-lg h-48 animate-pulse"/>
                    ))}
                </>
            )}
        </div>
    );
}