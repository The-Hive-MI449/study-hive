import { useState } from 'react'
import { PomodoroTimer } from './components/PomodoroTimer'
import { AssignmentsTracker } from './components/AssignmentsTracker'
import { StudyMusic } from './components/StudyMusic'
import './App.css'

type Page = 'timer' | 'assignments' | 'music'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('assignments')

  const renderPage = () => {
    switch (currentPage) {
      case 'timer':
        return <PomodoroTimer />
      case 'assignments':
        return <AssignmentsTracker />
      case 'music':
        return <StudyMusic />
      default:
        return <PomodoroTimer />
    }
  }

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <h1 className="logo">Study Hive</h1>
          <ul className="nav-links">
            <li>
              <button
                className={`nav-button ${currentPage === 'timer' ? 'active' : ''}`}
                onClick={() => setCurrentPage('timer')}
              >
                Pomodoro Timer
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${currentPage === 'assignments' ? 'active' : ''}`}
                onClick={() => setCurrentPage('assignments')}
              >
                Assignments
              </button>
            </li>
            <li>
              <button
                className={`nav-button ${currentPage === 'music' ? 'active' : ''}`}
                onClick={() => setCurrentPage('music')}
              >
                Study Music
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="page-container">
        {renderPage()}
      </main>
    </>
  )
}

export default App
