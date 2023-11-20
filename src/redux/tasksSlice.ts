import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Task } from '../types.ts'
import { RootState } from './store.ts'
import { addDoc, doc, setDoc } from 'firebase/firestore'
import { taskCollection } from '../firebase/firestore.ts'

interface tasksState {
  tasks: Task[]
  docIds: string[]
}

const initialState: tasksState = {
  tasks: [],
  docIds: [],
}

export const addTask = createAsyncThunk('tasks/addTask', async (newTask: Task) => {
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

export const setTask = createAsyncThunk('tasks/setTask', async (setTaskPayload: {newTask: Task, docId: string}) => {
  const { newTask, docId } = setTaskPayload
  try {
    await setDoc(doc(taskCollection, docId), newTask)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    setDocIds: (state, action: PayloadAction<string[]>) => {
      state.docIds = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        state.docIds.push(action.payload)
      }
    })
  },
})

export const { setTasks, setDocIds } = tasksSlice.actions
export const selectTasks = (state: RootState) => state.tasks.tasks
export const selectDocIds = (state: RootState) => state.tasks.docIds
export const selectTaskByDocId = (state: RootState, docId: string) => {
  const index = state.tasks.docIds.indexOf(docId)
  return state.tasks.tasks[index]
}

export default tasksSlice.reducer
