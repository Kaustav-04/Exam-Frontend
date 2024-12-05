import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store";
import Button from "./Button";

const OTP = (props) => {
  const dispatch = useDispatch();
  const number = useSelector((state)=>state.auth.number)
  const changeHandler = (element, index) => {
    if (isNaN(element.value)) return false;

    props.setOtp([...props.otp.map((i, ind) => (ind === index ? element.value : i))]);
    if (element.value === "" && element.previousElementSibling) {
      element.previousElementSibling.focus();
    }
    if (element.value !== "" && element.nextElementSibling) {
      element.nextElementSibling.focus();
    }
  };
  const verify = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    sendCode();
    
  }
  const sendCode = async() =>{
    const Response = await fetch(`/smsotpver/${number}`,{
      method: 'POST',
      body: JSON.stringify({
        otpcode: props.otp.join('')
      }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await Response.json()
    if(data.verification_status === 'approved'){
      dispatch(authActions.setNumberVerified())
    }

  }
  return (
    <div className="w-full h-auto px-1 py-2 flex flex-col">
      <div className="text-2xl text-[#252525]">Verify your Number</div>
      <div className="my-4">
        {props.otp.map((data, index) => (
          <input
            key={index}
            type="text"
            className="border text-4xl border-[#00000050] w-9 px-2 mx-1"
            maxLength={1}
            value={data}
            onChange={(e) => changeHandler(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      <Button onClick={verify} style={{fontSize: '25px', width: 'fit-content'}}>Verify</Button>
    </div>
  );
};

export default OTP;
