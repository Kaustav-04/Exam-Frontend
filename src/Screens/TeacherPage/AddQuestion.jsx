import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import Questions from "./Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { modalActions, questionActions } from "../../Store";
import { examActions } from "../../Store";
import QuestionForm from "./QuestionForm";
import { Navigate, useParams } from "react-router-dom";
import { veiwQuestionByTeacher } from "../../Utils/api";

const QModal = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.questionopen);
  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(modalActions.questionclose());
  };
  return (
    <div
      className="w-screen h-screen bg-[#00000050] flex justify-center items-center z-40 absolute top-0 left-0"
      onClick={closeModal}
    >
      <motion.div
        initial={{ x: open ? "35vw" : "0vw" }}
        onClick={(e) => e.stopPropagation()}
        animate={{ x: open ? "0vw" : "35vw" }}
        transition={{ duration: 0.7 }}
        className="w-[35vw] h-[80vh] bg-[#ffffff] pl-5 z-40  overflow-y-scroll rounded-xl"
        id="mainModal"
      >
        <div className="sticky text-[2rem] mt-5 mb-3 text-[#3c4852]">
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
        </div>
        {props.children}
      </motion.div>
    </div>
  );
};

const AddQuestion = (props) => {
  const dispatch = useDispatch();
  const param = useParams();
  const getPreviouslySavedQuestions = async () => {
    const D = await veiwQuestionByTeacher({ exam_id: param?.examid });
    dispatch(questionActions.initialQuestion(D));
  };
  useEffect(() => {
    getPreviouslySavedQuestions();
  },[]);
  const paper = useSelector((state) => state.question);
  console.log(paper);
  const open = useSelector((state) => state.modal.questionopen);
  const openQmodal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(modalActions.questionopen());
  };

  return (
    <Fragment>
      <div
        className=" m-auto mt-28 pb-5 w-[70%] overflow-y-scroll"
        style={{ height: "calc(100vh - 145px)" }}
      >
        {paper.Qpaper.map((question, index) => (
          <Questions
            key={question.Qid}
            Qid={question.Qid}
            Qnum={index + 1}
            Qtext={question.Question}
            options={question.OptionList}
            correctAnswer={question.CorrectAnswer}
            marks={question.CorrectMarks}
            negative={question.NegativeMarks}
            reload={getPreviouslySavedQuestions}
          />
        ))}

        <button
          className="font-bold text-2xl p-3 my-5 border-none text-[#4C84EA] bg-[#EAF0FD] rounded-md w-full"
          onClick={openQmodal}
        >
          Add Question
        </button>
      </div>
      {open && (
        <QModal>
          <QuestionForm sname={props.sname} />
        </QModal>
      )}
    </Fragment>
  );
};

export default AddQuestion;
