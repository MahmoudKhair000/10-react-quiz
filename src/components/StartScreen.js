function StartScreen({ length, handleStart }) {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz!!</h2>
      <h3>
        <b>{length}</b> Questions To Test Your ReactJS Mastery
      </h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let's Start!
      </button>
    </div>
  );
}

export default StartScreen;
