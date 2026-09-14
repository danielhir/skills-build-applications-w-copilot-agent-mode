import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])

  return (
    <section>
      <div className="section-heading"><div><p className="eyebrow">Your next session</p><h1>Move with intent.</h1><p>Practical workouts matched to different energy levels, goals, and ways of moving.</p></div></div>
      {error ? <p className="state error">{error}</p> : workouts.length === 0 ? <p className="state">No workouts are available yet.</p> : <div className="data-grid">{workouts.map((workout) => <article className="data-card" key={workout._id || workout.title}><span className="tag">{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><div className="card-meta"><span>{workout.durationMinutes} minutes</span><span>{workout.target}</span></div></article>)}</div>}
    </section>
  )
}

export default Workouts
