import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Task } from '../types.ts'
import { RootState } from './store.ts'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firestore.ts'

interface tasksState {
  tasks: Task[]
  taskId: number
}

const initialState: tasksState = {
  tasks: [],
  taskId: 0,
}

export const addTask = createAsyncThunk('tasks/add',async (newTask: [Task, number]) => {
  const [task, taskId] = newTask
  await setDoc(doc(db, 'tasks', taskId.toString()), task)
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
  },
  extraReducers(builder) {
    builder.addCase(addTask.fulfilled, (state) => {
      state.taskId += 1
    })
  },
})

export const { setTasks, setTaskId } = tasksSlice.actions
export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectTaskId = (state: RootState) => state.tasks.taskId

export default tasksSlice.reducer
