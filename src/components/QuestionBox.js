import { useState } from "react";
import Timer from "./Timer.js";
import Options from "./Options.js";
import Progress from "./Progress.js";
import Footer from "./Footer.js";
import NextButton from "./NextButton.js";

function QuestionBox({
  question,
  qLength,
  qIndex,
  answers,
  raIndex,
  totalScore,
  maxPossibleScore,
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
      <Progress
        answered={answered}
        max={15}
        qIndex={qIndex}
        totalScore={totalScore}
        maxPossibleScore={maxPossibleScore}
      />
      <div className="question">
        <h4>{question}</h4>
        <Options
          answers={answers}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setAnswered={setAnswered}
          raIndex={raIndex}
          handleRight={handleRight}
          handleWrong={handleWrong}
          answered={answered}
        />
      </div>
      <Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Timer timer={timer} handleClose={handleClose} />
        <NextButton
          answered={answered}
          setAnswered={setAnswered}
          setSelectedIndex={setSelectedIndex}
          handleNext={handleNext}
          qIndex={qIndex}
          qLength={qLength}
        />
      </Footer>
    </>
  );
}

export default QuestionBox;
