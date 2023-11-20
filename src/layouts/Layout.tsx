import { useEffect } from 'react'
import Navbar from '../components/Navbar.tsx'
import { Outlet } from 'react-router-dom'
import { DocumentData, DocumentSnapshot, onSnapshot, orderBy, query } from 'firebase/firestore'
import { taskCollection } from '../firebase/firestore.ts'
import { setDocIds, setTasks } from '../redux/tasksSlice.ts'
import { useAppDispatch } from '../redux/hooks.ts'
import { Task } from '../types.ts'
import Model from '../components/Model.tsx'
import Footer from '../components/Footer.tsx'

export default function Layout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const q = query(taskCollection, orderBy('pin', 'desc'), orderBy('createAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      dispatch(
        setTasks(
          snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => {
            const task = doc.data()
            const timestamp = task!.createAt.toDate()
            return {
              ...task,
              createAt: timestamp,
            } as Task
          })
        )
      )
      dispatch(setDocIds(snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => doc.id)))
    })

    return unsubscribe
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Model />
    </>
  )
}
