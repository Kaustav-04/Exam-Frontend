import { createSlice } from "@reduxjs/toolkit";

const initial = {
    id: "",
    ExamName: "",
    StartTime: "",
    EndTime: "",
    QuestionData: [],
};

export const examSlice = createSlice({
    name: "Exam",
    initialState: initial,
    reducers: {
        addExamPaper(state, action) {
            state.ExamName = action.payload.ExamName;
            state.StartTime = action.payload.StartTime;
            state.EndTime = action.payload.EndTime;
        },
        addQuestionPaper(state, action) {
            state.QuestionData = action.payload.QuestionData;
        },
        addExamId(state,action){
            state.id = action.payload
        }
    },
});
