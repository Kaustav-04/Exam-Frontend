import React, { useEffect, useState } from "react";
import ExamControl from "./ExamControl";
import ExamHeader from "./ExamHeader";
import QuestionCarausel from "./QuestionCarausel";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { qChangerActions, answerActions } from "../../../Store";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const Examination = () => {
  const dispatch = useDispatch();
  const currentQ = useSelector((state) => state.qChanger.currentQNo);
  const questions = useSelector((state) => state.paper.paper);
  const [prevdisable, setPrevDiable] = useState(true);
  const [nextdisable, setNextDiable] = useState(false);
  const params = useParams();
  useEffect(() => {
    const answer = {};
    const item = localStorage.getItem("answerArray");
    if (item) {
      dispatch(answerActions.setInitial(item));
    }
    dispatch(qChangerActions.toggleStart());
  }, []);

  const prevHandler = (e) => {
    console.log(currentQ)
    e.preventDefault();
    e.stopPropagation();
    if (currentQ < 1) {
      setNextDiable(false);
      setPrevDiable(true);
      // dispatch(qChangerActions.setQ(questions.length - 1));
    } else {
      dispatch(qChangerActions.prevQ());
    }
    // if (currSecNo > 0 && currentQ <= 0) {
    //   setNextDiable(false);
    //   console.log("type2");
    //   setPrevDiable(false);
    //   console.log(sectionList[Object.keys(sectionList)[currSecNo]].length - 1);
    //   dispatch(qChangerActions.prevSec());
    //   dispatch(
    //     qChangerActions.setQ(
    //       sectionList[Object.keys(sectionList)[currSecNo]].length - 1
    //     )
    //   );
    // }
    // if (currSecNo <= 0 && currentQ > 0) {
    //   setNextDiable(false);
    //   console.log("type3");
    //   setPrevDiable(false);
    //   dispatch(qChangerActions.prevQ());
    // }
    // if (currSecNo < 0 && currentQ < 0) {
    //   console.log("type4");
    //   setNextDiable(false);
    //   setPrevDiable(false);
    //   dispatch(qChangerActions.prevQ());
    // }
    dispatch(qChangerActions.toggleStart());
  };
  const saveNextHandler = (e) => {
    console.log(currentQ)
    e.preventDefault();
    e.stopPropagation();
    if (currentQ >= questions.length - 1) {
      setNextDiable(true);
      setPrevDiable(false);
      // dispatch(qChangerActions.setQ(0));
    } else {
      dispatch(qChangerActions.nextQ());
    }
    // if (
    //   currSecNo >= Object.keys(sectionList).length - 1 &&
    //   currentQ < sectionList[Object.keys(sectionList)[currSecNo]].length - 1
    // ) {
    //   setNextDiable(false);
    //   console.log("type2");
    //   setPrevDiable(false);
    //   dispatch(qChangerActions.nextQ());
    // }
    // if (
    //   currSecNo < Object.keys(sectionList).length - 1 &&
    //   currentQ >= sectionList[Object.keys(sectionList)[currSecNo]].length - 1
    // ) {
    //   setNextDiable(false);
    //   console.log("type3");
    //   setPrevDiable(false);
    //   dispatch(qChangerActions.nextSec());
    //   dispatch(qChangerActions.setQ(0));
    // }
    // if (
    //   currSecNo < Object.keys(sectionList).length - 1 &&
    //   currentQ < sectionList[Object.keys(sectionList)[currSecNo]].length - 1
    // ) {
    //   console.log("type4");
    //   setNextDiable(false);
    //   setPrevDiable(false);
    //   dispatch(qChangerActions.nextQ());
    // }
    dispatch(qChangerActions.toggleStart());
  };

  const markedHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      answerActions.add({
        type: "M",
        Qno: currentQ,
        answer: null,
        Qid: questions[currentQ].question_id,
      })
    );
    // const item = localStorage.getItem("answerArray");
    // const answerArray = JSON.parse(item);
    // if (
    //   !Object.keys(answerArray).includes(Object.keys(sectionList)[currSecNo])
    // ) {
    //   answerArray[Object.keys(sectionList)[currSecNo]] = [];
    // }
    // answerArray[Object.keys(sectionList)[currSecNo]][currentQ] = null;
    // localStorage.setItem("answerArray", JSON.stringify(answerArray));

    dispatch(qChangerActions.toggleStart());
  };
  const examEnded = useSelector((state) => state.paper.examEnded);
  const person = useSelector((state) => state.auth.id);
  const id = sessionStorage.getItem("id");
  const personId = person || Number(JSON.parse(id));
  if (examEnded) {
    return <Navigate to={`/results/${params.examid}/${params.enrollment}`} />;
  }
  return (
    <div className="overflow-hidden h-screen w-screen flex bg-[#fbfbfc]">
      <div className="relative w-full">
        <ExamHeader />
        <QuestionCarausel
          // currSecNo={currSecNo}
          currentQ={currentQ}
          questionList={questions}
        />
        <div className="absolute w-full bottom-0 left-0 h-1/6 bg-transparent flex items-center justify-between px-5 py-1">
          <Button
            style={{
              "background-color": "#FFFFFF",
              color: "#404c56",
              border: "#404c56a6 solid 2px",
              padding: "9px 15px",
              fontSize: "22px",
            }}
            disabled={prevdisable}
            onClick={prevHandler}
          >
            Previous
          </Button>
          <span style={{ display: "flex" }}>
            <Button
              style={{
                "background-color": "#FFFFFF",
                color: "#404c56",
                border: "#404c56a6 solid 2px",
                display: "flex",
                marginRight: "10px",
                padding: "9px 15px",
                fontSize: "22px",
              }}
              onClick={markedHandler}
            >
              <FontAwesomeIcon
                style={{
                  color: "#ffad3b",
                  fontSize: "1.5rem",
                  marginRight: "4px",
                }}
                icon={faBookmark}
              />{" "}
              Marked
            </Button>
            <Button
              onClick={saveNextHandler}
              disabled={nextdisable}
              style={{ padding: "9px 15px", fontSize: "22px" }}
            >
              {`Save & Next`}
            </Button>
          </span>
        </div>
      </div>
      <ExamControl questionList={questions} />
    </div>
  );
};

export default Examination;
