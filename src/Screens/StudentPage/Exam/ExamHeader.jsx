import React, { useState } from "react";
import Countdown from "react-countdown";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { scoreActions } from "../../../Store";
const ExamHeader = () => {
  const dispatch = useDispatch();
  const time = useSelector((state) => state.paper.duration);
  const [settedDate, setDate] = useState(Date.now() + time);
  const [completed, setCompleted] = useState(false);
  // const enrollment =
  //   useSelector((state) => state.auth.id) ||
  //   JSON.parse(sessionStorage.getItem("stuid"));
  // const examid = useSelector((state) => state.paper.examid);
  // const totalscore = useSelector((state) => state.score.totalscore);
  // const totalMarks = useSelector((state) => state.score.totalMarks);
  // const correct = useSelector((state) => state.score.correct);
  // const negative = useSelector((state) => state.score.incorrect);
  // const unanswered = useSelector((state) => state.score.unanswered);
  // const numberofCorrect = useSelector((state) => state.score.numberofCorrect);
  // const numberofIncorrect = useSelector(
  //   (state) => state.score.numberofIncorrect
  // );
  // const numberofUnanswered = useSelector(
  //   (state) => state.score.numberofUnanswered
  // );

  // const sendMarks = async () => {
  //   const Response = await fetch(`/marks/${enrollment}`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       enrollment: enrollment,
  //       marks: {
  //         totalscore: totalscore,
  //         totalMarks: totalMarks,
  //         correctMarks: correct,
  //         negativeMarks: negative,
  //         unansweredMarks: unanswered,
  //         numberofCorrect: numberofCorrect,
  //         numberofIncorrect: numberofIncorrect,
  //         numberofUnanswered: numberofUnanswered,
  //       },
  //       examid: examid,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (Response.ok) {
  //   }
  // };
  // const answerArray = useSelector((state) => state.answer.answerArray);
  // const qPaper = useSelector((state) => state.paper.paper);
  // const calcMarks = () => {
  //   qPaper.forEach((element, index) => {
  //     if (!answerArray[index]) {
  //       dispatch(scoreActions.unanswered(Number(element.CorrectMarks)));
  //       dispatch(scoreActions.totalMarks(Number(element.CorrectMarks)));
  //     } else {
  //       if (Number(element.CorrectAnswer) === Number(answerArray[index])) {
  //         dispatch(scoreActions.add(Number(element.CorrectMarks)));
  //         dispatch(scoreActions.totalMarks(Number(element.CorrectMarks)));
  //       } else {
  //         dispatch(scoreActions.sub(Number(element.NegativeMarks)));
  //         dispatch(scoreActions.totalMarks(Number(element.CorrectMarks)));
  //       }
  //     }
  //   });
  // };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setCompleted(completed);
      // Render a countdown
    } else {
      // calcMarks();
      // sendMarks();
      setCompleted(completed);
      return (
        <div className={hours == 0 && minutes <= 5 ? "text-red-600" : ""}>{`${
          hours < 10 ? "0" + hours : hours
        } : ${minutes < 10 ? "0" + minutes : minutes} : ${
          seconds < 10 ? "0" + seconds : seconds
        }`}</div>
      );
    }
  };
  const person = useSelector((state) => state.auth.id);
  const id = sessionStorage.getItem("id");
  const personId = person || JSON.parse(id);
  if (completed) {
    return <Navigate to={`/marks/${personId}`} />;
  }
  return (
    <header className="h-[60px] w-full">
      <nav className="h-full">
        <ul className="flex justify-between items-center h-full px-5 list-none text-2xl font-chimono text-[#3C4852]">
          <li>DEPARTMENT OF IT</li>
          <li>
            <Countdown
              controlled={false}
              autoStart
              date={settedDate}
              renderer={renderer}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ExamHeader;
