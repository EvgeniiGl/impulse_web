import {Card} from "@store/card/cardSlice.ts";
import {useNavigate} from 'react-router-dom';

interface CardItemProps {
    card: Card;
}

export default function CardItem({card}: CardItemProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/card/${card.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer group"
            key={card.id}
        >
            {/* Изображение */}
            <div className="relative w-full h-40 bg-gray-200 overflow-hidden">
                {card.url ? (
                    <img
                        src={card.url}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>
                )}
            </div>

            {/* Контент */}
            <div className="p-3">
                <h3 className="font-semibold text-gray-900 truncate mb-1">
                    {card.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {card.description || 'Нет описания'}
                </p>

                {/* Статус доступа */}
                <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                        card.access_type === 'public'
                            ? 'bg-green-100 text-green-800'
                            : card.access_type === 'shared'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                    }`}>
                        {card.access_type === 'public' ? 'Публичная' : card.access_type === 'shared' ? 'Общая' : 'Приватная'}
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(card.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}