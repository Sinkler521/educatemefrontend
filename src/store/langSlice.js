import {createSlice} from "@reduxjs/toolkit";
import {DEFAULTLANGUAGE} from "../translations/translationsConfig";

const langSlice = createSlice({
    name: 'lang',
    initialState: {
        defaultLang: DEFAULTLANGUAGE,
        currentLang: DEFAULTLANGUAGE,
    },
    reducers: {
        changeLang(state, action){
            state.currentLang = action.payload.text
        }
    }
})

export const {changeLang} = langSlice.actions;
export default langSlice.reducer