import instance from "../../api/axiosConfig"
import { loadUser, removeUser } from "../reducers/UserReducer"

export const fetchUser = ()=> async(dispatch , getState)=>{
    try {
        const res = await instance.get('/auth/me')
        dispatch(loadUser(res.data.user))
        return res.data.user
    } catch (error) {
        console.error("Fetch user failed:", error.message)
        dispatch(removeUser())
    }
}

export const loginUser = (data)=> async(dispatch , getState)=>{
    try {
        const res = await instance.post('/auth/login' , data)
        dispatch(loadUser(res.data.user))
    } catch (error) {
        dispatch(removeUser())
    }
}

export const logoutUser = ()=>async(dispatch , getState)=>{
    try {
        await instance.post('/auth/logout')
        dispatch(removeUser())
    } catch (error) {
        console.error("Logout failed:", error.message)
    }
}

export const registerUser = (data)=> async(dispatch , getState)=>{
    try {
        const res = await instance.post('/auth/register' , data)
        return res.data
    } catch (error) {
        throw error.response?.data?.message || "Signup failed"
    }
}
