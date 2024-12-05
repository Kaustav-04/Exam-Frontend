import React, { Fragment } from "react";
import Button from "../../../components/Button";
import QuestionMark from "./QuestionMark";
import { faCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircle as hollow } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { modalActions, paperActions } from "../../../Store";
import { useState } from "react";

const Progress = (props) => {
  const marked = useSelector((state) => state.answer.marked);
  const ans = useSelector((state) => state.answer.answer);
  const questionList = useSelector((state) => state.paper.paper);

  let answeredCount = 0;
  let markedCount = 0;
  let totalCount = questionList.length;
  console.log(ans);
  Object.keys(ans).forEach((i) => {
    if (ans[i].type === "A") {
      answeredCount += 1;
    } else if (ans[i].type === "M") {
      markedCount += 1;
    }
  });
  // Object.values(ans).forEach((i) => {
  //   answeredCount = answeredCount + i.filter((i) => i != null && ans[i].type === "A").length
  // })
  // Object.values(ans).forEach((i) => {
  //   markedCount = markedCount + i.filter((i) => ans[i].type === "M" ).length
  // })
  // Object.values(ans).forEach((i) => {
  //   totalCount = totalCount + i.length
  // })
  return (
    <div className="justify-around flex items-center w-full text-xl">
      <span className="mx-2 my-2">
        <FontAwesomeIcon
          style={{ color: "#08bd80", marginRight: "10px" }}
          icon={faCircle}
        />
        {`${answeredCount} answered`}
      </span>
      <span className="mx-2 my-2">
        <FontAwesomeIcon
          style={{ color: "#ffaf41", marginRight: "10px" }}
          icon={faCircle}
        />
        {`${markedCount} marked`}
      </span>
      <span className="mx-2 my-2">
        <FontAwesomeIcon
          style={{ color: "#b2bcc2", marginRight: "10px" }}
          icon={hollow}
        />
        {`${totalCount - answeredCount} Unanswered`}
      </span>
    </div>
  );
};

const EModal = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.examopen);
  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(modalActions.examclose());
  };
  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(paperActions.endExam());
  };

  return (
    <div
      className="h-screen w-screen bg-[#00000060] flex items-center justify-center z-20 absolute top-0 left-0"
      onClick={closeModal}
    >
      <motion.div
        initial={{ x: open ? "35vw" : "0vw" }}
        onClick={(e) => e.stopPropagation()}
        animate={{ x: open ? "0vw" : "35vw" }}
        transition={{ duration: 0.7 }}
        className=" bg-white pl-4 z-40 rounded-tl-md rounded-bl-md py-2"
        id="mainModal"
      >
        <div className="text-[2rem] mt-4 mb-3 text-[#3c4852]">
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Progress />
          <Button
            onClick={submitHandler}
            style={{ padding: "5px 10px", fontSize: "25px" }}
          >
            Comfirm Submit
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const ExamControl = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.examopen);
  // const marked = useSelector((state) => state.answer.marked);
  const ans = useSelector((state) => state.answer.answer);
  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(modalActions.examopen());
  };

  console.log(props.questionList);
  return (
    <Fragment>
      <div className="bg-white w-4/12 relative flex flex-col items-center justify-center shadow-2xl">
        <Button
          onClick={openModal}
          style={{
            position: "absolute",
            padding: "6px 12p,",
            fontSize: "21px",
            top: "20px",
            right: "20px",
          }}
        >
          End Test
        </Button>
        <Progress questionList={props.questionList} />
        <div className="bg-white w-full rounded-lg flex flex-col h-2/5 overflow-y-scroll">
          {/* {Object.keys(props.sectionList).map((sec, j) => (
            <div className="w-full flex flex-wrap justify-start my-5 mx-5" key={j}>
              <span className="w-full text-center">Section {sec}</span> */}
          {props.questionList.map((i, index) => {
            <QuestionMark
              key={index}
              id={index}
              // sec={j}
              answered={ans[index]?.type === "A" ? true : false}
              marked={ans[index]?.type === "M" ? true : false}
              num={index + 1}
            />;
          })}
        </div>
        {/* ))} */}
        {/* </div> */}
      </div>
      {open && <EModal></EModal>}
    </Fragment>
  );
};

export default ExamControl;
