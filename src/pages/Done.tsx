import '../assets/Done.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { selectDocIds, selectTasks, setTaskId } from '../redux/tasksSlice.ts'
import { Task } from '../types.ts'
import TaskBox from '../components/TaskBox.tsx'

export default function Done() {
  const tasks = useAppSelector<Task[]>(selectTasks)
  const docIds = useAppSelector<string[]>(selectDocIds)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTaskId(tasks.length))
  }, [tasks])

  const tasksElements = tasks.map((task: Task, index: number) => (task.done ? <TaskBox key={index} task={task} docId={docIds[index]} /> : null))

  return (
    <div className='page Done'>
      <h1>Finished Tasks</h1>
      {tasksElements.some((element) => element !== null) ? tasksElements : <h3>No finished tasks.</h3>}
    </div>
  )
}
