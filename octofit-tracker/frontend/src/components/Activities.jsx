import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Recent effort</p><h1>Every rep counts.</h1><p>Fresh activity across the OctoFit community, sorted from the most recent finish.</p></div></div>
      {error ? <p className="state error">{error}</p> : activities.length === 0 ? <p className="state">No activity logged yet.</p> : <div className="table-wrap"><table className="data-table"><thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id || `${activity.username}-${activity.completedAt}`}><td><strong>{activity.username}</strong></td><td><span className="tag">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : '—'}</td><td>{activity.points}</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Activities
