import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('leaderboard').then(setLeaders).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Find your pace.</h1><p>Celebrate consistency, personal bests, and the teammates who keep the energy high.</p></div></div>
      {error ? <p className="state error">{error}</p> : leaders.length === 0 ? <p className="state">The leaderboard is waiting for its first finish.</p> : <div className="table-wrap"><table className="data-table"><thead><tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th><th>Activities</th></tr></thead><tbody>{leaders.sort((a, b) => a.rank - b.rank).map((leader) => <tr key={leader._id || leader.username}><td><strong>#{leader.rank}</strong></td><td>{leader.username}</td><td><span className="tag">{leader.teamName}</span></td><td>{leader.points}</td><td>{leader.activitiesCompleted}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Leaderboard
