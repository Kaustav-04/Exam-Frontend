import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { modalActions, questionActions } from "../../Store";
import Button from "../../components/Button";

const SectionForm = () => {
  const nameRef = useRef();
  const dispatch = useDispatch();
  return (
    <div className="w-full mb-5 flex flex-col">
      <div className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
        <label>Section Name</label>
        <input
          className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
          placeholder="Type Section Name"
          ref={nameRef}
          type="text"
        />
      </div>
      <Button
        style={{ padding: "6px 24px", "font-size": "22px" }}
        onClick={() => {
          dispatch(questionActions.addSec({ sname: nameRef.current.value }));
          dispatch(modalActions.secclose());
          dispatch(questionActions.setSec(nameRef.current.value))
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default SectionForm;
