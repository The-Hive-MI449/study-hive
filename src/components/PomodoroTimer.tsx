export function PomodoroTimer() {
  return (
    <div className="pomodoro-container">
      <h1>Pomodoro Timer</h1>
      <section className="pomodoro-info">
        <p>
          Our timer uses a 25 minute study interval, followed by a 5 minute break to help combat mental fatigue. Studies show it improves focus, boosts motivation through urgency, and helps maintain high-level cognitive performance over time compared to continuous, unstructured work.
        </p>
      </section>
      
      <section className="timer-display">
        {/* Timer UI will go here */}
        <div className="timer">25:00</div>
        <p>Study Time</p>
      </section>

      <section className="timer-controls">
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </section>
    </div>
  );
}
