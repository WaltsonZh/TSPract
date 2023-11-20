import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

interface modelState {
  show: boolean
}

const initialState: modelState = {
  show: false
}

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    toggleModel: (state) => {
      state.show = !state.show
    }
  }
})

export const { toggleModel } = modelSlice.actions
export const selectShow = (state: RootState) => state.model.show

export default modelSlice.reducer
