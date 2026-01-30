import { api } from './baseApi';

export interface User {
    id: string;
    username: string;
    email: string;
    avatar_url?: string;
    bio?: string;
    created_at: string;
    followers_count: number;
    following_count: number;
    is_followed: boolean;
}

export interface UpdateUserRequest {
    username?: string;
    bio?: string;
    avatar?: File;
}

export interface UserProfile extends User {
    cards_count: number;
    total_views: number;
    total_likes: number;
}

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получить текущего пользователя
        getCurrentUser: builder.query<User, void>({
            query: () => '/users/me',
            providesTags: ['CurrentUser'],
        }),

        // Получить профиль пользователя
        getUserProfile: builder.query<UserProfile, string>({
            query: (userId) => /users/${userId},
            providesTags: (result, error, userId) => [{ type: 'Users', id: userId }],
        }),

        // Получить список пользователей
        getUsers: builder.query<User[], { page?: number; limit?: number; search?: string }>({
            query: ({ page = 1, limit = 10, search = '' }) => ({
                url: '/users',
                params: { page, limit, search },
            }),
            providesTags: ['Users'],
        }),

        // Обновить профиль
        updateProfile: builder.mutation<User, UpdateUserRequest>({
            query: (data) => {
                const formData = new FormData();
                if (data.username) formData.append('username', data.username);
                if (data.bio) formData.append('bio', data.bio);
                if (data.avatar) formData.append('avatar', data.avatar);

                return {
                    url: '/users/me',
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['CurrentUser'],
        }),

        // Подписаться на пользователя
        followUser: builder.mutation<{ is_followed: boolean }, string>({
            query: (userId) => ({
                url: /users/${userId}/follow,
method: 'POST',
}),
invalidatesTags: (result, error, userId) => [
    { type: 'Users', id: userId },
    'CurrentUser',
],
}),

// Отписаться от пользователя
unfollowUser: builder.mutation<{ is_followed: boolean }, string>({
    query: (userId) => ({
        url: /users/${userId}/unfollow,
method: 'POST',
}),
invalidatesTags: (result, error, userId) => [
    { type: 'Users', id: userId },
    'CurrentUser',
],
}),

// Получить подписчиков
getFollowers: builder.query<User[], { userId: string; page?: number; limit?: number }>({
    query: ({ userId, page = 1, limit = 10 }) => ({
        url: /users/${userId}/followers,
params: { page, limit },
}),
providesTags: (result, error, { userId }) => [{ type: 'Followers', id: userId }],
}),

// Получить подписки
getFollowing: builder.query<User[], { userId: string; page?: number; limit?: number }>({
    query: ({ userId, page = 1, limit = 10 }) => ({
        url: /users/${userId}/following,
params: { page, limit },
}),
providesTags: (result, error, { userId }) => [{ type: 'Following', id: userId }],
}),

// Удалить аккаунт
deleteAccount: builder.mutation<void, void>({
    query: () => ({
        url: '/users/me',
        method: 'DELETE',
    }),
    invalidatesTags: ['CurrentUser'],
}),
}),
});

export const {
    useGetCurrentUserQuery,
    useGetUserProfileQuery,
    useGetUsersQuery,
    useUpdateProfileMutation,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useGetFollowersQuery,
    useGetFollowingQuery,
    useDeleteAccountMutation,
} = usersApi;
