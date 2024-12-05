import { scoreSlice } from "./Score";
import { authSlice } from "./auth";
import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modal";
import { questionSlice } from "./Question";
import { examSlice } from "./examdetail";
import { qChangerSlice } from "./questionChanger";
import { answerSlice } from "./answer";
import { paperSlice } from "./paper";
import {OptionSlice} from './options'

const store = configureStore({
  reducer: {
    score: scoreSlice.reducer,
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    question: questionSlice.reducer,
    exampaper:examSlice.reducer,
    qChanger: qChangerSlice.reducer,
    answer: answerSlice.reducer,
    paper: paperSlice.reducer,
    options: OptionSlice.reducer,
  },
});
export const scoreActions = scoreSlice.actions;
export const authActions = authSlice.actions;
export const modalActions = modalSlice.actions;
export const questionActions = questionSlice.actions;
export const examActions = examSlice.actions;
export const qChangerActions = qChangerSlice.actions;
export const answerActions = answerSlice.actions;
export const paperActions = paperSlice.actions;
export const optionActions = OptionSlice.actions;
export default store;
