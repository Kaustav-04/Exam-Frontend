import React, { useState } from "react";
import { useSelector } from "react-redux";
import WaitingUI from "../../components/WaitingUI";
import Countdown from "react-countdown";

const WaitingCounter = (props) => {
  const time = useSelector((state) => state.paper.remaintime);
  const [settedDate, setDate] = useState(Date.now() + (time));
  
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      props.compFunc(completed);
      // Render a countdown
    } else {
      props.compFunc(completed);
      return (
        <div className="text-4xl text-red-600 font-extrabold font-chimono">{`${
          hours < 10 ? "0" + hours : hours
        } : ${minutes < 10 ? "0" + minutes : minutes} : ${
          seconds < 10 ? "0" + seconds : seconds
        }`}</div>
      );
    }
  };

  return (
    <WaitingUI
      timer={
        <Countdown
          controlled={false}
          autoStart
          date={settedDate}
          renderer={renderer}
        />
      }
    />
  );
};

export default WaitingCounter;
