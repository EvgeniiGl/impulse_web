import {useNavigate, useLocation} from 'react-router-dom';
import {Card} from "@store/store.ts";
import {useState, useRef, useEffect} from 'react';
import {LiaSignatureSolid} from "react-icons/lia";
import {MdOutlineSchedule} from "react-icons/md";
import {IoCloseCircleOutline, IoTrashOutline} from "react-icons/io5";
import {ScheduleForm} from '@/components/Notifications/ScheduleForm';
import {useAppDispatch, useAppSelector} from '@store/store.ts';
import {closeScheduleForm, toggleScheduleForm, deleteCard} from '@store/card/myCardSlice.ts';
import {submitReport} from '@store/card/reportSlice.ts';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '@/types/dnd';
import {useTranslation} from 'react-i18next';
import LikeButton from "@components/Card/LikeButton.tsx";

// Типы причин жалоб
export type ReportReason =
    | 'sexual_content'
    | 'violent_content'
    | 'hateful_content'
    | 'harassment'
    | 'harmful_actions'
    | 'self_harm'
    | 'misinformation'
    | 'child_abuse'
    | 'terrorism'
    | 'spam';

interface CardItemProps {
    card: Card;
    onDrop?: (cardId: string, targetCollectionId: string | null, sourceCollectionId: string | null) => void;
}

// SVG иконка трех точек
const ThreeDotsIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="8" cy="3" r="1.5"/>
        <circle cx="8" cy="8" r="1.5"/>
        <circle cx="8" cy="13" r="1.5"/>
    </svg>
);

export default function CardItem({card, onDrop}: CardItemProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const openScheduleCardId = useAppSelector(state => state.myCards.openScheduleCardId);
    const currentCollectionId = useAppSelector(state => state.myCards.selectedCollectionId);
    const reportLoading = useAppSelector(state => state.report.loading);

    const [imageError, setImageError] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [canDelete, setCanDelete] = useState(true);

    // Новые состояния для меню и жалоб
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);

    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const scheduleRef = useRef<HTMLDivElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [hasDescriptionScroll, setHasDescriptionScroll] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);

    const currentUser = useAppSelector(state => state.auth.user);
    const isOwner = !!(currentUser && card.creator_id === currentUser.id);

    const isScheduleOpen = openScheduleCardId === card.id;

    // Список причин для жалобы
    const reportReasons: ReportReason[] = [
        'sexual_content',
        'violent_content',
        'hateful_content',
        'harassment',
        'harmful_actions',
        'self_harm',
        'misinformation',
        'child_abuse',
        'terrorism',
        'spam'
    ];

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
                (isDescriptionOpen || isScheduleOpen || isReportOpen || isMenuOpen) &&
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsDescriptionOpen(false);
                setIsReportOpen(false);
                setIsMenuOpen(false);
                setSelectedReason(null);
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
    }, [isDescriptionOpen, isScheduleOpen, isReportOpen, isMenuOpen, dispatch]);

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
        if (location.pathname === '/') {
            setCanDelete(false)
        }
    }, []);

    const handleDescriptionToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isScheduleOpen) {
            dispatch(closeScheduleForm());
        }
        setIsReportOpen(false);
        setIsMenuOpen(false);
        setIsDescriptionOpen(!isDescriptionOpen);
    };

    const handleScheduleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDescriptionOpen(false);
        setIsReportOpen(false);
        setIsMenuOpen(false);
        dispatch(toggleScheduleForm(card.id));
    };

    const handleCloseSchedule = () => {
        dispatch(closeScheduleForm());
        setIsDescriptionOpen(false);
        setIsReportOpen(false);
        setIsMenuOpen(false);
        setSelectedReason(null);
    };

    const handleScheduleSuccess = () => {
        dispatch(closeScheduleForm());
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDescriptionOpen(false);
        setIsReportOpen(false);
        setIsMenuOpen(false);
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

    // Клик по изображению — переход на страницу карточки
    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/card/${card.id}`);
    };

    // Обработчики меню
    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isMenuOpen) {
            setIsDescriptionOpen(false);
            setIsReportOpen(false);
            if (isScheduleOpen) {
                dispatch(closeScheduleForm());
            }
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    const handleReportClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        setIsDescriptionOpen(false);
        if (isScheduleOpen) {
            dispatch(closeScheduleForm());
        }
        setIsReportOpen(true);
    };

    const handleHideClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(false);
        // TODO: Реализовать логику скрытия карточки
        console.log('Hide card:', card.id);
    };

    const handleCloseReport = () => {
        setIsReportOpen(false);
        setSelectedReason(null);
    };

    const handleReasonChange = (reason: ReportReason) => {
        setSelectedReason(reason);
    };

    const handleSubmitReport = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedReason) {
            dispatch(submitReport({
                cardId: card.id,
                reason: selectedReason
            }));
            setIsReportOpen(false);
            setSelectedReason(null);
        }
    };

    return (
        <div key={card.id}>
            <div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
                ref={cardRef}
                style={{touchAction: 'none'}}
            >
                {/* Контейнер с фиксированным соотношением 9:16 (вертикальное) */}
                <div className="relative w-full overflow-clip"
                     style={{aspectRatio: '9/16'}}>
                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-150 ${isDragging
                            ? 'opacity-40 scale-95 rotate-1 cursor-grabbing'
                            : 'cursor-grab hover:cursor-grab'}`}
                        ref={setRefs}>
                        {card.url && !imageError ? (
                            <img
                                src={card.url}
                                alt={card.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-auto select-none"
                                loading="lazy"
                                onError={() => setImageError(true)}
                                onClick={handleImageClick}
                                title="Нажмите для открытия карточки"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300"
                                onClick={handleImageClick}
                                title="Нажмите для открытия карточки"
                            >
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
                    {isDragging && (
                        <div
                            className="absolute inset-0 z-20 flex items-center justify-center bg-blue-500/10 border-2 border-blue-400 border-dashed rounded-xl pointer-events-none">
                            <span
                                className="text-blue-600 text-xs font-semibold bg-white/80 px-2 py-1 rounded-full shadow">
                                Перетащите в коллекцию
                            </span>
                        </div>
                    )}
                    {/* Статус доступа поверх изображения сверху слева - z-index 20 */}
                    <div className="absolute top-3 left-3 z-20 pointer-events-none">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-lg ${
                            card.access_type === 'private'
                                ? 'bg-[var(--color-white)] text-[var(--text-primary)] border border-[var(--text-primary)]'
                                : 'bg-[var(--color-primary)] text-white'
                        }`}>
                            {card.access_type === 'public'
                                ? t('cards.public')
                                : card.access_type === 'shared'
                                    ? t('cards.shared')
                                    : t('cards.private')}
                        </span>
                    </div>

                    {/* Кнопка меню (три точки) - правый верхний угол */}
                    <div className="absolute top-3 right-3 z-30">
                        <button
                            onClick={handleMenuToggle}
                            className="rounded-full hover:bg-black/80 transition-colors shadow-lg"
                            style={{
                                padding: '3px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: '1px solid var(--color-white)',
                            }}
                            title={t('cards.menu')}
                        >
                            <ThreeDotsIcon/>
                        </button>
                    </div>

                    {/* Выпадающее меню сверху - z-index 40 */}
                    <div
                        className={`absolute top-0 left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
                            isMenuOpen ? 'opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{zIndex: 40}}
                    >
                        <div className="bg-[var(--color-primary)] text-white flex flex-col relative">
                            {/* Крестик для закрытия */}
                            <div
                                onClick={handleCloseMenu}
                                className="absolute top-2 right-2 z-50 rounded-full p-1 cursor-pointer"
                                style={{color: 'white'}}
                                title={t('common.close')}
                            >
                                <IoCloseCircleOutline className="w-5 h-5"/>
                            </div>

                            <div className="p-4 pt-3 pb-3">
                                <button
                                    onClick={handleReportClick}
                                    className="w-full px-3 py-2.5 text-left text-sm text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-3"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeWidth="2">
                                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                                        <line x1="4" y1="22" x2="4" y2="15"/>
                                    </svg>
                                    {t('cards.report')}
                                </button>
                                <button
                                    onClick={handleHideClick}
                                    className="w-full px-3 py-2.5 text-left text-sm text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-3"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeWidth="2">
                                        <path
                                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                    {t('cards.hide')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {currentUser && <div className="absolute bottom-3 left-3 z-30">
                        <LikeButton
                            cardId={card.id}
                            size="md"
                        />
                    </div>}

                    {/* Кнопки действий снизу справа — автоматически сдвигаются по flex */}
                    <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5">

                        {/* Кнопка уведомлений */}
                        {currentUser && <button
                            onClick={handleScheduleToggle}
                            className="rounded-full hover:bg-black/80 transition-colors shadow-lg"
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
                        </button>}

                        {/* Кнопка описания */}
                        <button
                            onClick={handleDescriptionToggle}
                            className="rounded-full hover:bg-black/80 transition-colors shadow-lg"
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

                        {/* Кнопка удаления — только для владельца */}
                        {isOwner && canDelete && (
                            <button
                                onClick={handleDeleteClick}
                                className="rounded-full hover:bg-red-600/80 transition-colors shadow-lg"
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
                        )}

                    </div>

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
                                {card.collectionIds.length > 1
                                    ? 'Удалить карточку из этой коллекции?'
                                    : 'Удалить карточку полностью?'}
                            </p>
                            <p className="text-center text-sm mb-4 text-gray-100">
                                {card.collectionIds.length > 1
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

                    {/* Форма жалобы - z-index 40 */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
                            isReportOpen ? 'opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{zIndex: 40}}
                    >
                        <div className="bg-[var(--color-primary)] text-white h-full flex flex-col relative">
                            {/* Крестик для закрытия */}
                            <div
                                onClick={handleCloseReport}
                                className="absolute top-2 right-2 z-50 rounded-full p-1 cursor-pointer"
                                style={{color: 'white'}}
                                title={t('common.close')}
                            >
                                <IoCloseCircleOutline className="w-5 h-5"/>
                            </div>

                            <div className="p-4 h-full flex flex-col">
                                <h3 className="text-sm font-semibold mb-1 pr-6">
                                    {t('report.title')}
                                </h3>
                                <p className="text-xs text-white/70 mb-3">
                                    {t('report.description')}
                                </p>

                                <div
                                    className="flex-1 overflow-y-auto scrollbar-custom scrollbar-thin space-y-1.5"
                                    style={{
                                        maxHeight: cardHeight / 100 * 60,
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {reportReasons.map((reason) => (
                                        <label
                                            key={reason}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                                        >
                                            <input
                                                type="radio"
                                                name="reportReason"
                                                value={reason}
                                                checked={selectedReason === reason}
                                                onChange={() => handleReasonChange(reason)}
                                                className="w-4 h-4 accent-white"
                                            />
                                            <span className="text-xs">
                                                {t(`report.reasons.${reason}`)}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                <button
                                    onClick={handleSubmitReport}
                                    disabled={!selectedReason || reportLoading}
                                    className={`mt-3 w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                                        selectedReason && !reportLoading
                                            ? 'bg-white text-[var(--color-primary)] hover:bg-gray-100'
                                            : 'bg-white/30 text-white/50 cursor-not-allowed'
                                    }`}
                                >
                                    {reportLoading ? t('common.loading') : t('report.submit')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
