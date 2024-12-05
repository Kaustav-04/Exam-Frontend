import React from "react";
import IEMLogo from "../../Images/IEMLogo-removebg-preview.png";
import { Link } from "react-router-dom";
import { authActions } from "../../Store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`bg-[#08BD80] text-white border-none  px-4 py-4 text-2xl rounded-xl relative ${props.className}`}
    >
      {props.children}
    </button>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(authActions.logOut())
  },[])
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="h-2/6">
        <img src={IEMLogo} className="h-full w-full" alt="IEM" />
      </div>
      <div className="my-4 text-xl text-center sm:text-3xl font-medium font-chimono">
        Welcome to Examination Portal
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center w-full mx-3 sm:mx-0 mt-4">
        <Link to="/login/Student">
          <Button className="mx-5 my-3 sm:my-0" onClick={() => {dispatch(authActions.setType('Student')); sessionStorage.setItem("type","Student")}}>
            Login as Student
          </Button>
        </Link>
        <Link to="/login/Teacher">
          <Button className="mx-5 sm:mx-0" onClick={() => {dispatch(authActions.setType('Teacher')); sessionStorage.setItem("type","Teacher")}}>
            Login as Teacher
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
