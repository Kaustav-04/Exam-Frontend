import { createSlice } from "@reduxjs/toolkit";

const initialArray = { answer: {} };

export const answerSlice = createSlice({
  name: "answer",
  initialState: initialArray,
  reducers: {
    add(state, action) {
        state.answer[action.payload.Qno] = {Qid:action.payload.Qid, ans: action.payload.ans, type: action.payload.type}
    },
    setInitial(state, action) {
      state.answerArray = action.payload;
    },
  },
});
