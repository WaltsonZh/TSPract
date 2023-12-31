import '../assets/Todo.css'
import { useAppSelector } from '../redux/hooks.ts'
import { selectDocIds, selectTasks } from '../redux/tasksSlice.ts'
import { Task } from '../types.ts'
import TaskBox from '../components/TaskBox.tsx'

export default function Todo() {
  const tasks = useAppSelector<Task[]>(selectTasks)
  const docIds = useAppSelector<string[]>(selectDocIds)

  const tasksElements = tasks.map((task: Task, index: number) => task.done ? null : <TaskBox key={index} task={task} docId={docIds[index]} />)

  return (
    <div className='page Todo'>
      <h1>Todos</h1>
      {tasksElements.some((element) => element !== null) ? tasksElements : <h3>No task in progress.</h3>}
    </div>
  )
}
