// import {api} from './baseApi';
// import {Card} from './cardsApi';
// import {User} from './usersApi';
//
// export interface SearchResult {
//     cards: Card[];
//     users: User[];
// }
//
// export interface SearchFilters {
//     query: string;
//     type?: 'all' | 'cards' | 'users';
//     page?: number;
//     limit?: number;
//     sort?: 'relevance' | 'recent' | 'popular';
// }
//
// export interface SearchSuggestion {
//     id: string;
//     text: string;
//     type: 'card' | 'user' | 'tag';
// }
//
// export const searchApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//         // Поиск
//         search: builder.query<SearchResult, SearchFilters>({
//             query: ({query, type = 'all', page = 1, limit = 10, sort = 'relevance'}) => ({
//                 url: '/search',
//                 params: {q: query, type, page, limit, sort},
//             }),
//             providesTags: ['Search'],
//         }),
//
//         // Получить подсказки поиска
//         getSearchSuggestions: builder.query<SearchSuggestion[], string>({
//             query: (query) => ({
//                 url: '/search/suggestions',
//                 params: {q: query},
//             }),
//             providesTags: ['Search'],
//         }),
//
//         // Поиск карточек
//         searchCards: builder.query<Card[], SearchFilters>({
//             query: ({query, page = 1, limit = 10, sort = 'relevance'}) => ({
//                 url: '/search/cards',
//                 params: {q: query, page, limit, sort},
//             }),
//             providesTags: ['Search'],
//         }),
//
//         // Поиск пользователей
//         searchUsers: builder.query<User[], SearchFilters>({
//             query: ({query, page = 1, limit = 10}) => ({
//                 url: '/search/users',
//                 params: {q: query, page, limit},
//             }),
//             providesTags: ['Search'],
//         }),
//
//         // Получить популярные теги
//         getPopularTags: builder.query<{ tag: string; count: number }[], { limit?: number }>({
//             query: ({limit = 10}) => ({
//                 url: '/search/tags',
//                 params: {limit},
//             }),
//             providesTags: ['Search'],
//         }),
//
//         // Получить историю поиска
//         getSearchHistory: builder.query<string[], void>({
//             query: () => '/search/history',
//             providesTags: ['SearchHistory'],
//         }),
//
//         // Очистить историю поиска
//         clearSearchHistory: builder.mutation<void, void>({
//             query: () => ({
//                 url: '/search/history',
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['SearchHistory'],
//         }),
//     }),
// });
//
// export const {
//     useSearchQuery,
//     useGetSearchSuggestionsQuery,
//     useSearchCardsQuery,
//     useSearchUsersQuery,
//     useGetPopularTagsQuery,
//     useGetSearchHistoryQuery,
//     useClearSearchHistoryMutation,
// } = searchApi;
