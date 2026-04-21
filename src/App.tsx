import { useState, useEffect } from 'react'
import { PomodoroTimer } from './components/PomodoroTimer'
import { AssignmentsTracker } from './components/AssignmentsTracker'
import { StudyMusic } from './components/StudyMusic'
import './App.css'

type Page = 'timer' | 'assignments' | 'music'

const STUDY_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('assignments')
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Switch between study and break
            setIsBreak(!isBreak)
            return isBreak ? STUDY_TIME : BREAK_TIME
          }
          return prev - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isBreak])

  const renderPage = () => {
    switch (currentPage) {
      case 'timer':
        return (
          <PomodoroTimer
            timeLeft={timeLeft}
            isRunning={isRunning}
            isBreak={isBreak}
            onStart={() => setIsRunning(true)}
            onPause={() => setIsRunning(false)}
            onReset={() => {
              setIsRunning(false)
              setIsBreak(false)
              setTimeLeft(STUDY_TIME)
            }}
          />
        )
      case 'assignments':
        return <AssignmentsTracker />
      case 'music':
        return <StudyMusic />
      default:
        return (
          <PomodoroTimer
            timeLeft={timeLeft}
            isRunning={isRunning}
            isBreak={isBreak}
            onStart={() => setIsRunning(true)}
            onPause={() => setIsRunning(false)}
            onReset={() => {
              setIsRunning(false)
              setIsBreak(false)
              setTimeLeft(STUDY_TIME)
            }}
          />
        )
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
