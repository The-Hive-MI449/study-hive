import { useState, useEffect } from 'react'
import { PomodoroTimer } from './components/PomodoroTimer'
import { AssignmentsTracker } from './components/AssignmentsTracker'
import { StudyMusic } from './components/StudyMusic'
import './App.css'

import { LandingPage } from './components/LandingPage'

type Page = 'landing' | 'timer' | 'assignments' | 'music'

const STUDY_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
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
      case 'landing':
        return <LandingPage onNavigate={(p) => setCurrentPage(p)} />
      
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
      <header className="site-header">
        <img
          src="/src/assets/logo.png"
          alt="Study Hive logo"
          className="site-logo"
          onClick={() => setCurrentPage('landing')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setCurrentPage('landing') }}
        />
        {currentPage === 'landing' && (
          <>
            <h1>Study Hive</h1>
            <p className="site-tagline work-sans">for the especially busy bee</p>
          </>
        )}
      </header>

      <main className="page-container">
        {renderPage()}
      </main>
    </>
  )
}

export default App
