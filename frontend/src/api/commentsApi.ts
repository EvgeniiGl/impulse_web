import { api } from './baseApi';

export interface Comment {
    id: string;
    card_id: string;
    user_id: string;
    user: {
        id: string;
        username: string;
        avatar_url?: string;
    };
    text: string;
    likes_count: number;
    is_liked: boolean;
    created_at: string;
    updated_at: string;
    replies_count: number;
}

export interface CreateCommentRequest {
    text: string;
    parent_id?: string; // для ответов на комментарии
}

export interface UpdateCommentRequest {
    text: string;
}

export const commentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получить комментарии карточки
        getCardComments: builder.query<Comment[], { cardId: string; page?: number; limit?: number }>({
            query: ({ cardId, page = 1, limit = 10 }) => ({
                url: /cards/${cardId}/comments,
params: { page, limit },
}),
providesTags: (result, error, { cardId }) => [{ type: 'Comments', id: cardId }],
}),

// Получить комментарий по ID
getCommentById: builder.query<Comment, string>({
    query: (id) => /comments/${id},
    providesTags: (result, error, id) => [{ type: 'Comments', id }],
}),

    // Получить ответы на комментарий
    getCommentReplies: builder.query<Comment[], { commentId: string; page?: number; limit?: number }>({
    query: ({ commentId, page = 1, limit = 10 }) => ({
        url: /comments/${commentId}/replies,
params: { page, limit },
}),
providesTags: (result, error, { commentId }) => [{ type: 'Comments', id: commentId }],
}),

// Создать комментарий
createComment: builder.mutation<
    Comment,
    { cardId: string; data: CreateCommentRequest }
>({
    query: ({ cardId, data }) => ({
        url: /cards/${cardId}/comments,
method: 'POST',
    body: data,
}),
invalidatesTags: (result, error, { cardId }) => [{ type: 'Comments', id: cardId }],
}),

// Обновить комментарий
updateComment: builder.mutation<Comment, { id: string; data: UpdateCommentRequest }>({
    query: ({ id, data }) => ({
        url: /comments/${id},
        method: 'PUT',
        body: data,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: 'Comments', id }],
}),

    // Удалить комментарий
    deleteComment: builder.mutation<void, string>({
    query: (id) => ({
        url: /comments/${id},
        method: 'DELETE',
    }),
    invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
}),

    // Лайкнуть комментарий
    likeComment: builder.mutation<{ likes_count: number }, string>({
    query: (id) => ({
        url: /comments/${id}/like,
method: 'POST',
}),
invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
}),

// Удалить лайк с комментария
unlikeComment: builder.mutation<{ likes_count: number }, string>({
    query: (id) => ({
        url: /comments/${id}/unlike,
method: 'POST',
}),
invalidatesTags: (result, error, id) => [{ type: 'Comments', id }],
}),
}),
});

export const {
    useGetCardCommentsQuery,
    useGetCommentByIdQuery,
    useGetCommentRepliesQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    useUnlikeCommentMutation,
} = commentsApi;
