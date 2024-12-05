import React from "react";

const WaitingUI = (props) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
      <h2 className="text-5xl font-medium mb-6">Test Starting In </h2>
      <div>{props.timer}</div>
    </div>
  );
};

export default WaitingUI;
