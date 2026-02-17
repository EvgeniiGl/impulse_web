import {useNavigate} from 'react-router-dom';
import {Card} from "@store/store.ts";
import {useState} from 'react';

interface CardItemProps {
    card: Card;
}

export default function CardItem({card}: CardItemProps) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    // Форматирование даты с локализацией
    const formattedDate = new Date(card.created_at).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div
            onClick={() => navigate(`/card/${card.id}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
            key={card.id}
        >
            {/* Контейнер с фиксированным соотношением 9:20 (вертикальное) */}
            <div className="relative w-full bg-gray-200 overflow-hidden"
                 style={{aspectRatio: '9/20'}}>  {/* Явно задаем соотношение 9:20 */}
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
                </div>
            </div>

            <div className="p-3 flex-1 flex flex-col">
                <p className="text-sm text-gray-700 line-clamp-2 min-h-[2.5rem] mb-2 flex-1">
                    {card.description || 'Нет описания'}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        card.access_type === 'public'
                            ? 'bg-green-100 text-green-800'
                            : card.access_type === 'shared'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}>
                        {card.access_type === 'public'
                            ? 'Публичная'
                            : card.access_type === 'shared'
                                ? 'Общая'
                                : 'Приватная'}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formattedDate}
                    </span>
                </div>
            </div>
        </div>
    );
}