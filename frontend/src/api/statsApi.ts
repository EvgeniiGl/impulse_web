import { api } from './baseApi';

export interface CardStats {
    card_id: string;
    views_count: number;
    likes_count: number;
    comments_count: number;
    shares_count: number;
}

export interface UserStats {
    user_id: string;
    total_cards: number;
    total_views: number;
    total_likes: number;
    total_followers: number;
    total_following: number;
}

export interface GlobalStats {
    total_users: number;
    total_cards: number;
    total_views: number;
    total_likes: number;
}

export const statsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получить статистику карточки
        getCardStats: builder.query<CardStats, string>({
            query: (cardId) => /stats/cards/${cardId},
providesTags: (result, error, cardId) => [{ type: 'Stats', id: cardId }],
}),

// Получить статистику пользователя
getUserStats: builder.query<UserStats, string>({
    query: (userId) => /stats/users/${userId},
providesTags: (result, error, userId) => [{ type: 'Stats', id: userId }],
}),
// Получить глобальную статистику
getGlobalStats: builder.query<GlobalStats, void>({
    query: () => '/stats/global',
    providesTags: ['Stats'],
}),

    // Получить топ карточек
    getTopCards: builder.query<CardStats[], { limit?: number; period?: string }>({
    query: ({ limit = 10, period = 'week' }) => ({
        url: '/stats/top-cards',
        params: { limit, period },
    }),
    providesTags: ['Stats'],
}),

    // Получить статистику за период
    getStatsByPeriod: builder.query<
    CardStats[],
    { userId: string; startDate: string; endDate: string }
>({
    query: ({ userId, startDate, endDate }) => ({
        url: /stats/users/${userId}/period,
params: { start_date: startDate, end_date: endDate },
}),
providesTags: ['Stats'],
}),
}),
});

export const {
    useGetCardStatsQuery,
    useGetUserStatsQuery,
    useGetGlobalStatsQuery,
    useGetTopCardsQuery,
    useGetStatsByPeriodQuery,
} = statsApi;
