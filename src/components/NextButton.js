function NextButton({
  answered,
  setAnswered,
  setSelectedIndex,
  handleNext,
  qIndex,
  qLength,
}) {
  return (
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
  );
}

export default NextButton;
