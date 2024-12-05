import { createSlice } from "@reduxjs/toolkit";

const initial = {options: []}

export const OptionSlice = createSlice({
    name: 'OptionSlice',
    initialState: initial,
    reducers: {
        add(state,action){
            state.options.push(action.payload)
        },
        reset(state){
            state.options = []
        }
    }
})