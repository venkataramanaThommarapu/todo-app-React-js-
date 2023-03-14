import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:0,
}

const MySlice=createSlice({

    name:"todoLength",
    initialState,

    reducers:{
        getTodoCount:(state,action)=>{
            state.value=action.payload
        }
    }

})

export const {getTodoCount}= MySlice.actions;
export default MySlice.reducer