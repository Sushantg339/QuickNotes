import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [] 
}

const NoteReducer = createSlice({
    name : "NoteReducer",
    initialState ,
    reducers : {
        loadNotes : (state , action)=>{
            state.notes = action.payload
        },
        removeNote : (state , action)=>{
            state.notes = state.notes.filter(note => note._id !== action.payload)
        },
        addNote: (state, action) => {
            state.notes.push(action.payload); 
        },
        clearNotes: (state) => {
            state.notes = []; 
        },
        updateNote: (state, action) => {
            const updated = action.payload
            state.notes = state.notes.map(note =>
                note._id === updated._id ? updated : note
            )
        }
    }
})

export const {loadNotes , removeNote , clearNotes , addNote , updateNote} = NoteReducer.actions
export default NoteReducer.reducer

