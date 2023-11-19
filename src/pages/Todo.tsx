import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { selectTasks, setTaskId } from '../redux/tasksSlice.ts'
import { Task } from '../types.ts'

export default function Todo() {
  const tasks = useAppSelector<Task[]>(selectTasks)
  const dispatch = useAppDispatch()

  const tasksElements = tasks.map((task: Task, index) => (
    <p key={index}>{JSON.stringify(task)}</p>
  ))

  useEffect(() => {
    dispatch(setTaskId(tasksElements.length))
  }, [tasksElements])

  return (
    <div className='page Todo'>
      {tasksElements}
    </div>
  )
}
