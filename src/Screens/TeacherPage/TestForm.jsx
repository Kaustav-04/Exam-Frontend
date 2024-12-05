import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { examActions } from "../../Store";
import { DatePicker, Form, Input } from "antd";
import { useFormik } from "formik";
import { ExamSchema } from "../../schemas/ExamSchema";
import { addExam } from "../../Utils/api";

const TestForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const examNameRef = useRef();
  const startTimeRef = useRef();
  const testCreate = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const Examdetails = useSelector((state) => state.exampaper);
  // if(testform){
  //   return <Navigate to={`/teacher/${details.id}/addQuestion`} />;
  // }

  const onCreate = async (values) => {
    console.log(values);
    const Data = await addExam(values);
    dispatch(examActions.addExamId(Data))
    navigate(`/Teacher/${Data}/addQuestion`)
    
  };

  const examFormik = useFormik({
    initialValues: {
      exam_name: "",
      start_time: "",
      end_time: "",
    },
    validationSchema: ExamSchema,
    onSubmit: (value) => onCreate(value),
  });

  return (
    <div className="">
      {/* <form className='w-full mb-5'>
        <div className="text-2xl w-full border border-[#3c485245] px-1 py-2 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
          <label>Exam Name</label>
          <input
          className="h-[40px] border-none text-lg bg-transparent w-full mt-3 placeholder:text-[#828384] focus:outline-none"
            type="text"
            ref={examNameRef}
            placeholder={"Ex:- Midsem1 Digital Electronics"}
            required
          />
        </div>
        
        <div>
          <span className="text-2xl w-full border border-[#3c485245] px-1 py-2 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
            <label>Start Time</label>
            <input
            className="h-[40px] border-none text-lg bg-transparent w-full mt-3 placeholder:text-[#828384] focus:outline-none"
              type="time"
              defaultValue={"00:00"}
              ref={startTimeRef}
              required
            />
          </span>
          <span className="text-2xl w-full border border-[#3c485245] px-1 py-2 m-auto rounded-xl mb-5 flex flex-col overflow-hidden">
            <label>Start Time</label>
            <input
            className="h-[40px] border-none text-lg bg-transparent w-full mt-3 placeholder:text-[#828384] focus:outline-none"
              type="time"
              defaultValue={"00:00"}
              ref={startTimeRef}
              required
            />
          </span>
        </div>
        <Button
          style={{
            padding: "9px 16px",
            fontSize: "23px",
          }}
          onClick={testCreate}
        >
          Create Question Paper
        </Button>
      </form> */}
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        requiredMark={false}
        initialValues={{
          remember: true,
        }}
        onFinish={examFormik.handleSubmit}
      >
        <Form.Item
          name="exam_name"
          label="Exam Name"
          rules={[
            {
              required: true,
              message: "Please input Exam Name",
            },
          ]}
          validateStatus={examFormik.errors?.exam_name ? "error" : "success"}
          help={examFormik.errors.exam_name}
          hasFeedback={true}
        >
          <Input
            onChange={(e) =>
              examFormik.setFieldValue("exam_name", e.target.value)
            }
            className="login-input"
            placeholder="Exam Name"
          />
        </Form.Item>
        <Form.Item
          name="start_time"
          label="Start Date and Time"
          rules={[
            {
              required: true,
              message: "Please input Exam Name",
            },
          ]}
          validateStatus={examFormik.errors?.start_time ? "error" : "success"}
          help={examFormik.errors?.start_time}
          hasFeedback={true}
        >
          <DatePicker
            className="login-input"
            needConfirm={false}
            showNow={false}
            showSecond={false}
            showTime
            onChange={(value, dateString) => {
              examFormik.setFieldValue("start_time", dateString);
            }}
            
          />
        </Form.Item>
        <Form.Item
          name="end_time"
          label="End Date and Time"
          rules={[
            {
              required: true,
              message: "Please input Exam Name",
            },
          ]}
          validateStatus={examFormik.errors?.end_time ? "error" : "success"}
          help={examFormik.errors?.end_time}
          hasFeedback={true}
        >
          <DatePicker
            className="login-input"
            needConfirm={false}
            showNow={false}
            showSecond={false}
            showTime
            onChange={(value, dateString) => {
              examFormik.setFieldValue("end_time", dateString);
            }}
            
          />
        </Form.Item>
        <Form.Item>
          <Button
            // type="primary"
            htmlType="submit"
            className="bg-[#08BD80] text-white border-none text-lg  md:text-xl  relative w-[100%] rounded-[8px] p-4  py-6 flex items-center justify-center"
          >
            Create Question
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestForm;
