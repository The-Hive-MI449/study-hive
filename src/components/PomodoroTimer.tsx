interface PomodoroTimerProps {
  timeLeft: number
  isRunning: boolean
  isBreak: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function PomodoroTimer({
  timeLeft,
  isRunning,
  isBreak,
  onStart,
  onPause,
  onReset,
}: PomodoroTimerProps) {

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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
        <button onClick={onStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={onPause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={onReset}>Reset</button>
      </section>
    </div>
  );
}
