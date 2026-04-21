import React from 'react';
import {IoHeartOutline, IoHeart} from 'react-icons/io5';
import {useAppDispatch, useAppSelector} from '@store/store';
import {toggleCardLike} from '@store/like/likeSlice';

interface LikeButtonProps {
    cardId: string;
    className?: string;
    showCount?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const LikeButton: React.FC<LikeButtonProps> = ({
                                                          cardId,
                                                          className = '',
                                                          showCount = false
                                                      }) => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const likeData = useAppSelector(state => state.likes.cardLikes[cardId]);
    const isLoading = useAppSelector(state => state.likes.loadingCards[cardId]);

    const liked = likeData?.liked ?? false;
    const likesCount = likeData?.likesCount ?? 0;

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isAuthenticated) {
            // Можно показать модалку авторизации или редирект
            return;
        }

        if (isLoading) return;

        dispatch(toggleCardLike(cardId));
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`rounded-full hover:bg-black/80 transition-colors shadow-lg ${className}`}
            style={{
                padding: '3px',
                borderRadius: '50%',
                backgroundColor: liked ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.5)',
                color: 'white',
                border: liked ? '1px solid #fff' : '1px solid var(--color-white)',
                opacity: isLoading ? 0.5 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
            title={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
            <span className="flex items-center justify-center">
                {liked ? (
                    <IoHeart className="w-3.5 h-3.5"
                             style={{color: liked ? '#fff' : 'rgba(0,0,0,0.5)'}}
                    />
                ) : (
                    <IoHeartOutline className="w-3.5 h-3.5"/>
                )}
            </span>
            {showCount && likesCount > 0 && (
                <span className="text-xs ml-1">{likesCount}</span>
            )}
        </button>
    );
};

export default LikeButton;
