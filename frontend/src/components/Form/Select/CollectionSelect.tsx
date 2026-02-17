import React, {useState, useEffect} from 'react';
import Select, {StylesConfig, MultiValue, ActionMeta} from 'react-select';
import {Collection} from "@store/store.ts";

interface CollectionSelectProps {
    collections: Collection[];
    collectionsLoading: boolean;
    selectedCollections: Collection[];
    onCollectionsChange: (collections: Collection[]) => void;
    t: (key: string) => string;
    label?: string;
    className?: string;
    disabled?: boolean;
}

interface SelectOption {
    value: string | number;
    label: string;
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({
                                                               collections,
                                                               collectionsLoading,
                                                               selectedCollections,
                                                               onCollectionsChange,
                                                               t,
                                                               label = t('createCard.collections'),
                                                               className = '',
                                                               disabled = false
                                                           }) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    // Преобразуем коллекции в опции для react-select
    useEffect(() => {
        const collectionOptions = collections.map(collection => ({
            value: collection.id,
            label: `${collection.name}${collection.access_type === 'public' ? ' 🌎' : ''}`
        }));
        setOptions(collectionOptions);
    }, [collections]);

    // Преобразуем выбранные коллекции в формат react-select
    const selectedOptions = selectedCollections.map(collection => ({
        value: collection.id,
        label: `${collection.name}${collection.access_type === 'public' ? ' 🌎' : ''}`
    }));

    const handleChange = (
        newValue: MultiValue<SelectOption>,
        _actionMeta: ActionMeta<SelectOption>
    ) => {
        const selectedCollectionIds = newValue.map(option => option.value);
        const selected = collections.filter(collection =>
            selectedCollectionIds.includes(collection.id)
        );
        onCollectionsChange(selected);
    };

    const handleRemoveCollection = (collectionId: string | number) => {
        const filtered = selectedCollections.filter(c => c.id !== collectionId);
        onCollectionsChange(filtered);
    };

    // Кастомизация стилей
    const customStyles: StylesConfig<SelectOption, true> = {
        control: (base, state) => ({
            ...base,
            minHeight: '48px',
            borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
            borderRadius: '0.5rem',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.1)' : 'none',
            '&:hover': {
                borderColor: '#9ca3af'
            }
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#dbeafe',
            borderRadius: '9999px',
            padding: '2px 8px'
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#1e40af',
            fontWeight: '500'
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#3b82f6',
            '&:hover': {
                backgroundColor: '#93c5fd',
                color: '#1e40af'
            }
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#f0f9ff' : 'white',
            color: state.isSelected ? '#1e40af' : '#374151',
            '&:active': {
                backgroundColor: '#bfdbfe'
            }
        })
    };

    // Если нет коллекций
    if (!collectionsLoading && collections.length === 0) {
        return (
            <div className={className}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(label) || 'Коллекции'}
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">
                        {t('createCard.noCollectionsAvailable') || 'Нет доступных коллекций'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(label) || 'Коллекции'}
            </label>

            {collectionsLoading ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">
                        {t('common.loading') || 'Загрузка...'}
                    </p>
                </div>
            ) : (
                <>
                    <Select
                        isMulti
                        options={options}
                        value={selectedOptions}
                        onChange={handleChange}
                        placeholder={t('createCard.selectCollections') || 'Выберите коллекции...'}
                        noOptionsMessage={() => t('createCard.noCollectionsAvailable') || 'Нет доступных коллекций'}
                        styles={customStyles}
                        isDisabled={disabled}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />

                    {/* Показываем выбранные коллекции как теги */}
                    {selectedCollections.length > 0 && (
                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                                {selectedCollections.map((collection) => (
                                    <div
                                        key={collection.id}
                                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-800"
                                    >
                                        {collection.name}
                                        {collection.access_type === 'public' && ' 🌎'}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveCollection(collection.id)}
                                            className="ml-2 text-blue-600 hover:text-blue-800 text-lg leading-none"
                                            disabled={disabled}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CollectionSelect;