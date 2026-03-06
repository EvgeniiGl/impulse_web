import {useTranslation} from 'react-i18next';
import css from './CollectionList.module.css';
import {Collection} from '@store/store.ts';
import {deleteCollection} from "@store/card/myCardSlice.ts";
import {useAppDispatch} from "@store/store.ts";
import {useState} from "react";

interface CollectionTabsProps {
    collections: Collection[];
    isLoading: boolean;
}

export default function CollectionList({
                                           collections,
                                           isLoading,
                                       }: CollectionTabsProps) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (e: React.MouseEvent, collectionId: string) => {
        e.stopPropagation();
        if (window.confirm(t('collections.confirmDelete') || 'Удалить коллекцию?')) {
            setDeletingId(collectionId);
            await dispatch(deleteCollection(collectionId));
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"/>
                ))}
            </div>
        );
    }

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                <div
                    className={`px-4 py-2 rounded-lg font-medium transition ${css.tabBtn}`}
                >
                    {t('collections.general') || 'Общая'}
                </div>

                {collections.map((collection) => (
                    <div
                        key={collection.id}
                        className={`relative group px-4 py-2 rounded-lg font-medium transition ${css.tabBtn}`}
                    >
                        <span className={deletingId === collection.id ? 'opacity-50' : ''}>
                            {collection.name}
                            <span className="ml-2 text-xs opacity-75">
                                ({collection.card_count})
                            </span>
                        </span>
                        <button
                            onClick={(e) => handleDelete(e, collection.id)}
                            disabled={deletingId === collection.id}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            title={t('collections.delete') || 'Удалить'}
                        >
                            {deletingId === collection.id ? '...' : '×'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}