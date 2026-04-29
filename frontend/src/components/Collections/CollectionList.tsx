import {useTranslation} from 'react-i18next';
import css from './CollectionList.module.css';
import {Collection} from '@store/store.ts';
import {deleteCollection} from "@store/card/myCardSlice.ts";
import {useAppDispatch} from "@store/store.ts";

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

    const handleDelete = async (e: React.MouseEvent, collectionId: string) => {
        e.stopPropagation();
        if (window.confirm(t('collections.confirmDelete') || 'Удалить коллекцию?')) {
            await dispatch(deleteCollection(collectionId));
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-10 w-24 rounded-lg animate-pulse"/>
                ))}
            </div>
        );
    }

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-3">
                {collections.map((collection) => (
                    <div
                        key={collection.id}
                        className={`relative group px-4 py-2 rounded-lg font-medium transition ${css.tabBtn}`}
                    >
                        <span className={''}>
                            {collection.name}
                            <span className="ml-2 text-xs opacity-75">
                                ({collection.card_count})
                            </span>
                        </span>
                        {collection.id !== 'common' && collection.id !== 'liked' && <button
                            onClick={(e) => handleDelete(e, collection.id)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            title={t('collections.delete') || 'Удалить'}
                        >
                            ×
                        </button>}
                    </div>
                ))}
            </div>
        </div>
    );
}