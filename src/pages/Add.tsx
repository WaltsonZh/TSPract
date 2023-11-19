import { Form, ActionFunctionArgs, useActionData, useNavigate } from 'react-router-dom'
import '../assets/Add.css'
import { Task } from '../types.ts'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { selectTaskId, addTask } from '../redux/tasksSlice.ts'
import { useEffect } from 'react'

interface Form {
  title: string
  desc: string
  pin: boolean
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const data: any = {} as Form

  try {
    for (const pair of formData.entries()) {
      const [key, value] = pair
      data[key] = value
    }

    return data
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
    }
  }

  return null
}

export default function Add() {
  const taskId = useAppSelector<number>(selectTaskId)
  const dispatch = useAppDispatch()
  const actionData = useActionData()
  const navigate = useNavigate()

  const asyncAddTask = async (newTask: Task) => {
    await dispatch(addTask([newTask, taskId]))
  }

  useEffect(() => {
    if (actionData) {
      const newTask = {
        ...actionData,
        done: false,
        createAt: new Date(),
      } as Task
      asyncAddTask(newTask)
      
      navigate('/')
    }
  }, [actionData])

  return (
    <Form className='page Add' method='POST'>
      <h1>Add Task</h1>
      <div className='Add-title'>
        <input type='text' name='title' required />
        <span>Title</span>
      </div>
      <div className='Add-desc'>
        <textarea name='desc' required />
        <span>Description</span>
      </div>
      <div className='Add-pin'>
        <label htmlFor='pin'>Pin to top</label>
        <input type='checkbox' name='pin' id='pin' />
      </div>
      <button className='Add-submit'>Submit</button>
    </Form>
  )
}
