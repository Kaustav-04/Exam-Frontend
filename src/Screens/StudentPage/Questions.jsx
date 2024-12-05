import React, { Fragment, useState } from "react";
import Options from "./Options";

function Questions(props) {
  
  return (
    <Fragment>
      <div className="bg-white shadow-xl rounded-xl w-full h-auto p-8 mb-5 text-[#404c56]">
        <div className="font-normal text-3xl">
          Question {props.questionNumber}
        </div>
        <div className="text-[#7d8e97]">
          <span>+{props.marks} marks</span>,{" "}
          <span>{`${props.negative === 0 ? "-" : ""}${
            props.negative
          } marks`}</span>
        </div>
        <div className="bg-white rounded-2xl font-normal text-2xl p-3 ">
          {props.Qtext}
        </div>
      </div>
      <div className="flex justify-start items-start flex-wrap m-auto">
        {props.options.map((curr, index) => (
          <Options
            key={index}
            questionId={props.Qid}
            Qno={props.id}
            name={`Question${props.questionNumber}`}
            optionDetails={curr.option}
            index={index + 1}
            optionNumber={index + 1}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default Questions;
