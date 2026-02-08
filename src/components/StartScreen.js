function StartScreen({ length, handleStart }) {
  // const getHighscore = () => localStorage.getItem("highscore") ?? 0;

  return (
    <div className="start">
      <h2>Welcome To The React Quiz!!</h2>
      <h3>
        <b>{length}</b> Questions To Test Your ReactJS Mastery
      </h3>

      {/* {getHighscore() > 0 ? (
        <h4>Highscore: {getHighscore()}</h4>
      ) : (
        <h4>No highscore yet</h4>
      )} */}

      <button className="btn btn-ui" onClick={handleStart}>
        Let's Start!
      </button>
      <br />
    </div>
  );
}

export default StartScreen;
