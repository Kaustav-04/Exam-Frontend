import React, { Fragment, useRef, useState } from "react";
// import IEMLogo from '../../Images/IEMLogo-removebg-preview.png'
// import Button from "../../components/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { login, signup } from "../../Utils/api";
import { Form, Input, message, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { logIn, logOut } from "../../Store/auth";
import { SignUpSchema } from "../../schemas/SignUpSchema";
import { loginSchema } from "../../schemas/loginSchema";

const StudentLogin = (props) => {
  const dispatch = useDispatch();
  const AuthData = useSelector((state) => state.auth);
  const param = useParams();
  const navigate = useNavigate();

  const [signUp, setSignUp] = useState(false);

  const onRegisterFinish = async (values) => {

    try {
      let registerUserResp = await signup(values);
      console.log(registerUserResp);
      dispatch(logIn(registerUserResp));
      if (values.type === "Student") {
        navigate(`/Student`);
      } else {
        navigate(`/Teacher`);
      }
    } catch (err) {
      message.error(
        err.response.data.message || "Signup failed! Please try again"
      );
    }
  };

  const onLoginFinish = async (values) => {
    if (AuthData.userData) {
      dispatch(logOut());
    }
    try {
      let userData = await login(values);
      dispatch(logIn(userData?.user));
      message.success(userData?.message)
      if (values.type === "Student") {
        navigate(`/Student`);
      } else {
        navigate(`/Teacher`);
      }
    } catch (err) {
      message.error(
        err.response.data.message || "Login failed! Please try again"
      );
    }
  };

  const signUpFormik = useFormik({
    initialValues: {
      type: AuthData.type,
      name: "",
      phone_number: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (value) => onRegisterFinish(value),
  });

  const loginFormik = useFormik({
    initialValues: {
      type: sessionStorage.getItem("type"),
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (value) => {console.log(value);onLoginFinish(value)},
  });

  console.log(loginFormik)
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (isAuth && AuthData.type === "Student") {
    return <Navigate to={`/Student`} />;
  }
  if (isAuth && AuthData.type === "Teacher") {
    return <Navigate to={`/Teacher`} />;
  }
  const signupChangeHandler = (e) => {
    e.stopPropagation();
    setSignUp((state) => !state);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="font-bold text-3xl font-poppins text-[#3c4852]">
        {!signUp ? "Login" : "SignUp"}
      </div>
      <div className="mt-2 text-sm">
        or&nbsp;
        <span
          className="text-[#08BD80] pb-1 border-[#08BD80] border-dashed border-b cursor-pointer"
          onClick={signupChangeHandler}
        >
          {!signUp ? "Create your account" : "login to your account"}
        </span>
      </div>
      <div className="pr-4 py-4">
      {signUp && (
        <Form
          name="normal_register"
          className="register-form"
          layout="vertical"
          requiredMark={false}
          onFinish={signUpFormik.handleSubmit}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
            validateStatus={signUpFormik.errors?.name ? "error" : "success"}
            help={signUpFormik.errors?.name}
            hasFeedback={true}
          >
            <Input
              className="login-input"
              onChange={(e) =>
                signUpFormik.setFieldValue("name", e.target.value)
              }
              // prefix={
              //   <UserOut className="site-form-item-icon text-[#9CA3AF]" />
              // }
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            validateStatus={
              signUpFormik.errors?.phone_number ? "error" : "success"
            }
            help={signUpFormik.errors?.phone_number}
            hasFeedback={true}
          >
            <Input
              className="w-full"
              value={signUpFormik.values?.phone_number}
              onChange={(e) =>
                signUpFormik.setFieldValue("phone_number", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
            validateStatus={signUpFormik.errors?.email ? "error" : "success"}
            help={signUpFormik.errors?.email}
            hasFeedback={true}
          >
            <Input
              className="login-input"
              onChange={(e) =>
                signUpFormik.setFieldValue("email", e.target.value)
              }
              // prefix={
              //   <UserOutlined className="site-form-item-icon text-[#9CA3AF]" />
              // }
              placeholder="Email ID"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Create New Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            validateStatus={signUpFormik.errors?.password ? "error" : "success"}
            help={signUpFormik.errors?.password}
            hasFeedback={true}
          >
            <Input.Password
              className="login-input"
              onChange={(e) =>
                signUpFormik.setFieldValue("password", e.target.value)
              }
              // prefix={
              //   <LockOutlined className="site-form-item-icon text-[#9CA3AF]" />
              // }
              type="password"
              placeholder="Create New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm New Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            validateStatus={signUpFormik.errors?.confirm ? "error" : "success"}
            help={signUpFormik.errors?.confirm}
            hasFeedback={true}
          >
            <Input.Password
              className="login-input"
              onChange={(e) =>
                signUpFormik.setFieldValue("confirm", e.target.value)
              }
              // prefix={
              //   <LockOutlined className="site-form-item-icon text-[#9CA3AF]" />
              // }
              type="password"
              placeholder="Confirm New Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-[#08BD80] text-white border-none text-lg  md:text-xl  relative w-[100%] rounded-[8px] p-4  py-6 flex items-center justify-center"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      )}
      {!signUp && (
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          requiredMark={false}
          initialValues={{
            remember: true,
          }}
          onFinish={loginFormik.handleSubmit}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
            validateStatus={loginFormik.errors?.email ? "error" : "success"}
            help={loginFormik.errors.email}
            hasFeedback={true}
          >
            <Input
              onChange={(e) =>
                loginFormik.setFieldValue("email", e.target.value)
              }
              className="login-input"
              prefix={
                <UserOutlined className="site-form-item-icon text-[#9CA3AF]" />
              }
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
            validateStatus={loginFormik.errors?.password ? "error" : "success"}
            help={loginFormik?.errors?.password}
            hasFeedback={true}
          >
            <Input
              onChange={(e) =>
                loginFormik.setFieldValue("password", e.target.value)
              }
              className="login-input"
              prefix={
                <LockOutlined className="site-form-item-icon text-[#9CA3AF]" />
              }
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              // type="primary"
              htmlType="submit"
              className="bg-[#08BD80] text-white border-none text-lg  md:text-xl  relative w-[100%] rounded-[8px] p-4  py-6 flex items-center justify-center"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      )}
      </div>
      {/* {!numberVerified && votp && (
          <OTP otp={otp} number={null} setOtp={setOtp} />
        )} */}
      {/* <ReCAPTCHA
        sitekey="6LeeIS0kAAAAAPIUUASm8hFjBKKeJlI5oXoHrAq0"
        onChange={() => setVerified(true)}
      /> */}
    </div>
  );
};

export default StudentLogin;
