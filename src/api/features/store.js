import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { feedtApi } from './api/feedApi'
import feedSlice from '../slices/feedSlice'
export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [feedtApi.reducerPath]: feedtApi.reducer,
      headFeed: feedSlice

    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([feedtApi.middleware]),
      devTools: true
  })
  
  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch)