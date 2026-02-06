import axios from 'axios'

const instance = axios.create({
    baseURL : "https://quicknotes-8v4o.onrender.com/api",
    withCredentials : true
})

export default instance