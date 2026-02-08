import { useEffect, useRef } from "react";

function Progress({ answered, max, qIndex, totalScore, maxPossibleScore }) {
  const progressEl = useRef(null);
  useEffect(() => {
    if (answered) {
      progressEl.current.value = qIndex + 1;
    }
  }, [answered, qIndex]);

  return (
    <div>
      <header className="progress-container">
        <progress ref={progressEl} max={max} value={qIndex} />
        <p>
          Question <strong>{qIndex + 1}</strong> / {max}
        </p>
        <p>
          <strong>{totalScore}</strong> / {maxPossibleScore}
        </p>
      </header>
    </div>
  );
}

export default Progress;
