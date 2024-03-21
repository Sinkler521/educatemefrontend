import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            userId: null,
            email: null,
            username: null,
            dateJoined: null,
            token: null,git 
        }
    },
    reducers: {
        userLogged(state, action){
            const data = action.payload.text;
            state.user = {
                userId: data.id,
                email: data.email,
                username: data.username,
                dateJoined: data.date_joined,
                token: data.token,
            }
        }
    }
})

export const {userLogged} = userSlice.actions;
export default userSlice.reducer