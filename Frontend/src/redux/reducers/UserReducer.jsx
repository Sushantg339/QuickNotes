import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null
}

const UserReducer = createSlice({
    name : "UserReducer",
    initialState,
    reducers : {
        loadUser : (state , action)=>{
            state.user = action.payload
        },
        removeUser : (state , action)=>{
            state.user = null
        }
    }
})

export const {loadUser , removeUser} = UserReducer.actions
export default UserReducer.reducer;