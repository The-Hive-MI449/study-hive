import BeeSVG from '../assets/beeSVG'

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

      <section className="timer-display">
        <div className="timer-hexagon-wrapper">
          <div className="timer-main-hex">
            <div className="timer-main-hex-inner">
              <div className="timer">{formatTime(timeLeft)}</div>
              <div className="timer-status">{isBreak ? 'Break Time!' : 'Let\'s Get Studying!'}</div>
            </div>
          </div>

          <div className="timer-controls-hex">
            <div className="control-hex">
              <div className="control-hex-inner">
                <button onClick={onReset} title="Reset timer">
                  <span style={{ fontSize: '30px', marginBottom: '5px' }}>↺</span>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="bee-control">
        <button 
          onClick={isRunning ? onPause : onStart}
          title={isRunning ? 'Pause timer' : 'Start timer'}
        >
          <BeeSVG />
        </button>
        <span className="bee-label">{isRunning ? 'Pause' : 'Start'}</span>
      </div>
    </div>
  );
}
