import React, { Fragment } from "react";
import { useRef } from "react";
import { optionActions } from "../../Store";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";

const AddOptions = (props) => {
  const dispatch = useDispatch();
  const optionRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.nextFunc((prev) => prev + 1);
    dispatch(optionActions.add({ option: optionRef.current.value }));
    optionRef.current.value = "";
  };

  return (
    <Fragment>
      <div className="text-2xl w-full border border-[#3c485245] px-1 py-3 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
        <label>Option {props.optionNumber} </label>
        <input
          className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
          type="text"
          ref={optionRef}
          placeholder={`Type Option ${props.optionNumber} Here`}
          required
        />
        <hr className="w-[95%] bg-[#3c485245] my-3 h-[2px]" />
        {/* <label>Option {props.optionNumber} Image</label>
        <input
          className="h-[40px] border-none text-lg bg-transparent w-[70%] mt-3 focus:outline-none placeholder:text-[#828384]"
          type="file"
        /> */}
      </div>
      <button
        className="font-bold text-2xl p-3 my-3 border-none text-[#4C84EA] bg-[#EAF0FD] rounded-md w-full"
        onClick={submitHandler}
      >
        Add Option & Next
      </button>
    </Fragment>
  );
};

export default AddOptions;
