import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import chatReducer from './features/chat/chatSlice';

// ✅ Import your RTK Query API slice
import { userApiSlice } from './features/user/userSlice'; // This file should use createApi now
import { orderApiSlice } from './features/order/orderSlice';
import { productApi } from './features/product/productSlice'; 

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  chat: chatReducer,
  // ✅ RTK Query reducer goes here
  [orderApiSlice.reducerPath]: orderApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'cart'], // only persist what’s needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware), // ✅ Add middleware for RTK Query
});

export const persistor = persistStore(store);


// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import authReducer from './features/auth/authSlice';
// import cartReducer from './features/cart/cartSlice';
// import productReducer from './features/product/productSlice';
// import orderReducer from './features/order/orderSlice';
// import { userApiSlice } from './features/user/userSlice';
// import chatReducer from './features/chat/chatSlice';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   cart: cartReducer,
//   product: productReducer,
//   order: orderReducer,
//   user: userReducer,
//   chat: chatReducer,
// });

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   whitelist: ['auth', 'cart'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   // reducer: persistedReducer,
//   reducer: {
//     // your other reducers
//     [userApiSlice.reducerPath]: userApiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);