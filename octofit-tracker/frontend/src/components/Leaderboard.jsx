import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeList } from '../api'
import ResourceView from './ResourceView'

const ENDPOINT = `${API_BASE_URL}/api/leaderboard/`

const columns = [
  { label: 'Rank', render: (row) => row.rank },
  { label: 'User', render: (row) => row.userId?.name ?? '—' },
  { label: 'Points', render: (row) => row.points },
  { label: 'Period', render: (row) => row.period },
]

export default function Leaderboard() {
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

  return <ResourceView title="Leaderboard" status={status} error={error} columns={columns} rows={rows} />
}
