import React, {useState, useEffect} from 'react';
import Select, {StylesConfig, OptionProps, components, MultiValue, ActionMeta} from 'react-select';
import {useNavigate} from 'react-router-dom';
import {Collection} from "@store/card/cardSlice.ts";

interface CollectionSelectProps {
    collections: Collection[];
    collectionsLoading: boolean;
    selectedCollections: Collection[]; // Изменено: передаем объекты коллекций
    onCollectionsChange: (collections: Collection[]) => void;
    onCreateCollection?: (name: string) => Promise<Collection | void>;
    t: (key: string) => string;
    label?: string;
    className?: string;
    disabled?: boolean;
}

interface SelectOption {
    value: string | number;
    label: string;
    // isNew?: boolean;
    // data?: Collection;
}

const CollectionSelect: React.FC<CollectionSelectProps> = ({
                                                               collections,
                                                               collectionsLoading,
                                                               selectedCollections,
                                                               onCollectionsChange,
                                                               onCreateCollection,
                                                               t,
                                                               label = t('createCard.collections'),
                                                               className = '',
                                                               disabled = false
                                                           }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    // Преобразуем коллекции в опции для react-select
    useEffect(() => {
        const collectionOptions = collections.map(collection => ({
            value: collection.id,
            label: `${collection.name}${collection.access_type === 'public' ? ' 🌐' : ''}`,
            data: collection
        }));
        setOptions(collectionOptions);
    }, [collections]);

    // Преобразуем выбранные коллекции в формат react-select
    const selectedOptions = selectedCollections.map(collection => ({
        value: collection.id,
        label: `${collection.name}${collection.access_type === 'public' ? ' 🌐' : ''}`,
        data: collection
    }));

    const handleCreateCollection = async (inputValue: string) => {
        if (!inputValue.trim() || !onCreateCollection) return;

        setIsCreating(true);
        try {
            const newCollection = await onCreateCollection(inputValue.trim());
            if (newCollection) {
                // Добавляем новую коллекцию в список
                // const newOption = {
                //     value: newCollection.id,
                //     label: `${newCollection.name}${newCollection.access_type === 'public' ? ' 🌐' : ''}`,
                //     data: newCollection
                // };

                // Добавляем новую коллекцию в выбранные
                onCollectionsChange([...selectedCollections, newCollection]);
                setInputValue('');
            }
        } catch (error) {
            console.error('Ошибка при создании коллекции:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleChange = (
        newValue: MultiValue<SelectOption>,
        actionMeta: ActionMeta<SelectOption>
    ) => {
        const selectedCollectionIds = newValue.map(option => option.value);

        if (actionMeta.action === 'select-option'
            // && actionMeta.option?.isNew
        ) {
            // Если выбрана опция "Создать новую"
            handleCreateCollection(inputValue);
        } else {
            // Обычный выбор существующей коллекции
            const selected = collections.filter(collection =>
                selectedCollectionIds.includes(collection.id)
            );
            onCollectionsChange(selected);
        }
    };

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
    };

    const handleRemoveCollection = (collectionId: string | number) => {
        const filtered = selectedCollections.filter(c => c.id !== collectionId);
        onCollectionsChange(filtered);
    };

    // Фильтруем опции по вводу пользователя
    const getFilteredOptions = () => {
        if (!inputValue.trim()) {
            return options;
        }

        const input = inputValue.toLowerCase();
        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(input)
        );

        // Проверяем, есть ли уже коллекция с таким именем
        // const exists = options.some(option =>
        //     option.data?.name.toLowerCase() === input.toLowerCase()
        // );
        //
        // // Если коллекции с таким именем нет, добавляем опцию для создания
        // if (!exists && inputValue.trim() && onCreateCollection) {
        //     return [
        //         ...filtered,
        //         {
        //             value: 'create-new',
        //             label: `${t('createCard.createCollectionWithName') || 'Создать'}: "${inputValue}"`,
        //             isNew: true
        //         }
        //     ];
        // }

        return filtered;
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

    // Кастомный компонент для отображения опции
    const CustomOption = (props: OptionProps<SelectOption, true>) => {
        return (
            <components.Option {...props}>
                {false ? (
                    <div className="flex items-center text-green-600">
                        <span className="mr-2">+</span>
                        {props.data.label}
                    </div>
                ) : (props.children)}
            </components.Option>
        );
    };

    // Если нет коллекций и не загружаются
    if (!collectionsLoading && collections.length === 0) {
        return (
            <div className={className}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(label) || 'Коллекции'}
                    <span className="text-gray-400 ml-1">
          </span>
                </label>
                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">
                        {t('createCard.noCollections') || 'У вас пока нет коллекций'}
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/collections/create')}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        {t('createCard.createCollection') || 'Создать коллекцию'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(label) || 'Коллекции'}
                <span className="text-gray-400 ml-1">
          ({t('createCard.optional') || 'необязательно'})
        </span>
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
                        options={getFilteredOptions()}
                        value={selectedOptions}
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        inputValue={inputValue}
                        isLoading={isCreating}
                        loadingMessage={() => t('common.creating') || 'Создание...'}
                        placeholder={t('createCard.selectCollections') || 'Выберите коллекции...'}
                        noOptionsMessage={() => t('createCard.typeToCreate') || 'Введите название для создания новой коллекции'}
                        components={{Option: CustomOption}}
                        styles={customStyles}
                        isDisabled={disabled || isCreating}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />

                    {/* Показываем выбранные коллекции как теги */}
                    {selectedCollections.length > 0 && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-2">
                                {t('createCard.selectedCollections') || 'Выбранные коллекции:'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {selectedCollections.map((collection) => (
                                    <div
                                        key={collection.id}
                                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-800"
                                    >
                                        {collection.name}
                                        {collection.access_type === 'public' && ' 🌐'}
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

                    <p className="mt-2 text-xs text-gray-500">
                        {t('createCard.collectionsHint') ||
                            'Начните вводить название для поиска или создания новой коллекции'}
                    </p>
                </>
            )}
        </div>
    );
};

export default CollectionSelect;