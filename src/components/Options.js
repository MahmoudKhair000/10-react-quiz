function Options({
  answers,
  selectedIndex,
  setSelectedIndex,
  setAnswered,
  raIndex,
  handleRight,
  handleWrong,
  answered,
}) {
  return (
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
  );
}

export default Options;
