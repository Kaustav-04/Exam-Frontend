import React from "react";
// import Quiz from "../components/StudentPage/Quiz";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { useSelector } from "react-redux";
import AddQuestion from "../Screens/TeacherPage/AddQuestion";
import TeacherMain from "../Screens/TeacherPage/TeacherMain";
import Examination from "../Screens/StudentPage/Exam/Examination";
import Results from "../Screens/StudentPage/Results/Results";
import Home from "../Screens/OpeningPage/Home";
import StudentOpeningPage from "../Screens/OpeningPage/StudentOpeningPage";
import Waiting from "../Screens/StudentPage/Waiting";
import ShareCode from "../Screens/TeacherPage/ShareCode";
import AddSection from "../Screens/TeacherPage/AddSection";

function MainNavigation() {
  const authenticated = sessionStorage.getItem("Authenticated");

  window.onclose = function () {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("id");
  };
  return (
    <main className="overflow-hidden h-screen w-screen flex flex-col items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:type" element={<StudentOpeningPage />} />
        <Route path="/Teacher" element={<TeacherMain />} />
        <Route path="/Student" element={<Waiting />} />
        <Route path="/:examid/:enrollment/exam" element={<Examination />} />
        <Route path="/results/:examid/:enrollment" element={<Results />} />
        {authenticated === "true" && (
          <Route
            path="/Teacher/:examid/addQuestion"
            element={<AddQuestion />}
          />
        )}
        {authenticated === "true" && (
          <Route path="/sharecode" element={<ShareCode />} />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}
export default MainNavigation;
