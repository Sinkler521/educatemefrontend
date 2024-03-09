import {createSlice} from "@reduxjs/toolkit";
import {DEFAULTLANGUAGE} from "../translations/translationsConfig";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            userId: null,
            email: null,
            firstName: null,
            lastName: null,
        }
    },
    reducers: {
        userLogged(state, action){
            const data = action.payload.text;
            state.user = {
                userId: data.userId,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            }
        }
    }
})

export const {userLogged} = userSlice.actions;
export default userSlice.reducer