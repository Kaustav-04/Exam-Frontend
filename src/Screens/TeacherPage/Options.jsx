import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Options = (props) => {
  return (
    <div className='flex pl-8 my-3 items-center'>
      <div className='font-normal text-3xl mr-1'>{props.Onum}.</div>
      <div className='bg-[#ffffff] rounded-md pl-3 w-full relative flex justify-between items-center'>
        <div className='font-normal text-2xl text-[#7F8086]'>{props.Otext}</div>
        <div className='h-[60px] w-[100px] flex'>
          <span className='flex justify-center items-center w-[46px] text-3xl h-full'>
            <FontAwesomeIcon color={props.correctAnswer == props.Onum ? '#47BCA4' : '#e82121'} icon={props.correctAnswer == props.Onum ? faCheck : faXmark} />
          </span>
          {/* <span className={classes.Odelete}>
            <FontAwesomeIcon icon={faXmark} />
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default Options;
