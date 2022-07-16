import { configureStore } from '@reduxjs/toolkit'
import recordsReducer from './reducers/recordsSlice'

export const store = configureStore({
  reducer: {
    recordsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
