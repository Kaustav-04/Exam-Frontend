import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scoreActions } from "../../../Store";
import Analysis from "./Analysis";
import Button from "../../../components/Button";
import { Link, useParams } from "react-router-dom";

const Conatiner = (props) => {
  return (
    <div className="rounded-xl py-5 px-10 m-5 shadow-xl flex text-[#404c56] flex-col text-2xl font-medium">
      <div className="">{props.header}</div>
      <div className="">
        <span className="text-3xl" style={{ color: props.color }}>
          {props.marks}
          {props.total ? `/${props.total}` : null}
        </span>{" "}
        marks
      </div>
    </div>
  );
};

const Overveiw = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [done, setDone] = useState(false);
  const [marks, setMarks] = useState(null);
  const answerArray = useSelector((state) => state.answer.answerArray);
  const qPaper = useSelector((state) => state.paper.paper);
  const obj = {};
  const sendMarks = async () => {
    const Response = await fetch(`/marks/${params.enrollment}`, {
      method: "POST",
      body: JSON.stringify({
        enrollment: params.enrollment,
        marks: marks,
        examid: params.examid,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await Response.json();
    console.log(data);
    if (data.marks) {
      dispatch(
        scoreActions.Data({
          totalMarks: data.marks.totalMarks,
          correct: data.marks.correct,
          incorrect: data.marks.incorrect,
          numberofCorrect: data.marks.numberofCorrect,
          numberofIncorrect: data.marks.numberofIncorrect,
          numberofUnanswered: data.marks.numberofUnanswered,
          unanswered: data.marks.unanswered,
          totalscore: data.marks.totalscore,
        })
      );
    }
  };
  const calcSec = (i) => {
    let totalMarks = 0;
    let totalscore = 0;
    let correct = 0;
    let negative = 0;
    let unanswered = 0;
    let numberofCorrect = 0;
    let numberofIncorrect = 0;
    let numberofUnanswered = 0;
    console.log(i);
    qPaper[i].forEach((element, index) => {
      console.log(element);
      if (!answerArray[i][index]) {
        unanswered += Number(element.CorrectMarks);
        numberofUnanswered += 1;
        totalMarks += Number(element.CorrectMarks);
      } else {
        if (Number(element.CorrectAnswer) === Number(answerArray[i][index])) {
          correct += Number(element.CorrectMarks);
          totalMarks += Number(element.CorrectMarks);
          totalscore += Number(element.CorrectMarks);
          numberofCorrect += 1;
        } else {
          negative += Number(element.NegativeMarks);
          totalscore -= Number(element.NegativeMarks);
          totalMarks += Number(element.CorrectMarks);
          numberofIncorrect += 1;
        }
      }
    });
    obj[i] = {
      totalscore: totalscore,
      totalMarks: totalMarks,
      correctMarks: correct,
      negativeMarks: negative,
      unansweredMarks: unanswered,
      numberofCorrect: numberofCorrect,
      numberofIncorrect: numberofIncorrect,
      numberofUnanswered: numberofUnanswered,
    };
  };
  const calc = () => {
    let totalMarks = 0;
    let totalscore = 0;
    let correct = 0;
    let negative = 0;
    let unanswered = 0;
    let numberofCorrect = 0;
    let numberofIncorrect = 0;
    let numberofUnanswered = 0;
    Object.keys(qPaper).forEach((i) => (obj[i] = null));
    obj["total"] = null;
    Object.keys(qPaper).forEach((i) =>
      qPaper[i].forEach((element, index) => {
        if (!answerArray[i][index]) {
          unanswered += Number(element.CorrectMarks);
          numberofUnanswered += 1;
          totalMarks += Number(element.CorrectMarks);
        } else {
          if (Number(element.CorrectAnswer) === Number(answerArray[i][index])) {
            correct += Number(element.CorrectMarks);
            totalMarks += Number(element.CorrectMarks);
            totalscore += Number(element.CorrectMarks);
            numberofCorrect += 1;
          } else {
            negative += Number(element.NegativeMarks);
            totalscore -= Number(element.NegativeMarks);
            totalMarks += Number(element.CorrectMarks);
            numberofIncorrect += 1;
          }
        }
      })
    );
    obj["total"] = {
      totalscore: totalscore,
      totalMarks: totalMarks,
      correctMarks: correct,
      negativeMarks: negative,
      unansweredMarks: unanswered,
      numberofCorrect: numberofCorrect,
      numberofIncorrect: numberofIncorrect,
      numberofUnanswered: numberofUnanswered,
    };
    Object.keys(qPaper).forEach((i) => calcSec(i));
    setMarks(obj);
    setDone(true);
  };
  useEffect(() => {
    calc();
  }, []);
  const personId =
    useSelector((state) => state.auth.id) ||
    JSON.parse(sessionStorage.getItem("stuid"));
  const examid = useSelector((state) => state.paper.examid);
  const totalscore = useSelector((state) => state.score.totalscore);
  const totalMarks = useSelector((state) => state.score.totalMarks);
  const correct = useSelector((state) => state.score.correct);
  const negative = useSelector((state) => state.score.incorrect);
  const unanswered = useSelector((state) => state.score.unanswered);
  const numberofCorrect = useSelector((state) => state.score.numberofCorrect);
  const numberofIncorrect = useSelector(
    (state) => state.score.numberofIncorrect
  );
  const numberofUnanswered = useSelector(
    (state) => state.score.numberofUnanswered
  );
  if (done) {
    sendMarks();
  }
  localStorage.removeItem("answerArray");
  const missed = useSelector((state) => state.paper.missed);

  return (
    <div className="mt-[90px] w-screen flex flex-col">
      {missed && (
        <div className="text-xl text-red-600 text-center font-chimono font-medium">
          You Missed the Exam
        </div>
      )}
      <div className="w-screen h-auto px-4">
        <div className="mb-8 mr-8 text-3xl font-medium">Overveiw</div>
        {marks != null && (
          <Fragment>
            <div className="flex flex-wrap justify-around items-center h-fit">
              <Conatiner
                header={`Total Marks`}
                marks={marks["total"].totalscore}
                total={marks["total"].totalMarks}
                color={`#404c56`}
              />
              <Conatiner
                header={`Correct`}
                marks={marks["total"].correctMarks}
                color={`#12bf86`}
              />
              <Conatiner
                header={`Incorrect`}
                marks={marks["total"].negativeMarks}
                color={`#e6103b`}
              />
              <Conatiner
                header={`Unanswered`}
                marks={marks["total"].unansweredMarks}
                color={`#f5cd2a`}
              />
            </div>
            <div>
              <h2 className="mb-8 mr-8 text-3xl font-medium">
                Graphical Represetation of marks distribution
              </h2>
              <div className="h-[300px] w-auto">
                <Analysis
                  answer={marks["total"].numberofCorrect}
                  incorrect={marks["total"].numberofIncorrect}
                  unanswered={marks["total"].numberofUnanswered}
                />
              </div>
            </div>
          </Fragment>
        )}
        <div>
          <h2 className="mb-8 mr-8 text-3xl font-medium flex flex-wrap justify-around">
            Sectional Representation of the Results
          </h2>
          {marks != null &&
            Object.keys(marks).map((i) => {
              if (i === "total") {
                return;
              } else {
                return (
                  <div>
                    <h2>For section {i}</h2>
                    <div className="h-[300px] w-auto">
                      <Analysis
                        answer={marks[i].numberofCorrect}
                        incorrect={marks[i].numberofIncorrect}
                        unanswered={marks[i].numberofUnanswered}
                      />
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <Link to="/">
          <Button className="mx-5 sm:mx-0">Back to Main Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default Overveiw;
