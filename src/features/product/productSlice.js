import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});



export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    // Define your endpoints
    getTopProducts: builder.query({
      query: () => 'products/top', // This is your backend route for top products
    }),
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => `/products?keyword=${keyword}&pageNumber=${pageNumber}`,
    }),
  }),
});

export const { useGetTopProductsQuery, useGetProductsQuery } = productApi;
export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
