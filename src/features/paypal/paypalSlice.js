// src/features/paypal/paypalApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const paypalApiSlice = createApi({
  reducerPath: 'paypalApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPayPalClientId: builder.query({
      query: () => '/config/paypal',
    }),
  }),
});

export const { useGetPayPalClientIdQuery } = paypalApiSlice;