import { configureStore} from '@reduxjs/toolkit';
import langReducer, {langMiddleware} from './langSlice';
import userReducer from './userSlice';

// const middleware = [...getDefaultMiddleware(), langMiddleware];

const store = configureStore({
  reducer: {
    lang: langReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();

    const middleware = [...defaultMiddleware, (store) => (next) => (action) => {
      if (action.type.startsWith('lang/')) {
        langMiddleware(store)(next)(action);
      } else {
        next(action);
      }
    }];

    return middleware;
  },
});