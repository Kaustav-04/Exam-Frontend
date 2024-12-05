import { createSlice } from "@reduxjs/toolkit";
const initial = {
  examid: "",
  paper: null,
  duration: 0,
  remaintime: 0,
  examEnded: false,
  missed: false,
  eligibility: true,
};

export const paperSlice = createSlice({
  name: "Paper",
  initialState: initial,
  reducers: {
    fetchPaper(state, action) {
      state.paper = action.payload;
    },
    setId(state, action) {
      state.examid = action.payload;
    },
    duration(state, action) {
      state.duration = action.payload;
    },
    remainTime(state, action) {
      state.remaintime = action.payload;
    },
    endExam(state) {
      state.examEnded = true;
    },
    missed(state) {
      state.missed = true;
      state.eligibility = false
    },
    eligibility(state, action) {
      state.eligibility = action.payload;
    }
  },
});
