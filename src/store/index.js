import {configureStore} from '@reduxjs/toolkit'
import langReducer from "./langSlice";
import userReducer from "./userSlice"

export default configureStore({
    reducer: {
        lang: langReducer,
        user: userReducer,
    }
})