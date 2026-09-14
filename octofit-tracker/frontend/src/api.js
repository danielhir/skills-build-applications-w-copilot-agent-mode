const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiUrls = {
  activities: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/',
  leaderboard: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/',
  teams: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/',
  users: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/',
  workouts: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/',
}

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(apiUrls[resource] || `http://localhost:8000/api/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource}.`)
  return responseItems(await response.json())
}
