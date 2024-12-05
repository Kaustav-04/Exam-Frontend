import React from "react";
import Questions from "../Questions";
import { useSelector } from "react-redux";

const QuestionCarausel = (props) => {
  const questionDetails = props.questionList[props.currentQ]
  console.log(questionDetails)

  return (
    <div className='relative px-12 py-12 pb-5 overflow-y-scroll h-5/6'>
      {/* <div>{Object.keys(props.sectionList)[props.currSecNo]}</div> */}
      <Questions
        id={props.currentQ}
        Qid={questionDetails.question_id}
        style={{ "margin-top": "20px" }}
        options={questionDetails.option}
        questionNumber={props.currentQ + 1}
        marks={questionDetails.marks}
        negative={questionDetails.negative}
        Qtext={questionDetails.question}
      />
    </div>
  );
};

export default QuestionCarausel;
