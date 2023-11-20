import '../assets/Details.css'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts'
import { Task } from '../types.ts'
import { selectTaskByDocId, toggleDone, togglePin } from '../redux/tasksSlice.ts'
import { useEffect, useState } from 'react'

type DetailsParams = {
  id: string
}

export default function Details() {
  const { id } = useParams() as DetailsParams
  const task = useAppSelector<Task>((state) => selectTaskByDocId(state, id)) || null
  const [taskLoading, setTaskLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (task === null) {
      setTimeout(() => {
        if (task === null) {
          setTaskLoading(false)
        }
      }, 3000)
    }
  }, [])

  return (
    <div className='page Details'>
      {task ? (
        <>
          <h1>{task.title}</h1>
          <div className='Details-panel'>
            <div
              className='Details-toggle'
              onClick={() => {
                dispatch(togglePin({ docId: id, prevPin: task.pin }))
              }}
            >
              <p>{task.pin ? 'Unpin' : 'Pin'}</p>
              <i className={`bx ${task.pin ? 'bxs-pin' : 'bx-pin'}`}></i>
            </div>
            <div
              className='Details-toggle'
              onClick={() => {
                dispatch(toggleDone({ docId: id, prevDone: task.done }))
              }}
            >
              <p>{task.done ? 'Restart' : 'Finish'}</p>
              <i className={`bx bx-${task.done ? 'undo' : 'check'}`}></i>
            </div>
            <div className='Details-toggle Details-delete'>
              <p>Delete</p>
              <i className='bx bx-trash'></i>
            </div>
          </div>
          <p>
            <b>Description: </b>
            {task.desc}
          </p>
        </>
      ) : taskLoading ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Can't find task with ID: {id}</h1>
      )}
    </div>
  )
}
