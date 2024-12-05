import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import IEMLogo from "../../Images/IEMLogo-removebg-preview.png";
import Button from "../../components/Button";
import Hero from "../../Images/Hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal";
import StudentLogin from "../StudentPage/StudentLogin";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../Store";
import { useNavigate, useParams } from "react-router-dom";

function StudentOpeningPage() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.loginopen);
  const openModal = () => {
    dispatch(modalActions.loginopen());
  };
  const param = useParams();
  console.log(param);
  sessionStorage.setItem("type", param.type);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticated = sessionStorage.getItem("Authenticated");

    console.log(authenticated);
    if (authenticated === "true") {
      navigate(`/${param.type}`);
    }
  }, []);

  return (
    <Base>
      <div className="bg-transparent rounded-xl w-screen h-screen bg-white flex justify-center items-center">
        <div className="flex flex-col-reverse sm:flex-row lg:flex-row justify-around w-screen m-auto ">
          <div className=" w-full flex flex-col items-center sm:items-start justify-center sm:w-1/3">
            <div className="mb-[30px] w-3/5 sm:w-auto sm:h-[180px] lg:h-[218px] ">
              <img src={IEMLogo} className="w-full h-full" alt="IEM" />
            </div>
            <div className="">
              <span className="text-[#3C4852] font-bold text-xl sm:text-3xl text-center">
                CSE(IOT){" "}
              </span>
              <FontAwesomeIcon icon={faCircle} height={"12px"} width={"12px"} />{" "}
              <span className="text-[#3C4852] font-bold text-xl sm:text-3xl text-center">
                CSE(IOTCSBT){" "}
              </span>
              <FontAwesomeIcon icon={faCircle} height={"12px"} width={"12px"} />{" "}
              <span className="text-[#3C4852] font-bold text-xl sm:text-3xl text-center">
                IT
              </span>
            </div>

            <Button style={{ marginTop: "40px" }} onClick={openModal}>
              LOGIN
            </Button>
          </div>
          <div className="h-3/5 sm:h-[450px]">
            <img src={Hero} alt="Hero" className="h-full w-full" />
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal>
          <StudentLogin />
        </Modal>
      )}
    </Base>
  );
}

export default StudentOpeningPage;
