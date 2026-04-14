import { useState, useEffect } from 'react'

const STUDY_TIME = 25 * 60 // 25 minutes in seconds
const BREAK_TIME = 5 * 60 // 5 minutes in seconds

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(STUDY_TIME)
  }

  return (
    <div className="pomodoro-container">
      <h1>Pomodoro Timer</h1>
      <section className="pomodoro-info">
        <p>
          Our timer uses a 25 minute study interval, followed by a 5 minute break to help combat mental fatigue. Studies show it improves focus, boosts motivation through urgency, and helps maintain high-level cognitive performance over time compared to continuous, unstructured work.
        </p>
      </section>

      <section className="timer-display">
        <div className={`timer ${isBreak ? 'break' : 'study'}`}>
          {formatTime(timeLeft)}
        </div>
        <p>{isBreak ? 'Break Time!' : 'Let\'s Get Studying!'}</p>
      </section>

      <section className="timer-controls">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleReset}>Reset</button>
      </section>
    </div>
  );
}
