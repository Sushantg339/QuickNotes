import { NavLink, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/UserAction";

const Login = () => {
    const {register , handleSubmit , reset , formState : {errors}} = useForm()
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const submitHandler = async (data) => {
        setLoading(true)
        try {
            dispatch(loginUser(data))
            toast.success('Login Successfull')
            navigate('/home')
            reset()
        }catch (error) {
            toast.error(error.response?.data?.message || "Error Loggin In")
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit(submitHandler)} className="bg-white shadow-lg rounded-2xl px-8 py-10 w-96 flex flex-col gap-5">
            <div className="h-25 w-[90%] mx-auto">
                <img
                    src="/images/logo.png"
                    alt="logo"
                    className="h-full w-full object-cover"
                />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                Welcome Back!
                
            </h2>


            <div className="flex flex-col">
            <input
                {...register('credential' , {required : 'Username or Email is required'})}
                type="text"
                id="identifier"
                placeholder="Username or Email"
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 
                    ${errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-black"}`
                }
            />
            {errors.credential && <span className="text-red-500 text-sm">{errors.credential.message}</span>}
            </div>

            <div className="flex flex-col">
            <input
                {...register('password' , {required : 'Password is required'})}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 
                    ${errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-black"}`
                }
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <button
                type="submit"
                className="bg-black text-white cursor-pointer py-2 rounded-full hover:bg-gray-400 hover:text-gray-900 transition-all duration-300 flex justify-center items-center"
                disabled={loading}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Login"
                    )}
            </button>


            <p className="text-center text-gray-600 text-sm">
                Don’t have an account?{" "}
            <NavLink
                to="/signup"
                className="text-black font-medium hover:underline"
            >
                Signup
            </NavLink>
            </p>
        </form>
        </div>
    );
};

export default Login;
