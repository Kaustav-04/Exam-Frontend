import { createSlice } from '@reduxjs/toolkit';


const scoreInitialState = { totalscore : 0, correct: 0, incorrect: 0, totalMarks: 0,unanswered:0, numberofCorrect: 0, numberofIncorrect: 0, numberofUnanswered: 0, object: {} };
export const scoreSlice = createSlice({
    name: 'score',
    initialState: scoreInitialState,
    reducers: {
        // add(state,action){
        //     state.correct += action.payload;
        //     state.totalscore += action.payload;
        //     state.numberofCorrect ++;
        // },
        // sub(state,action){
        //     state.incorrect += action.payload;
        //     state.totalscore +=action.payload;
        //     state.numberofIncorrect ++;
        // },
        // unanswered(state,action){
        //     state.unanswered += action.payload;
        //     state.totalscore += 0;
        //     state.numberofUnanswered ++;
        // },
        // totalMarks(state,action){
        //     state.totalMarks += action.payload;
        // },
        setObject(state,action){
            state.object = action.payload
        },
        
    }
});