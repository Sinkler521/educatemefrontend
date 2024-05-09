import { createSlice } from "@reduxjs/toolkit";
import { DEFAULTLANGUAGE } from "../translations/translationsConfig";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("langState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("langState", serializedState);
  } catch {

  }
};

const langSlice = createSlice({
  name: 'lang',
  initialState: loadState() || {
    defaultLang: DEFAULTLANGUAGE,
    currentLang: DEFAULTLANGUAGE,
  },
  reducers: {
    changeLang(state, action) {
      state.currentLang = action.payload.text;
    }
  }
});

export const langMiddleware = store => next => action => {
  const result = next(action);
  saveState(store.getState().lang);
  return result;
};

export const { changeLang } = langSlice.actions;
export default langSlice.reducer;