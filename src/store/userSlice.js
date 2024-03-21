import { createSlice } from "@reduxjs/toolkit";

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

const userSlice = createSlice({
  name: "user",
  initialState: loadState() || {
    user: {
      userId: null,
      email: null,
      username: null,
      dateJoined: null,
      token: null,
    },
  },
  reducers: {
    userLogged(state, action) {
      const data = action.payload;
      state.user = {
        userId: data.id,
        email: data.email,
        username: data.username,
        dateJoined: data.date_joined,
        token: data.token,
      };
    },
  },
});

export const { userLogged } = userSlice.actions
export default userSlice.reducer