import { createSlice } from "@reduxjs/toolkit";
const initialModal = {
  loginopen: true,
  questionopen: false,
  testopen: false,
  examopen: false,
  codeopen: false,
  secopen: false,
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialModal,
  reducers: {
    loginopen(state) {
      state.loginopen = true;
    },
    loginclose(state) {
      state.loginopen = false;
    },
    questionopen(state) {
      state.questionopen = true;
    },
    questionclose(state) {
      state.questionopen = false;
    },
    testopen(state) {
      state.testopen = true;
    },
    testclose(state) {
      state.testopen = false;
    },
    examopen(state) {
      state.examopen = true;
    },
    examclose(state) {
      state.examopen = false;
    },
    codeopen(state) {
      state.codeopen = true;
    },
    codeclose(state) {
      state.codeopen = false;
    },
    secopen(state) {
      state.secopen = true;
    },
    secclose(state) {
      state.secopen = false;
    },
  },
});
