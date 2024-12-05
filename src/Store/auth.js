import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {type: '',isAuthenticated: false, id:'', number: '', numberVerified: false, userData : {}}

export const authSlice = createSlice({
    name: 'authentication',
    initialState: authInitialState,
    reducers: {
        logIn(state,action){
            state.isAuthenticated = true
            state.userData = action.payload;
            sessionStorage.setItem("User",JSON.stringify(action.payload))
            sessionStorage.setItem("Authenticated",true)
        },
        logOut(state){
            state.isAuthenticated = false
            state.userData = {};
        },
        setType(state,action){
            state.type = action.payload
        },
        setId(state,action){
            state.id = action.payload
        },
        setNumberVerified(state){
            state.numberVerified = true
        },
        setNumberUnVerified(state){
            state.numberVerified = false
        }
    }
})

export const { logIn, logOut, setType, setId,setNumberUnVerified, setNumberVerified} = authSlice.actions;