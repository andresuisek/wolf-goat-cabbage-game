// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { baseApi } from './baseApi';
import createRootReducer from './reducer';

const store = configureStore({
  reducer: createRootReducer,
  // reducer: {
  //   // Add the generated reducer as a specific top-level slice
  //   [baseApi.reducerPath]: baseApi.reducer,
  // },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;