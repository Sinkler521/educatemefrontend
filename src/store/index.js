import { configureStore} from '@reduxjs/toolkit';
import langReducer, {langMiddleware} from './langSlice';
import userReducer from './userSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
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
    localStorage.setItem("reduxState", serializedState);
  } catch {

  }
};

const initialState = loadState();

const store = configureStore({
  reducer: {
    lang: langReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(langMiddleware),
  preloadedState: initialState
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;