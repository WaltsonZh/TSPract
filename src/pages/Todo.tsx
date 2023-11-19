import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { selectTasks, setTaskId } from '../redux/tasksSlice.ts'
import { Task } from '../types.ts'
import TaskBox from '../components/TaskBox.tsx'

export default function Todo() {
  const tasks = useAppSelector<Task[]>(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTaskId(tasks.length))
  }, [tasks])

  const notDone: Task[] = tasks.filter((task: Task) => task.done === false)

  const tasksElements = notDone.map((task: Task, index) => (
    <TaskBox key={index} task={task} />
  ))

  return (
    <div className='page Todo'>
      {tasksElements}
    </div>
  )
}
