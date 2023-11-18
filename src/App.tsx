import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout.tsx'
import Todo from './pages/Todo.tsx'
import Done from './pages/Done.tsx'
import Add from './pages/Add.tsx'
import Error from './pages/Error.tsx'

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<Error />}
      >
        <Route index element={<Todo />} />
        <Route path='/done' element={<Done />} />
        <Route path='/add' element={<Add />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
