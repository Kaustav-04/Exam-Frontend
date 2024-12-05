import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { paperActions, answerActions, qChangerActions } from "../../Store";
import { useRef } from "react";
import { json, Navigate, useNavigate } from "react-router-dom";
import WaitingCounter from "./WaitingCounter";
import { studentStartExam } from "../../Utils/api";

const Waiting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authenticated = sessionStorage.getItem("Authenticated");
    if (authenticated === "true") {
    } else {
      navigate(`/Student/login`);
    }
  }, []);
  const examCodeRef = useRef();
  const dispatch = useDispatch();
  const person = useSelector((state) => state.auth.id);
  const id = sessionStorage.getItem("stuid");
  const personId = person || Number(JSON.parse(id));
  const getPaper = () => {
    fetchPaper();
  };
  const fetchPaper = async () => {
    const data = await studentStartExam({
      exam_id: examCodeRef.current.value,
    });
    dispatch(paperActions.eligibility(data.status !== "Not Started"));
    if (data.status === "Not Started" || data.status === "Ongoing") {
      dispatch(paperActions.setId(data.exam.exam_id));
      dispatch(paperActions.fetchPaper(data.exam.questions));
      dispatch(paperActions.duration(data.duration));
      dispatch(paperActions.remainTime(0-data.timeFromStart));
      if(data.status === "Ongoing"){
        setCompleted(true)
        dispatch(paperActions.duration(data.duration - data.timeFromStart));
      }else{
      setCode(true);
      }
    }
    if (data.status === "Ended") {

      dispatch(paperActions.missed());
      dispatch(paperActions.endExam());
      dispatch(paperActions.duration(data.duration + data.remainingTime));
    }
  };
  const [code, setCode] = useState(false);
  const [completed, setCompleted] = useState(false);
  const examid = useSelector((state) => state.paper.examid);
  const paper = useSelector((state) => state.paper);
  if (completed) {
    // const item = localStorage.getItem("answerArray");
    // if (item) {
    //   const objectItem = JSON.parse(item);
    //   console.log(objectItem);
    //   dispatch(answerActions.setInitial(objectItem));
    //   dispatch(
    //     qChangerActions.setSec(
    //       Object.keys(objectItem).length === 0
    //         ? 0
    //         : Object.keys(objectItem).length - 1
    //     )
    //   );
    //   dispatch(
    //     qChangerActions.setQ(
    //       Object.keys(objectItem).length === 0
    //         ? 0
    //         : Object.keys(objectItem)[Object.keys(objectItem).length - 1]
    //             .length - 1
    //     )
    //   );
    // } else {
    //   localStorage.setItem("answerArray", JSON.stringify({}));
    // }
    return <Navigate to={`/${examid}/12021002019019/exam`} />;
  }
  return (
    <Fragment>
      {code && <WaitingCounter compFunc={setCompleted} />}
      {!code && (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <div className="text-2xl w-1/3 border border-[#3c485245] px-1 py-2 rounded-xl mb-5 flex flex-col overflow-hidden">
            <label>Exam Code</label>
            <input
              className="text-[1.5rem] m-2 mt-3"
              type="text"
              ref={examCodeRef}
              placeholder={"Type Exam Code Here"}
              required
            />
          </div>
          <Button onClick={getPaper}>Submit</Button>
          {!paper.missed && !paper.eligibility && (
            <div className="text-xl font-medium font-chimono text-red-600 mt-3">
              You Already apperead the test
            </div>
          )}
          {paper.missed && !paper.eligibility && (
            <div className="text-xl font-medium font-chimono text-red-600 mt-3">
              You Missed the test
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Waiting;
