import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

// auth login and signup apis

export const signup = async ({ name, email, phone_number, password, type }) => {
  console.log(name);
  const Data = await axios.post(
    `${url}/api/auth/signup`,
    {
      name,
      email,
      phone_number,
      password,
      type,
    },
    { withCredentials: true }
  );

  return Data.data;
};

export const login = async ({ email, password, type }) => {
  const Data = await axios.post(
    `${url}/api/auth/login`,
    { email, password },
    { withCredentials: true }
  );

  return Data.data;
};

// creating Exams

export const addExam = async ({ exam_name, start_time, end_time }) => {
  const Data = await axios.post(
    `${url}/api/exams`,
    {
      exam_name,
      start_time,
      end_time,
    },
    { withCredentials: true }
  );
  console.log(Data.data);
  return Data.data;
};

// Adding , updating and deleting question from exam by teacher

export const addQuestionToExam = async ({
  exam_id,
  question,
  marks,
  negative,
  option,
  answer,
}) => {
  const Data = await axios.post(
    `${url}/api/question`,
    {
      exam_id,
      question,
      marks,
      negative,
      option,
      answer,
    },
    { withCredentials: true }
  );
  console.log(Data.data);
  return Data.data;
};

export const updateQuestionForExam = async ({
  question_id,
  question,
  marks,
  negative,
  option,
  answer,
}) => {
  const Data = await axios.put(
    `${url}/api/question/${question_id}`,
    {
      question,
      marks,
      negative,
      option,
      answer,
    },
    { withCredentials: true }
  );
  console.log(Data.data);
  return Data.data;
};

export const deleteQuestionForExam = async ({ question_id }) => {
  const Data = await axios.delete(`${url}/api/question/${question_id}`, {
    withCredentials: true,
  });
  console.log(Data.data);
  return Data.data;
};

export const veiwQuestionByTeacher = async ({ exam_id }) => {
  const Data = await axios.get(`${url}/api/question/set/${exam_id}`, {
    withCredentials: true,
  });
  console.log(Data.data);
  return Data.data;
};

// Student Start Exam

export const studentStartExam = async ({ exam_id }) => {
  const Data = await axios.get(`${url}/api/exams/${exam_id}`, {
    withCredentials: true,
  });
  console.log(Data);
  return Data.data;
};
