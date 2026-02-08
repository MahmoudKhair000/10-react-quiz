import { useEffect } from "react";

export default function FinishScreen({ endingState, score, handleRestart }) {
  const percentage = (score / 280) * 100;

  const ls = localStorage;
  const getHighscore = () => ls.getItem("highscore") || score;
  const setHighscore = (score) => {
    if (score > getHighscore()) ls.setItem("highscore", score);
    else return;
  };

  function getEmoji() {
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
    return emoji;
  }

  useEffect(() => {
    setHighscore(score);
    // to ignore next line with comment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <div>
      {endingState === "answeredAll" && (
        <>
          <p className="result">
            <span>{getEmoji()}</span>
            Your final score is <span>{score}</span> out of
            <span> 280 ({((score / 280) * 100).toFixed(2)}%)</span>
          </p>
          <div className="highscore">(Highscore: {getHighscore()} points)</div>
        </>
      )}
      {/* <div className="highscore">(Highscore: 100 points)</div> */}
      {endingState === "timeUp" && (
        <div className="result">Time's up! Thanks for playing!</div>
      )}
      <footer>
        <button className="btn btn-ui" onClick={() => handleRestart()}>
          Restart Quiz
        </button>
      </footer>
    </div>
  );
}
