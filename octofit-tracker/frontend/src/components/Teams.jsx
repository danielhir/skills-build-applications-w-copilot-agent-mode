import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Better together.</h1><p>Small circles, shared goals, and a little healthy competition make progress stick.</p></div></div>
      {error ? <p className="state error">{error}</p> : teams.length === 0 ? <p className="state">No teams have been created yet.</p> : <div className="data-grid">{teams.map((team) => <article className="data-card" key={team._id || team.name} style={{ borderTop: `4px solid ${team.color || 'var(--green)'}` }}><h2>{team.name}</h2><p>{team.description}</p><div className="card-meta"><span>{team.memberUsernames?.length || 0} members</span><span>{team.color || 'Team'}</span></div></article>)}</div>}
    </section>
  )
}

export default Teams
