import '../assets/TaskBox.css'
import { Task } from '../types.ts'

interface TaskBoxProp {
  task: Task
}

export default function TaskBox(prop: TaskBoxProp) {
  const { task } = prop

  return (
    <div className='TaskBox'>
      <h2>{task.title}</h2>
      <p>{task.desc}</p>
      <div className='TaskBox-done'>
        <i className='bx bx-check'></i>
      </div>
    </div>
  )
}
