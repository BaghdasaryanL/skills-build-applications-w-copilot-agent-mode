import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeList } from '../api'
import ResourceView from './ResourceView'

const ENDPOINT = `${API_BASE_URL}/api/workouts/`

const columns = [
  { label: 'Workout', render: (row) => row.title },
  { label: 'Description', render: (row) => row.description },
  { label: 'Type', render: (row) => row.activityType },
  { label: 'Duration (min)', render: (row) => row.durationMinutes },
  { label: 'Difficulty', render: (row) => row.difficulty },
]

export default function Workouts() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(ENDPOINT, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setRows(normalizeList(data))
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setStatus('error')
      })
    return () => controller.abort()
  }, [])

  return <ResourceView title="Workouts" status={status} error={error} columns={columns} rows={rows} />
}
