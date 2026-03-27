import React, {useEffect} from 'react';
import {IoHeartOutline, IoHeart} from 'react-icons/io5';
import {useAppDispatch, useAppSelector} from '@store/store';
import {toggleCollectionLike, fetchCollectionLikeStatus} from '@store/like/likeSlice';

interface CollectionLikeButtonProps {
    collectionId: string;
    className?: string;
    showCount?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const CollectionLikeButton: React.FC<CollectionLikeButtonProps> = ({
    collectionId,
    className = '',
    showCount = true,
    size = 'md'
}) => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const likeData = useAppSelector(state => state.likes.collectionLikes[collectionId]);
    const isLoading = useAppSelector(state => state.likes.loadingCollections[collectionId]);

    const liked = likeData?.liked ?? false;
    const likesCount = likeData?.likesCount ?? 0;

    // Загружаем статус лайка при монтировании
    useEffect(() => {
        if (!likeData) {
            dispatch(fetchCollectionLikeStatus(collectionId));
        }
    }, [collectionId, dispatch, likeData]);

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isAuthenticated) {
            return;
        }

        if (isLoading) return;

        dispatch(toggleCollectionLike(collectionId));
    };

    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-7 h-7'
    };

    const iconSize = {
        sm: 16,
        md: 20,
        lg: 24
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`
                flex items-center gap-1 
                transition-all duration-200 
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${liked ? 'text-red-500' : 'text-gray-600 hover:text-red-400'}
                ${className}
            `}
            title={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
            <span className={`${sizeClasses[size]} flex items-center justify-center`}>
                {liked ? (
                    <IoHeart 
                        size={iconSize[size]} 
                        className="transition-transform duration-200 hover:scale-110"
                    />
                ) : (
                    <IoHeartOutline 
                        size={iconSize[size]} 
                        className="transition-transform duration-200 hover:scale-110"
                    />
                )}
            </span>
            {showCount && likesCount > 0 && (
                <span className={`
                    font-medium
                    ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
                `}>
                    {likesCount}
                </span>
            )}
        </button>
    );
};

export default CollectionLikeButton;
