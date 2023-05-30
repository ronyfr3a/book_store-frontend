import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const drawerSlice = createSlice( {
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: ( state, action ) => {
      state.value = action.payload
    },
  },
} )

export const { openDrawer } = drawerSlice.actions
export const drawerReducer = drawerSlice.reducer