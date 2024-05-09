import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    email: null,
    username: null,
    dateJoined: null,
    token: null,
    isStaff: null,
    avatar: null,
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
        isStaff: data.is_staff,
        avatar: data.avatar,
      };
    },
    userLogout(state) {
      return {
        userId: null,
        email: null,
        username: null,
        dateJoined: null,
        token: null,
        isStaff: null,
        avatar: null,
      };
    },
  },
});

export const { userLogged, userLogout } = userSlice.actions
export default userSlice.reducer