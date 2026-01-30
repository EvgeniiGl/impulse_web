import { api } from './api';

export interface Card {
    id: string;
    title: string;
    image_url: string;
    access_type: 'public' | 'private';
    created_at: string;
    updated_at: string;
    user_id: string;
    views_count: number;
    likes_count: number;
}

export interface CreateCardRequest {
    title: string;
    access_type: 'public' | 'private';
    file: File;
}

export interface UpdateCardRequest {
    title?: string;
    access_type?: 'public' | 'private';
}

export interface GetAllCardsParams {
    page?: number;
    limit?: number;
    access_type?: 'public' | 'private';
    order_by?: 'created_at' | 'views_count' | 'likes_count';
    order_direction?: 'asc' | 'desc';
    user_id?: string;
    search?: string;
}

export interface PaginatedCardsResponse {
    cards: Card[];
    total: number;
    page: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}

export const cardsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получить все карточки
        getAllCards: builder.query<PaginatedCardsResponse, GetAllCardsParams | void>({
            query: (params) => {
                const queryParams: Record<string, any> = {};
                if (params) {
                    Object.entries(params).forEach(([key, value]) => {
                        if (value !== undefined) {
                            queryParams[key] = value;
                        }
                    });
                }

                return {
                    url: '/api/cards',
                    params: queryParams,
                };
            },
            providesTags: (result) => {
                const tags: Array<{ type: 'Cards', id: string }> = [{ type: 'Cards', id: 'LIST' }];

                if (result?.cards) {
                    tags.push(...result.cards.map(card => ({ type: 'Cards' as const, id: card.id })));
                }

                return tags;
            },
        }),
        // Получить карточку по ID
//         getCardById: builder.query<Card, string>({
//             query: (id) => `/cards/${id}`,
//             providesTags: (result, error, id) => [{ type: 'Cards', id }],
//         }),
//
//         // Получить карточки пользователя
//         getUserCards: builder.query<Card[], string>({
//             query: (userId) => `/users/${userId}/cards`,
// providesTags: ['Cards'],
// }),

// Создать карточку
createCard: builder.mutation<Card, CreateCardRequest>({
    query: (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('access_type', data.access_type);
        formData.append('file', data.file);

        return {
            url: '/cards',
            method: 'POST',
            body: formData,
        };
    },
    invalidatesTags: ['Cards'],
}),

    // Обновить карточку
    updateCard: builder.mutation<Card, { id: string; data: UpdateCardRequest }>({
    query: ({ id, data }) => ({
        url: /cards/${id},
        method: 'PUT',
        body: data,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: 'Cards', id }, 'Cards'],
}),

    // Удалить карточку
    deleteCard: builder.mutation<void, string>({
    query: (id) => ({
        url: /cards/${id},
        method: 'DELETE',
    }),
    invalidatesTags: ['Cards'],
}),

    // Лайкнуть карточку
    likeCard: builder.mutation<{ likes_count: number }, string>({
    query: (id) => ({
        url: /cards/${id}/like,
method: 'POST',
}),
invalidatesTags: (result, error, id) => [{ type: 'Cards', id }],
}),

// Удалить лайк
unlikeCard: builder.mutation<{ likes_count: number }, string>({
    query: (id) => ({
        url: /cards/${id}/unlike,
method: 'POST',
}),
invalidatesTags: (result, error, id) => [{ type: 'Cards', id }],
}),
}),
});

export const {
    useGetAllCardsQuery,
    useGetCardByIdQuery,
    useGetUserCardsQuery,
    useCreateCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
    useLikeCardMutation,
    useUnlikeCardMutation,
} = cardsApi;
