import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeList } from '../api'
import ResourceView from './ResourceView'

const ENDPOINT = `${API_BASE_URL}/api/users/`

const columns = [
  { label: 'Name', render: (row) => row.name },
  { label: 'Email', render: (row) => row.email },
  { label: 'Team', render: (row) => row.teamId?.name ?? '—' },
]

export default function Users() {
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

  return <ResourceView title="Users" status={status} error={error} columns={columns} rows={rows} />
}
