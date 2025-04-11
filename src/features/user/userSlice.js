// src/features/user/userSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserAvatar: builder.mutation({
      query: (formData) => ({
        url: '/users/avatar',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
  useUpdateUserAvatarMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;



// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const userApiSlice = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
//   tagTypes: ['User'],
//   endpoints: (builder) => ({
//     getUsers: builder.query({
//       query: () => '/',
//       providesTags: ['User'],
//     }),
//     deleteUser: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['User'],
//     }),
//     getUserById: builder.query({
//       query: (id) => `/${id}`,
//       providesTags: ['User'],
//     }),
//     updateUser: builder.mutation({
//       query: ({ id, ...data }) => ({
//         url: `/${id}`,
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['User'],
//     }),
//     updateUserProfile: builder.mutation({
//       query: (data) => ({
//         url: '/profile',
//         method: 'PUT',
//         body: data,
//       }),
//       invalidatesTags: ['User'],
//     }),
//     updateUserAvatar: builder.mutation({
//       query: (formData) => ({
//         url: '/avatar',
//         method: 'PUT',
//         body: formData,
//       }),
//       invalidatesTags: ['User'],
//     }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useDeleteUserMutation,
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
//   useUpdateUserProfileMutation,
//   useUpdateUserAvatarMutation,
// } = userApiSlice;

