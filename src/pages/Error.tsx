import { useRouteError } from 'react-router-dom'
import Navbar from '../components/Navbar.tsx'

export default function Error() {
  const error = useRouteError() as Error

  return (
    <>
      <Navbar />
      <div className='Page'>
        <h1>Error: {error.message}</h1>
        <h6>{JSON.stringify(error)}</h6>
      </div>
    </>
  )
}
