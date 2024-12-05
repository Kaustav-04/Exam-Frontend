import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { optionActions, questionActions } from "../../Store";
import { modalActions } from "../../Store";
import AddOptions from "./AddOptions";
import { useParams } from "react-router-dom";
import { addQuestionToExam } from "../../Utils/api";
import { message } from "antd";

const QuestionForm = (props) => {
  const dispatch = useDispatch();
  const param = useParams();
  console.log(param);
  const questionRef = useRef();
  const correctAnswerRef = useRef();
  const correctMarksRef = useRef();
  const negativeMarksRef = useRef();
  const options = useSelector((state) => state.options.options);
  const [optionNumber, setOptionNumber] = useState(1);

  const addQuestion = async ({ question, marks, negative, answer, option }) => {
    const msg = await addQuestionToExam({
      exam_id: param.examid,
      question: question,
      marks: marks,
      negative: negative,
      answer: answer,
      option: option,
    });

    if (msg?.error) {
      message.error(msg.error);
    } else {
      message.success("Question added successfully");
      return msg;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const qid = await addQuestion({
      question: questionRef.current.value,
      marks: Number(correctMarksRef.current.value),
      negative: Number(negativeMarksRef.current.value),
      answer: Number(correctAnswerRef.current.value),
      option: options,
    });
    dispatch(
      questionActions.addSectionQuestion({
        Qid: qid,
        Question: questionRef.current.value,
        OptionList: options,
        CorrectAnswer: Number(correctAnswerRef.current.value),
        CorrectMarks: Number(correctMarksRef.current.value),
        NegativeMarks: Number(negativeMarksRef.current.value),
      })
    );
    dispatch(modalActions.questionclose());
    dispatch(optionActions.reset());
    questionRef.current.value = "";
  };
  return (
    <div className="w-full mb-5 ">
      <form>
        <div className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
          <label>Question</label>
          <textarea
            required
            className="h-auto outline-none resize-none border-none w-full p-1 text-xl overflow-hidden overflow-y-auto placeholder:text-xl focus:outline-none"
            rows={10}
            ref={questionRef}
            placeholder={"Type Question Here"}
          />
        </div>
        {/* <div className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
          <label>Question Image</label>
          <input
            className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
            type="file"
          />
        </div> */}
        <AddOptions nextFunc={setOptionNumber} optionNumber={optionNumber} />
        <span className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
          <label>Correct Answer</label>
          <input
            className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
            max={4}
            ref={correctAnswerRef}
            defaultValue={1}
            min={1}
            type="number"
          />
        </span>
        <span className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
          <label>Correct Marks</label>
          <input
            className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
            ref={correctMarksRef}
            required
            defaultValue={1}
            min={1}
            type="number"
          />
        </span>
        <span className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
          <label>Negative Marks</label>
          <input
            className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
            min={0}
            ref={negativeMarksRef}
            defaultValue={0}
            type="number"
          />
        </span>
        <Button
          style={{ padding: "6px 24px", "font-size": "22px" }}
          onClick={submitHandler}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default QuestionForm;
