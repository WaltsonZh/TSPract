import '../assets/Model.css'
import '../assets/Add.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { selectShow, toggleModel } from '../redux/modelSlice.ts'

export default function Model() {
  const show = useAppSelector<boolean>(selectShow)
  const dispatch = useAppDispatch()

  return (
    <div className={`Model ${show ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
      <div
        className='Model-overlay'
        onClick={() => {
          dispatch(toggleModel())
        }}
      ></div>
      <div className='Model-content'>
        <h1>Delete Task ?</h1>
        <button
          className='Add-submit'
          onClick={() => {
            dispatch(toggleModel())
          }}
        >
          Cancel
        </button>
        <button
          className='Add-submit Model-delete'
          onClick={() => {
            dispatch(toggleModel())
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
