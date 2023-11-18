import { useEffect } from 'react'
import Navbar from '../components/Navbar.tsx'
import { Outlet } from 'react-router-dom'
import { DocumentData, DocumentSnapshot, onSnapshot, orderBy, query } from 'firebase/firestore'
import { taskCollection } from '../firebase/firestore.ts'
import { setTasks } from '../redux/tasksSlice.ts'
import { useAppDispatch } from '../redux/hooks.ts'
import { Task } from '../types.ts'

export default function Layout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const q = query(taskCollection, orderBy('pin', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      dispatch(setTasks(snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => doc.data() as Task)))
    })

    return unsubscribe
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
