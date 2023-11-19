import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Task } from '../types.ts'
import { RootState } from './store.ts'
import { addDoc } from 'firebase/firestore'
import { taskCollection } from '../firebase/firestore.ts'

interface tasksState {
  tasks: Task[]
  taskId: number
  docIds: string[]
}

const initialState: tasksState = {
  tasks: [],
  taskId: 0,
  docIds: [],
}

export const addTask = createAsyncThunk('tasks/add', async (newTask: Task) => {
  try {
    const { id } = await addDoc(taskCollection, newTask)
    return id
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  }

  return null
})

export const toggleDone = createAsyncThunk('tasks/toggle', async () => {

})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    setTaskId: (state, action: PayloadAction<number>) => {
      state.taskId = action.payload
    },
    setDocIds: (state, action: PayloadAction<string[]>) => {
      state.docIds = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.docIds.push(action.payload)
      }
    })
  },
})

export const { setTasks, setTaskId, setDocIds } = tasksSlice.actions
export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectTaskId = (state: RootState) => state.tasks.taskId
export const selectDocIds = (state: RootState) => state.tasks.docIds

export default tasksSlice.reducer
