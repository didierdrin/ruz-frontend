// src/features/order/orderApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApiSlice = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),

    getOrderById: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ['Order'],
    }),

    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PUT',
        body: paymentResult,
      }),
      invalidatesTags: ['Order'],
    }),

    getMyOrders: builder.query({
      query: () => '/orders/myorders',
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
} = orderApiSlice;



// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   orders: [],
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     setOrders(state, action) {
//       state.orders = action.payload;
//     },
//   },
// });

// export const { setOrders } = orderSlice.actions;
// export default orderSlice.reducer;
