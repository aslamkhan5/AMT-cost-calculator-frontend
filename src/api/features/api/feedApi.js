import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setLoading } from '../../slices/feedSlice';
// Define a service using a base URL and expected endpoints
export const feedtApi = createApi({
  reducerPath: 'feedReducer',
  tagTypes: ['refresh'],
  keepUnusedDataFor: 5,
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://amp-cost-calculator.dev.spacecats.tech/api/' ,
    }),
  endpoints: (builder) => ({

    tableData: builder.query({
      query: (dat) => {
        return {
            url: `get_data?data_feed_id=${dat.b}&category_id=${dat.c}&version_id=${dat.d}`,
            // url: `get_data?init_equity_deposit_id=1&data_feed_id=${dat.b}&platform_id=${dat.c}&version_id=${dat.d}&subscription_id=${dat.e}`,
            method: 'GET',
        }
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        dispatch(setLoading({status: true}))
        try {
          console.log('loadingg. done');
          dispatch(setLoading({status: false}))
        } catch (err) {
        }
      },
    }),

    getPlatForm: builder.query({
      query: (feed_id) => {
        return {
            url: `platforms/${feed_id}`,
            method: 'GET',
        }
      },
      
      providesTags: ['refresh'] 
    }),

    getVersions: builder.query({
      query: (platform) => {
        return {
            url: `versions/${platform}`,
            method: 'GET',
        }
      },
      providesTags: ['versionlist'],
    }),
    getSubscriptions: builder.query({
      query: (obj) => {
        return {
            url: `subscriptions/${obj.platform_id}/${obj.version_id}`,
            method: 'GET',
        }
      },
      providesTags: ['subscriptionsList'],
    }),

    getDataFeed: builder.query({
      query: () => {
        return {
            url: `feed_data`,
            method: 'GET',
        }
      },
    }),

    getCategories: builder.query({
      query: () => {
        return {
            url: `categories`,
            method: 'GET',
        }
      },
    }),
    getFeesData: builder.query({
      query: (filter) => {
        return {
            url: `fee?data_feed_id=${filter.data_feed}&subscription_id=${filter.subscription}&version_id=${filter?.version}&platform_id=${filter?.platform_id}`,
            method: 'GET',
        }
      },
    }),


      // api/Event/byid/1
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useTableDataQuery, 
  useGetPlatFormQuery, 
  useGetVersionsQuery, 
  useGetSubscriptionsQuery, 
  useGetDataFeedQuery,
  useGetCategoriesQuery,
  useGetFeesDataQuery
} = feedtApi