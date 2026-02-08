import { useState } from "react";
import Timer from "./Timer.js";

function QuestionBox({
  question,
  qLength,
  qIndex,
  answers,
  raIndex,
  totalScore,
  maxScore,
  timer,
  handleRight,
  handleWrong,
  handleNext,
  handleClose,
}) {
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <header className="progress-container">
        <progress max={15} value={qIndex + 1} />

        <p>
          Question <strong>{qIndex + 1}</strong> / {15}
        </p>

        <p>
          <strong>{totalScore}</strong> / {maxScore}
        </p>
      </header>
      <div className="question">
        <h4>{question}</h4>
        <div className="options">
          {answers.map((option, index) => (
            <button
              key={index}
              disabled={answered}
              className={`btn btn-option ${
                selectedIndex === index ? "answer" : ""
              } ${answered && index === raIndex ? "correct" : ""} ${
                answered && index !== raIndex ? "wrong" : ""
              }`}
              onClick={() => {
                // Drive visual state from React state instead of manipulating the DOM directly
                setSelectedIndex(index);
                setAnswered(true);
                if (index === raIndex) {
                  handleRight();
                } else {
                  handleWrong();
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Timer timer={timer} handleClose={handleClose} />
        <button
          className="btn btn-ui btn-next"
          disabled={!answered}
          onClick={() => {
            setAnswered(false);
            setSelectedIndex(null);
            handleNext();
          }}
        >
          {qIndex + 1 < qLength ? "Next Question" : "Finish"}
        </button>
      </footer>
    </>
  );
}

export default QuestionBox;
