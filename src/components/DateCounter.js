import { useReducer } from "react";

function countReducer(dateState, action) {
  // return state + action;
  switch (action.process) {
    case "dec":
      return { ...dateState, count: dateState.count - dateState.step };
    case "inc":
      return { ...dateState, count: dateState.count + dateState.step };
    case "setCount":
      return { ...dateState, count: action.payload };
    case "setStep":
      return { ...dateState, step: action.payload };
    case "reset":
      return action.payload;

    default:
      break;
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 };

  // using useReducer hook
  const [dateState, dateDispatch] = useReducer(countReducer, initialState);
  // destructuring the dateState
  const { count, step } = dateState;

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // decrementing the count
    dateDispatch({ process: "dec" });
  };

  const inc = function () {
    // incrementing the count
    dateDispatch({ process: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dateDispatch({ process: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dateDispatch({ process: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dateDispatch({ process: "reset", payload: initialState });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          // defining the step
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        {/* controlling the date with buttons and input */}
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
