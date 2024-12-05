import { createSlice } from "@reduxjs/toolkit";
const initial = { QuestionArray: [], Qpaper: [] };

export const questionSlice = createSlice({
  name: "Question",
  initialState: initial,
  reducers: {
    initialQuestion(state, action) {
      state.Qpaper = action.payload.map((i) => {
        const item = {
          Qid: i.question_id,
          Question: i.question,
          OptionList: i.option,
          CorrectAnswer: Number(i.answer),
          CorrectMarks: Number(i.marks),
          NegativeMarks: Number(i.negative),
        };

        return item;
      });
    },
    addSectionQuestion(state, action) {
      state.Qpaper.push({
        Qid: action.payload.Qid,
        Question: action.payload.Question,
        OptionList: action.payload.OptionList,
        CorrectAnswer: action.payload.CorrectAnswer,
        CorrectMarks: action.payload.CorrectMarks,
        NegativeMarks: action.payload.NegativeMarks,
      });
    },
    deletequestion(state, action) {
      state.Qpaper.slice(action.payload, 1);
    },
    editquestion(state, action) {
      state.QuestionArray[action.payload.index].Question =
        action.payload.question;
    },
    editoption(state, action) {
      state.Qpaper[action.payload.Qindex].OptionList.slice(
        action.payload.Oindex,
        1,
        action.payload.option
      );
    },
    editMark(state,action){
      action.payload.marks && (state.Qpaper[action.payload.Qindex].marks = action.payload.marks);
      action.payload.negative && (state.Qpaper[action.payload.Qindex].negative = action.payload.negative);
    },
    addOption(state, action) {
      state.Qpaper[action.payload.Qindex].OptionList.push(
        action.payload.option
      );
    },
    deleteoption(state, action) {
      state.QuestionArray[action.payload.Qindex].optionList.slice(
        action.payload,
        1
      );
    },
  },
});
