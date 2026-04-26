import React from 'react'

type NavTarget = 'timer' | 'assignments' | 'music'

export function LandingPage({ onNavigate }: { onNavigate: (p: NavTarget) => void }) {
  return (
    <section className="landing">
      <div className="hex-grid hex-cluster">
        <button className="hex-link hex-top" onClick={() => onNavigate('timer')} aria-label="Go to Pomodoro Timer">
          <div className="hex-outer">
            <div className="hex-inner" aria-hidden="true"></div>
          </div>
          <span className="hex-label kdam-thmor-pro-regular">Pomodoro<br />Timer</span>
        </button>

        <button className="hex-link hex-left" onClick={() => onNavigate('music')} aria-label="Go to Study Music">
          <div className="hex-outer">
            <div className="hex-inner" aria-hidden="true"></div>
          </div>
          <span className="hex-label kdam-thmor-pro-regular">Study<br />Music</span>
        </button>

        <button className="hex-link hex-right" onClick={() => onNavigate('assignments')} aria-label="Go to Assignments Tracker">
          <div className="hex-outer">
            <div className="hex-inner" aria-hidden="true"></div>
          </div>
          <span className="hex-label kdam-thmor-pro-regular">Assignments<br />Tracker</span>
        </button>
      </div>
    </section>
  )
}

export default LandingPage
