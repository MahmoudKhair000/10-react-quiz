import { useEffect, useReducer } from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import StartScreen from "./components/StartScreen.js";
import QuestionBox from "./components/QuestionBox.js";
import FinishScreen from "./components/FinishScreen.js";

const initialState = {
  questions: [],
  // 'loading' | 'error' | 'ready' | 'active' | 'finished'
  status: "loading",
  timer: 10 * 60,
  currQIndex: 0,
  totalScore: 0,
  endingState: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error", error: action.payload };
    case "testStart":
      return { ...state, status: "active", currQIndex: 0 };
    case "nextQuestion":
      if (state.currQIndex + 1 < state.questions.length) {
        return {
          ...state,
          currQIndex: state.currQIndex + 1,
        };
      } else {
        return {
          ...state,
          status: "finished",
          endingState: "answeredAll",
        };
      }
    case "rightAnswer":
      return {
        ...state,
        totalScore: state.totalScore + state.questions[state.currQIndex].points,
      };
    case "wrongAnswer":
      return { ...state };
    case "testClose":
      return { ...state, status: "finished", endingState: "timeUp" };
    case "testRestart":
      return {
        ...state,
        status: "ready",
        currQIndex: 0,
        totalScore: 0,
        endingState: "",
      };
    // Reset timer
    // Reset high score
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [
    { questions, status, currQIndex, timer, totalScore, endingState },
    testDispatch,
  ] = useReducer(reducer, initialState);

  function fetchQuestions() {
    // local json-server API
    // online server API
    // fetch("https://one0-react-quiz-api.onrender.com/questions")
    fetch("http://localhost:8000/questions")
      // Handle the response
      .then((res) => res.json())
      // Dispatch the data to the reducer
      .then((data) => testDispatch({ type: "dataReceived", payload: data }))
      // handle errors in the fetch and dispatch them
      .catch((err) => {
        console.error(err);
        testDispatch({ type: "dataError", payload: err });
      });
  }
  // Fetch questions from the server when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  // // Log the current state just after it changes
  // useEffect(() => {
  //   console.log({ questions, status, currQIndex, totalScore });
  // }, [questions, status, currQIndex, totalScore]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            length={questions.length}
            handleStart={() => testDispatch({ type: "testStart" })}
          />
        )}
        {status === "active" && (
          <QuestionBox
            question={questions[currQIndex].question}
            qLength={questions.length}
            qIndex={currQIndex}
            answers={questions[currQIndex].options}
            raIndex={questions[currQIndex].correctOption}
            timer={timer}
            totalScore={totalScore}
            maxPossibleScore={280}
            handleRight={() => testDispatch({ type: "rightAnswer" })}
            handleWrong={() => testDispatch({ type: "wrongAnswer" })}
            handleNext={() => testDispatch({ type: "nextQuestion" })}
            handleClose={() => testDispatch({ type: "testClose" })}
          />
        )}
        {status === "finished" && (
          <FinishScreen
            endingState={endingState}
            score={totalScore}
            handleRestart={() => testDispatch({ type: "testRestart" })}
          />
        )}
      </Main>
      {/*
      <FinishScreen endingState={"answeredAll"} score={180} />
      */}
    </div>
  );
}
