import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../../Store";
import AddQuestion from "./AddQuestion";
import Questions from "./Questions";

const Section = (props) => {
  const dispatch = useDispatch();
  const sname = useSelector((state) => state.question.curSec);
  return (
    <div
      onClick={() => {
        console.log(props.sname);
        dispatch(questionActions.setSec(props.sname));
      }}
      className="w-full my-3 h-auto px-2 border-2 border-dashed rounded-xl border-gray-400"
    >
      <div className="w-full text-center my-3 text-2xl font-bold">
        Section-{props.sno}: {props.sname}
      </div>
      {props.qList.map((question, index) => (
        <Questions
          key={index + 1}
          Qnum={index + 1}
          Qtext={question.Question}
          options={question.OptionList}
          correctAnswer={question.CorrectAnswer}
        />
      ))}
      <AddQuestion sname={sname} />
    </div>
  );
};

export default Section;
