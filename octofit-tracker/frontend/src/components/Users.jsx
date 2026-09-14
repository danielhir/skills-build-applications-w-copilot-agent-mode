import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section>
      <div className="section-heading">
        <div><p className="eyebrow">Community pulse</p><h1>People in motion.</h1><p>A quick view of everyone showing up, putting in the work, and building momentum together.</p></div>
      </div>
      <div className="metric-row"><div className="metric"><strong>{users.length}</strong><span>active members</span></div><div className="metric"><strong>{new Set(users.map((user) => user.teamId)).size}</strong><span>teams represented</span></div><div className="metric"><strong>∞</strong><span>room to grow</span></div></div>
      {error ? <p className="state error">{error}</p> : users.length === 0 ? <p className="state">No members yet. Check the API connection or seed the database.</p> : <div className="data-grid">{users.map((user) => <article className="data-card" key={user._id || user.username}><span className="tag">Member</span><h2>{user.displayName || user.username}</h2><p>{user.email}</p><div className="card-meta"><span>@{user.username}</span><span>Ready to move</span></div></article>)}</div>}
    </section>
  )
}

export default Users
