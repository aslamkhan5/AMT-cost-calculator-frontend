import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data_feed: '',
  equity: '',
  platform: '',
  version: '',
  subscription: '',
  filterFeed : null,
  loader: false,
  per_side_contract: [],
  monthly_platforms: [],
  category_id : 1,
  version_name: ''
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
   
    getHeadFeed: (state) => {
        return state
    },
    setHeadFeed: (state, action) => {
        state.data_feed = action.payload.feed_data
    },
    setPlatForm : (state, action) => {
      state.platform = action.payload.platform
    },
    setVersion : (state, action) => {
      state.version = action.payload.version
    },
    setSubscription : (state, action) => {
      state.subscription = action.payload.subscription
    },
    setEquity : (state, action) => {
      state.equity = action.payload.equity
    },
    setDataFeed : (state, action) => {
      state.filterFeed = action.payload.feed
    },
    setLoading : (state, action) => {
      state.loader = action.payload.status
    },
    setExtraPrice: (state, action) => {
      // return {
      //   ...state,
      //   per_side_contract: action.payload.per_side,
      //   monthly_platforms: action.payload.monthly_side,
      // }
      state.per_side_contract = []
      state.monthly_platforms = []

      state.per_side_contract.push(action.payload.per_side)
      state.monthly_platforms.push(action.payload.monthly_platform)
    },
    pushExtraPrice:  (state, action) => {
      const isExist = state.per_side_contract.find(item => item.name === action.payload.extraPerSide?.name)
      if(!isExist)
      {
        state.per_side_contract.push(action.payload.extraPerSide)
      }
    },
    pushExtraPriceMonth:  (state, action) => {
      console.log('dash',action.payload.extraPerSideMonth);
      const isExist = state.monthly_platforms.find(item => item.name === action.payload.extraPerSideMonth.name)
      if(!isExist)
      {
        state.monthly_platforms.push(action.payload.extraPerSideMonth)
      }
    },

    setCategory : (state, action) => {
      state.category_id = action.payload.category
    },


  },
})

// Action creators are generated for each case reducer function
export const { 
  getHeadFeed, 
  setHeadFeed, 
  setPlatForm, 
  setVersion, 
  setSubscription, 
  setEquity, 
  setDataFeed, 
  setLoading, 
  setExtraPrice,
  pushExtraPrice,
  pushExtraPriceMonth,
  setCategory,
} = feedSlice.actions

export default feedSlice.reducer