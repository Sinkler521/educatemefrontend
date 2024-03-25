import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    email: null,
    username: null,
    dateJoined: null,
    token: null,
  },
  reducers: {
    userLogged(state, action) {
      const data = action.payload;
      return {
        ...state,
        userId: data.id,
        email: data.email,
        username: data.username,
        dateJoined: data.date_joined,
        token: data.token,
      };
    },
    userLogout(state) {
      return {
        userId: null,
        email: null,
        username: null,
        dateJoined: null,
        token: null,
      };
    },
  },
});

export const { userLogged, userLogout } = userSlice.actions
export default userSlice.reducer