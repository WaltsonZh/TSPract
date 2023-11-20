import '../assets/Model.css'
import '../assets/Add.css'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { selectShow, toggleModel } from '../redux/modelSlice.ts'
import { deleteTask } from '../redux/tasksSlice.ts'
import { useNavigate, useParams } from 'react-router-dom'
import { DetailsParams } from '../pages/Details.tsx'

export default function Model() {
  const { id } = useParams() as DetailsParams
  const show = useAppSelector<boolean>(selectShow)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
            dispatch(deleteTask(id))
            dispatch(toggleModel())
            navigate(-1)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
