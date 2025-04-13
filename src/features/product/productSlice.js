import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// Async thunks for Redux actions
export const listProductDetails = createAsyncThunk(
  'product/details',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/products', productData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// RTK Query productApi
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: () => 'products/top',
    }),
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = '' }) => 
        `/products?keyword=${keyword}&pageNumber=${pageNumber}`,
    }),
  }),
});

// Product details slice
const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: { reviews: [], images: [] },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Product create slice
const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState: {
    product: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetProductCreate: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductCreate } = productCreateSlice.actions;
export const { useGetTopProductsQuery, useGetProductsQuery } = productApi;

// Export reducers
export const productDetailsReducer = productDetailsSlice.reducer;
export const productCreateReducer = productCreateSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // RTK Query productApi
// export const productApi = createApi({
//   reducerPath: 'productApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
//   endpoints: (builder) => ({
//     getTopProducts: builder.query({
//       query: () => 'products/top',
//     }),
//     getProducts: builder.query({
//       query: ({ keyword, pageNumber }) => `/products?keyword=${keyword}&pageNumber=${pageNumber}`,
//     }),
//   }),
// });

// export const { useGetTopProductsQuery, useGetProductsQuery } = productApi;

// export default productApi.reducer;


