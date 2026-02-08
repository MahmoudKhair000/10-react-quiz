import { useEffect, useState } from "react";

function Timer({ timer, handleClose }) {
  const [timeLeft, setTimeLeft] = useState(Number(timer));

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Calculate minutes
    const secs = seconds % 60; // Calculate remaining seconds using %60
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleClose();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, handleClose]);

  return (
    <>
      <div className="timer">{formatTime(timeLeft)}</div>
    </>
  );
}

export default Timer;
