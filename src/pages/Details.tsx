import '../assets/Details.css'
import '../assets/Add.css'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { Task } from '../types.ts'
import { selectTaskByDocId, setTask } from '../redux/tasksSlice.ts'
import { useEffect, useState } from 'react'
import { toggleModel } from '../redux/modelSlice.ts'

export type DetailsParams = {
  id: string
}

export default function Details() {
  const { id } = useParams() as DetailsParams
  const task = useAppSelector<Task>((state) => selectTaskByDocId(state, id)) || null
  const [taskLoading, setTaskLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [editTitle, setEditTitle] = useState<boolean>(false)
  const [editDesc, setEditDesc] = useState<boolean>(false)

  useEffect(() => {
    if (task === null) {
      setTimeout(() => {
        if (task === null) {
          setTaskLoading(false)
        }
      }, 3000)
    }
  }, [])

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDesc(task.desc)
    }
  }, [task])

  return (
    <div className='page Details'>
      {task ? (
        <>
          <div className={editTitle ? 'Details-editing' : 'Details-content'}>
            <h1>{task.title}</h1>
            <div className='Add-title'>
              <input type='text' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
            </div>
            <i
              className='bx bx-edit'
              onClick={() => {
                setEditTitle((prevEditTitle) => !prevEditTitle)
              }}
            ></i>
            <div className='Details-actions'>
              <button
                className='Add-submit'
                onClick={() => {
                  setEditTitle(false)
                }}
              >
                Cancel
              </button>
              <button
                className='Add-submit'
                onClick={() => {
                  const newTask = {
                    ...task,
                    title,
                  } as Task
                  dispatch(setTask({ newTask, docId: id }))
                  setEditTitle(false)
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <div className='Details-panel'>
            <div
              className='Details-toggle'
              onClick={() => {
                const newTask = {
                  ...task,
                  pin: !task.pin,
                } as Task
                dispatch(setTask({ newTask, docId: id }))
              }}
            >
              <p>{task.pin ? 'Unpin' : 'Pin'}</p>
              <i className={`bx ${task.pin ? 'bxs-pin' : 'bx-pin'}`}></i>
            </div>
            <div
              className='Details-toggle'
              onClick={() => {
                const newTask = {
                  ...task,
                  done: !task.done,
                } as Task
                dispatch(setTask({ newTask, docId: id }))
              }}
            >
              <p>{task.done ? 'Restart' : 'Finish'}</p>
              <i className={`bx bx-${task.done ? 'undo' : 'check'}`}></i>
            </div>
            <div className='Details-toggle Details-delete' onClick={() => {
              dispatch(toggleModel())
            }}>
              <p>Delete</p>
              <i className='bx bx-trash'></i>
            </div>
          </div>
          <div className={editDesc ? 'Details-editing' : 'Details-content'}>
            <p>{task.desc}</p>
            <div className='Add-desc'>
              <textarea value={desc} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)} />
            </div>
            <i
              className='bx bx-edit'
              onClick={() => {
                setEditDesc((prevEditDesc) => !prevEditDesc)
              }}
            ></i>
            <div className='Details-actions'>
              <button
                className='Add-submit'
                onClick={() => {
                  setEditDesc(false)
                }}
              >
                Cancel
              </button>
              <button
                className='Add-submit'
                onClick={() => {
                  const newTask = {
                    ...task,
                    desc,
                  } as Task
                  dispatch(setTask({ newTask, docId: id }))
                  setEditDesc(false)
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ) : taskLoading ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Can't find task with ID: {id}</h1>
      )}
    </div>
  )
}
