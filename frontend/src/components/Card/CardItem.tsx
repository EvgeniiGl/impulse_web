import {useNavigate} from 'react-router-dom';
import {Card} from "@store/store.ts";
import {useState, useRef, useEffect} from 'react';

interface CardItemProps {
    card: Card;
}

export default function CardItem({card}: CardItemProps) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);

    // Проверяем, есть ли прокрутка у описания
    useEffect(() => {
        const checkScroll = () => {
            if (descriptionRef.current) {
                const element = descriptionRef.current;
                // Проверяем только когда блок видимый
                if (isHovered && element.scrollHeight > 0) {
                    const hasVerticalScroll = element.scrollHeight > element.clientHeight;
                    setHasScroll(hasVerticalScroll);
                } else {
                    setHasScroll(false);
                }
            }
        };

        // Добавляем небольшую задержку для завершения анимации появления
        const timeout = setTimeout(checkScroll, 300);

        // Наблюдаем за изменениями размера
        const resizeObserver = new ResizeObserver(checkScroll);
        if (descriptionRef.current) {
            resizeObserver.observe(descriptionRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isHovered, card.description]);

    useEffect(() => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setCardHeight(rect.height)
        }
    }, []);

    return (
        <div
            onClick={() => navigate(`/card/${card.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                // Сбрасываем прокрутку при скрытии
                if (descriptionRef.current) {
                    descriptionRef.current.scrollTop = 0;
                }
            }}
            key={card.id}
            ref={cardRef}
        >
            {/* Контейнер с фиксированным соотношением 9:20 (вертикальное) */}
            <div className="relative w-full bg-gray-200 overflow-hidden"
                 style={{aspectRatio: '9/20'}}>
                <div className="absolute inset-0 flex items-center justify-center">
                    {card.url && !imageError ? (
                        <img
                            src={card.url}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                    {/* Заголовок по центру изображения */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                        <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 max-w-[90%]">
                            <h3 className="text-white font-bold text-lg text-center truncate">
                                {card.title}
                            </h3>
                        </div>
                    </div>

                    {/* Статус доступа поверх изображения снизу слева */}
                    <div className="absolute bottom-3 left-3 z-20">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-lg ${
                            card.access_type === 'public'
                                ? 'bg-green-500/90 backdrop-blur-sm text-white'
                                : card.access_type === 'shared'
                                    ? 'bg-blue-500/90 backdrop-blur-sm text-white'
                                    : 'bg-gray-500/90 backdrop-blur-sm text-white'
                        }`}>
                            {card.access_type === 'public'
                                ? 'Публичная'
                                : card.access_type === 'shared'
                                    ? 'Общая'
                                    : 'Приватная'}
                        </span>
                    </div>

                    {/* Описание, которое выезжает снизу при наведении */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-black/80 rounded-t-xl rounded-b-none transition-all duration-300 ease-in-out overflow-hidden ${
                            isHovered ? ' opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        style={{zIndex: 15}}
                    >
                        <div className="p-4 text-white h-full flex flex-col relative">
                            <p className="text-sm font-medium mb-2 flex-shrink-0">Описание:</p>
                            <div
                                ref={descriptionRef}
                                className={`text-sm leading-relaxed pr-2 flex-1 overflow-y-auto scrollbar-custom ${
                                    hasScroll ? 'scrollbar-thin' : ''
                                }`}
                                style={{
                                    maxHeight: cardHeight / 100 * 80,
                                    transition: 'max-height 0.3s ease-in-out',
                                    paddingBottom: '20px',
                                }}
                            >
                                {card.description || 'Нет описания'}
                            </div>

                            {/* Индикатор прокрутки для длинных текстов */}
                            {hasScroll && (
                                <div
                                    className="absolute bottom-3 right-3 text-xs text-white/50 flex items-center gap-1">
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
            </div>
        </div>
    );
}