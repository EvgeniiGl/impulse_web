import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_URL = window.location.origin

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, {getState}: any) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        'Cards',
        'Comments',
        'Users',
        'CurrentUser',
        'Followers',
        'Following',
        'Stats',
        'Search',
        'SearchHistory',
    ],
    endpoints: () => ({}),
});
