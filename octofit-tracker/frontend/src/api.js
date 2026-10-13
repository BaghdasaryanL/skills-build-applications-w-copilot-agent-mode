// Falls back to the name embedded in the forwarded page URL (<name>-5173.app.github.dev).
const hostMatch = window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || hostMatch?.[1]

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

// Accepts either a plain array or a paginated `{ results: [...] }` response.
export function normalizeList(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.results)) return data.results
  return []
}
