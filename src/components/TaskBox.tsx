import { useNavigate } from 'react-router-dom'
import '../assets/TaskBox.css'
import { Task } from '../types.ts'
import { useAppDispatch } from '../redux/hooks.ts'
import { setTask } from '../redux/tasksSlice.ts'

interface TaskBoxProp {
  task: Task
  docId: string
}

export default function TaskBox(prop: TaskBoxProp) {
  const { task, docId } = prop
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const showDetails = () => {
    navigate(`/${docId}`)
  }

  return (
    <div className='TaskBox' onClick={showDetails}>
      <i
        className={'bx ' + (task.pin ? 'bxs-pin' : 'bx-pin')}
        onClick={(e) => {
          e.stopPropagation()
          const newTask = {
            ...task,
            pin: !task.pin,
          } as Task
          dispatch(setTask({ newTask, docId }))
        }}
      ></i>

      <h2>{task.title}</h2>
      <p>{task.desc}</p>
      <div className='TaskBox-done'>
        <i
          className={'bx bx-' + (task.done ? 'undo' : 'check')}
          onClick={(e) => {
            e.stopPropagation()
            const newTask = {
              ...task,
              done: !task.done,
            } as Task
            dispatch(setTask({ newTask, docId }))
          }}
        ></i>
      </div>
    </div>
  )
}
