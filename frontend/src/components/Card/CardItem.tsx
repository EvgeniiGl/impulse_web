import {useNavigate} from 'react-router-dom';
import {Card} from "@store/store.ts";
import {useState, useRef, useEffect} from 'react';
import {LiaSignatureSolid} from "react-icons/lia";
import {MdOutlineSchedule} from "react-icons/md";
import {IoCloseCircleOutline, IoTrashOutline} from "react-icons/io5";
import {ScheduleForm} from '@/components/Notifications/ScheduleForm';
import {useAppDispatch, useAppSelector} from '@store/store.ts';
import {closeScheduleForm, toggleScheduleForm, deleteCard} from '@store/card/myCardSlice.ts';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '@/types/dnd';

interface CardItemProps {
    card: Card;
    onDrop?: (cardId: string, targetCollectionId: string | null, sourceCollectionId: string | null) => void;
}

export default function CardItem({card, onDrop}: CardItemProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const openScheduleCardId = useAppSelector(state => state.myCards.openScheduleCardId);
    const currentCollectionId = useAppSelector(state => state.myCards.selectedCollectionId);

    const [imageError, setImageError] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const scheduleRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [hasDescriptionScroll, setHasDescriptionScroll] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);

    const isScheduleOpen = openScheduleCardId === card.id;

    // Настройка drag
    const [{isDragging}, drag] = useDrag(() => {
        return {
            type: ItemTypes.CARD,
            item: {
                id: card.id,
                collectionIds: card.collectionIds || [],
                sourceCollectionId: card.collectionIds || [],
            },
            end: (item, monitor) => {

                const dropResult = monitor.getDropResult() as { collectionId: string | null } | null;
                if (item && dropResult && onDrop) {
                    // onDrop(item.id, dropResult.collectionId);
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }
    }, [card.id, card.collectionIds]);

    // Объединяем refs
    const setRefs = (element: HTMLDivElement | null) => {
        drag(element);
    };
    // Закрытие описания и формы уведомлений при клике вне области карточки
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                (isDescriptionOpen || isScheduleOpen) &&
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsDescriptionOpen(false);
                if (isScheduleOpen) {
                    dispatch(closeScheduleForm());
                }
                if (descriptionRef.current) {
                    descriptionRef.current.scrollTop = 0;
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDescriptionOpen, isScheduleOpen, dispatch]);

    // Проверяем, есть ли прокрутка у описания
    useEffect(() => {
        const checkDescriptionScroll = () => {
            if (descriptionRef.current) {
                const element = descriptionRef.current;
                if (isDescriptionOpen && element.scrollHeight > 0) {
                    const hasVerticalScroll = element.scrollHeight > element.clientHeight;
                    setHasDescriptionScroll(hasVerticalScroll);
                } else {
                    setHasDescriptionScroll(false);
                }
            }
        };

        const timeout = setTimeout(checkDescriptionScroll, 300);
        const resizeObserver = new ResizeObserver(checkDescriptionScroll);
        if (descriptionRef.current) {
            resizeObserver.observe(descriptionRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isDescriptionOpen, card.description]);

    useEffect(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setCardHeight(rect.height)
        }
    }, []);

    const handleDescriptionToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isScheduleOpen) {
            dispatch(closeScheduleForm());
        }
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    const handleScheduleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDescriptionOpen(false);
        dispatch(toggleScheduleForm(card.id));
    };

    // const handleCloseDescription = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    //     setIsDescriptionOpen(false);
    //     if (descriptionRef.current) {
    //         descriptionRef.current.scrollTop = 0;
    //     }
    // };

    const handleCloseSchedule = () => {
        dispatch(closeScheduleForm());
        setIsDescriptionOpen(false);
    };

    const handleScheduleSuccess = () => {
        dispatch(closeScheduleForm());
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDescriptionOpen(false);
        if (isScheduleOpen) {
            dispatch(closeScheduleForm());
        }
        setShowDeleteConfirm(true);
    };

    // Подтверждение удаления
    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteCard({
            card: card,
            collectionId: currentCollectionId
        }));
        setShowDeleteConfirm(false);
    };

    // Отмена удаления
    const handleCancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteConfirm(false);
    };

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
            if (target.closest('button') === null) {
                navigate(`/card/${card.id}`);
            }
        }
    };

    return (
        <div key={card.id}>
            <div
                onClick={handleCardClick}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
                ref={cardRef}
                style={{touchAction: 'none'}}
            >
                {/* Контейнер с фиксированным соотношением 9:16 (вертикальное) */}
                <div className="relative w-full bg-gray-200 overflow-hidden"
                     style={{aspectRatio: '9/16'}}>
                    <div
                        className={`absolute inset-0 flex items-center justify-center cursor-${isDragging ? 'grabbing' : 'grab'} ${isDragging ? 'opacity-50 scale-105 rotate-1 shadow-2xl' : ''}`}
                        ref={setRefs}>
                        {card.url && !imageError ? (
                            <img
                                src={card.url}
                                alt={card.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                                loading="lazy"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                        )}

                        {card.show_title_on_image &&
                            <div
                                className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-10">
                                <div className="text-center group">
                                    <h3 className="font-['Pacifico'] text-white text-3xl md:text-4xl
                       drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]
                       mb-3 transition-all duration-300
                       group-hover:text-[var(--color-primary-light2)]">
                                        {card.title}
                                    </h3>

                                    <div className="w-16 h-0.5 mx-auto
                      bg-gradient-to-r from-transparent via-white to-transparent
                      transition-all duration-500 ease-in-out
                      group-hover:w-44
                      group-hover:via-[var(--color-primary-light2)]">
                                    </div>

                                    <div className="w-8 h-0.5 mx-auto mt-1
                      bg-white/40 blur-sm
                      transition-all duration-700 ease-in-out
                      group-hover:w-36
                      group-hover:bg-[var(--color-primary-light2)]/40">
                                    </div>
                                </div>
                            </div>}
                    </div>
                    {/* Статус доступа поверх изображения снизу слева - z-index 20 */}
                    <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-lg ${
                            card.access_type === 'private'
                                ? 'bg-[var(--color-white)] text-[var(--text-primary)] border border-[var(--text-primary)]'
                                : 'bg-[var(--color-primary)] text-white'
                        }`}>
                            {card.access_type === 'public'
                                ? 'Публичная'
                                : card.access_type === 'shared'
                                    ? 'Общая'
                                    : 'Приватная'}
                        </span>
                    </div>

                    {/* Кнопка уведомлений рядом с кнопкой описания - z-index 30 */}
                    <button
                        onClick={handleScheduleToggle}
                        className="absolute bottom-3 right-21 z-30 rounded-full hover:bg-black/80 transition-colors shadow-lg"
                        style={{
                            padding: '3px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: '1px solid var(--color-white)',
                        }}
                        title={isScheduleOpen ? "Скрыть уведомления" : "Настроить уведомления"}
                    >
                        <MdOutlineSchedule className="w-3.5 h-3.5"/>
                    </button>

                    {/* Кнопка описания снизу справа - z-index 30 */}
                    <button
                        onClick={handleDescriptionToggle}
                        className="absolute bottom-3 right-12 z-30 rounded-full hover:bg-black/80 transition-colors shadow-lg flex items-center gap-1"
                        style={{
                            padding: '3px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: '1px solid var(--color-white)',
                        }}
                        title={isDescriptionOpen ? "Скрыть описание" : "Показать описание"}
                    >
                        <LiaSignatureSolid className="w-3.5 h-3.5"/>
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="absolute bottom-3 right-3 z-30 rounded-full hover:bg-red-600/80 transition-colors shadow-lg"
                        style={{
                            padding: '3px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            border: '1px solid var(--color-white)',
                        }}
                        title="Удалить карточку"
                    >
                        <IoTrashOutline className="w-3.5 h-3.5"/>
                    </button>

                    {/* Описание, которое появляется при клике - z-index 40 (выше кнопок) */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
                            isDescriptionOpen ? 'opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{zIndex: 40}}
                    >
                        <div className="bg-[var(--color-primary)] text-white h-full flex flex-col relative">
                            {/* Крестик для закрытия */}
                            <div
                                onClick={handleCloseSchedule}
                                className="absolute top-2 right-2 z-50 rounded-full p-1"
                                style={{color: 'white'}}
                                title="Закрыть"
                            >
                                <IoCloseCircleOutline
                                    className="w-5 h-5"/>
                            </div>

                            <div className="p-4 h-full flex flex-col">
                                <p className="text-sm font-medium mb-2 flex-shrink-0 text-[var(--color-primary-light2)]">
                                    Описание:
                                </p>
                                <div
                                    ref={descriptionRef}
                                    className={`text-sm leading-relaxed pr-2 flex-1 overflow-y-auto scrollbar-custom ${
                                        hasDescriptionScroll ? 'scrollbar-thin' : ''
                                    }`}
                                    style={{
                                        maxHeight: cardHeight / 100 * 80,
                                        transition: 'max-height 0.3s ease-in-out',
                                        paddingBottom: '20px',
                                        color: 'var(--text-white)'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {card.description || 'Нет описания'}
                                </div>

                                {/* Индикатор прокрутки для длинных текстов */}
                                {hasDescriptionScroll && (
                                    <div
                                        className="absolute bottom-3 right-3 text-xs text-white/50 flex items-center gap-1 pointer-events-none">
                                        {descriptionRef.current?.scrollTop && descriptionRef.current.scrollTop > 0 && (
                                            <span className="animate-bounce">↑</span>
                                        )}
                                        {descriptionRef.current &&
                                            descriptionRef.current.scrollTop <
                                            (descriptionRef.current.scrollHeight - descriptionRef.current.clientHeight - 10) && (
                                                <span className="animate-bounce">↓</span>
                                            )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Форма уведомлений, которая появляется при клике - z-index 40 (выше кнопок) */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
                            isScheduleOpen ? 'opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{zIndex: 40}}
                    >
                        <div className="bg-[var(--color-primary)] text-white h-full flex flex-col relative">
                            {/* Крестик для закрытия */}
                            <div
                                onClick={handleCloseSchedule}
                                className="absolute top-2 right-2 z-50 rounded-full p-1"
                                style={{color: 'white'}}
                                title="Закрыть"
                            >
                                <IoCloseCircleOutline
                                    className="w-5 h-5"/>
                            </div>

                            <div className="p-4 h-full flex flex-col cursor-default">
                                <div
                                    ref={scheduleRef}
                                    className="flex-1 overflow-y-auto scrollbar-custom scrollbar-thin"
                                    style={{
                                        maxHeight: cardHeight / 100 * 80,
                                        color: 'var(--text-white)'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ScheduleForm
                                        cardId={card.id}
                                        onSuccess={handleScheduleSuccess}
                                        onCancel={handleCloseSchedule}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Подтверждение удаления - z-index 40 */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
                            showDeleteConfirm ? 'opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{zIndex: 40}}
                    >
                        <div
                            className="bg-[var(--color-primary)] text-white h-full flex flex-col items-center justify-center p-4"
                            style={{minHeight: '150px'}}>
                            <p className="text-center mb-4 font-medium">
                                {currentCollectionId
                                    ? 'Удалить карточку из этой коллекции?'
                                    : 'Удалить карточку полностью?'}
                            </p>
                            <p className="text-center text-sm mb-4 text-red-100">
                                {currentCollectionId
                                    ? 'Карточка останется в других коллекциях'
                                    : 'Карточка будет удалена безвозвратно'}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                                >
                                    Удалить
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    className="px-4 py-2 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}