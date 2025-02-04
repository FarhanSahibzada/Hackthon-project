import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './authSlice'

const Store =  configureStore({
    reducer : {
      auth :  UserReducer,
    }
})


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store ;