import { configureStore } from "@reduxjs/toolkit";
import MyReducer from "./Reducer/MyReducer";


export const Store=configureStore({
    reducer:{
        MyTodoLength:MyReducer
    }
})