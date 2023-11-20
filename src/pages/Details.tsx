import { useParams } from 'react-router-dom'

export default function Details() {
  const { id } = useParams()

  return (
    <div>
      <h1>Details:{id}</h1>
    </div>
  )
}
