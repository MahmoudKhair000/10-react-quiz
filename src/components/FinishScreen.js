function FinishScreen({ endingState, score, handleRestart }) {
  const percentage = Math.round((score / 280) * 100);
  function getEmoji() {
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
    return emoji;
  }

  if (localStorage.getItem("highscore") < score) {
    localStorage.setItem("highscore", score);
  }

  let highScore = localStorage.getItem("highscore");

  return (
    <div>
      {endingState === "answeredAll" && (
        <>
          <h3 style={{ textAlign: "center" }}>
            Congratulations! Thanks for playing!
          </h3>
          <p className="result">
            <span>{getEmoji()}</span>
            Your final score is <span>{score}</span> out of
            <span> 280 ({percentage}%)</span>
          </p>
          <div className="highscore">(Highscore: {highScore} points)</div>
        </>
      )}
      {/* <div className="highscore">(Highscore: 100 points)</div> */}
      {endingState === "timeUp" && (
        <>
          <h3 style={{ textAlign: "center" }}>
            Time's up! Thanks for playing!
          </h3>
          <p className="result">
            <span>{getEmoji()}</span>
            Your final score is <span>{score}</span> out of
            <span> 280 ({percentage}%)</span>
          </p>
          <div className="highscore">(Highscore: {highScore} points)</div>
        </>
      )}
      <footer>
        <button className="btn btn-ui" onClick={() => handleRestart()}>
          Restart Quiz
        </button>
      </footer>
    </div>
  );
}

export default FinishScreen;
