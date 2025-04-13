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
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['Order'],
    }),

    getMyOrders: builder.query({
      query: () => '/orders/myorders',
      providesTags: ['Order'],
    }),

    // ✅ Add this
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery, // ✅ Now you can import this in AdminScreen
} = orderApiSlice;

// Optional alias if needed
export const useGetOrderDetailsQuery = useGetOrderByIdQuery;


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
