import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import TestForm from "./TestForm";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";

const TeacherMain = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    const authenticated = sessionStorage.getItem("Authenticated")
    if(authenticated === "true"){}
    else{
      navigate(`/Teacher/login`)
    }
  },[])
 
  const [open, setOpen] = useState(false);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Button
        style={{ padding: "9px 15px", fontSize: "23px" }}
        onClick={() => setOpen(true)}
      >
        Create Test
      </Button>
      <Link to="/">
        <Button style={{ padding: "9px 15px", fontSize: "23px" }}>
          Back to Home
        </Button>
      </Link>
      {open && (
        <Modal footer={null} open={open}>
          <TestForm />
        </Modal>
      )}
    </div>
  );
};

export default TeacherMain;
