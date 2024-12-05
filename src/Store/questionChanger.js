import { createSlice } from "@reduxjs/toolkit";

const initial = {currentQNo:0 , start: false}

export const qChangerSlice = createSlice({
    name: 'qChanger',
    initialState:initial,
    reducers:{
        nextQ(state){
            state.currentQNo = state.currentQNo + 1;
        },
        prevQ(state){
            state.currentQNo = state.currentQNo - 1;
        },
        setQ(state,action){
            state.currentQNo = action.payload;
        },
        toggleStart(state){
            state.start = !state.start
        }


    }
})