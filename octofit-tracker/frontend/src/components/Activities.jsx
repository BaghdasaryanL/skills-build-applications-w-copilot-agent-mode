import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeList } from '../api'
import ResourceView from './ResourceView'

const ENDPOINT = `${API_BASE_URL}/api/activities/`

const columns = [
  { label: 'User', render: (row) => row.userId?.name ?? '—' },
  { label: 'Type', render: (row) => row.type },
  { label: 'Duration (min)', render: (row) => row.durationMinutes },
  { label: 'Calories', render: (row) => row.calories },
  { label: 'Distance (km)', render: (row) => row.distanceKm ?? '—' },
  { label: 'Date', render: (row) => new Date(row.date).toLocaleDateString() },
]

export default function Activities() {
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

  return <ResourceView title="Activities" status={status} error={error} columns={columns} rows={rows} />
}
