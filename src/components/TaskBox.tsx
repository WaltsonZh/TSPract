import { Task } from '../types.ts'

interface TaskBoxProp {
  task: Task
}

export default function TaskBox(prop: TaskBoxProp) {
  const { task } = prop

  return (
    <div className='TaskBox'>
      {JSON.stringify(task)}
    </div>
  )
}
