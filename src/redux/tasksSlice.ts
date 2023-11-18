import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../types.ts'
import { RootState } from './store.ts'

interface tasksState {
  tasks: Task[]
  taskId: number
}

const initialState: tasksState = {
  tasks: [],
  taskId: 0,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    setTaskId: (state, action: PayloadAction<number>) => {
      state.taskId = action.payload
    }
  },
})

export const { setTasks, setTaskId } = tasksSlice.actions
export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectTaskId = (state: RootState) => state.tasks.taskId

export default tasksSlice.reducer
