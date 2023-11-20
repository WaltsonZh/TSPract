import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice.ts'
import modelReducer from './modelSlice.ts'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    model: modelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
