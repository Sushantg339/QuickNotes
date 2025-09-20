import { configureStore } from "@reduxjs/toolkit"
import UserReducer from './reducers/UserReducer'
import NoteReducer from './reducers/NoteReducer'
export const store = configureStore({
    reducer : {
        user : UserReducer,
        note : NoteReducer
    }
})
