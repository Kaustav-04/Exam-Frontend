import React, { Fragment, useState } from "react";
import Button from "../../components/Button";
import Questions from "./Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../Store";
import { examActions } from "../../Store";
import QuestionForm from "./QuestionForm";
import { Navigate } from "react-router-dom";
import Section from "./Section";
import SectionForm from "./SectionForm";

const QModal = (props) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.secopen);
  const closeModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(modalActions.secclose());
  };
  return (
    <div
      className="w-screen h-screen bg-[#00000050] flex justify-center items-center z-20 absolute top-0 left-0"
      onClick={closeModal}
    >
      <motion.div
        initial={{ x: open ? "35vw" : "0vw" }}
        onClick={(e) => e.stopPropagation()}
        animate={{ x: open ? "0vw" : "35vw" }}
        transition={{ duration: 0.7 }}
        className="w-[35vw] h-auto py-5 bg-[#ffffff] pl-5 z-40  overflow-y-scroll rounded-xl"
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

const AddSection = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.secopen);
  const [navigate, setNavigate] = useState(false);
  const openQmodal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(modalActions.secopen());
  };
  const SectionList = useSelector((state) => state.question.Qpaper);
  console.log(SectionList)
  const submitQuestion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      examActions.addQuestionPaper({
        QuestionData: SectionList,
      })
    );
    sendQuestionData();
  };
  const detail = useSelector((state) => state.exampaper);
  const sendQuestionData = async () => {
    const Response = await fetch("/addQ", {
      method: "POST",
      body: JSON.stringify({
        ExamPaper: {
          examid: detail.id,
          questionList: SectionList,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (Response.ok) {
      setNavigate(true);
    }
  };

  if (navigate) {
    return <Navigate to="/sharecode" />;
  }
  return (
    <Fragment>
      <div className="w-screen h-screen relative overflow-hidden">
        <Button
          style={{
            "align-items": "center",
            "justify-content": "center",
            transform: "none",
            position: "absolute",
            width: "141px",
            height: "48px",
            right: "60px",
            top: "37px",
            "font-size": "24px",
            display: "flex",
            "line-height": "40px",
          }}
          onClick={submitQuestion}
        >
          Submit
        </Button>
        <div
          className=" m-auto mt-28 pb-5 w-[70%] overflow-y-scroll"
          style={{ height: "calc(100vh - 145px)" }}
        >
          <button
            className="font-bold text-2xl p-3 border-none text-[#4C84EA] bg-[#EAF0FD] rounded-md w-full"
            onClick={openQmodal}
          >
            Add Section
          </button>
          {Object.keys(SectionList).map((section, index) => (
            <Section key={index} sno={index+1} sname={section} qList={SectionList[section]} />
          ))}
        </div>
      </div>
      {open && (
        <QModal>
          <SectionForm />
        </QModal>
      )}
    </Fragment>
  );
};

export default AddSection;
