import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/UserAction";

const Signup = () => {
    const {register , handleSubmit , formState : {errors} , reset} = useForm()
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const submitHandler = async (data) => {
        setLoading(true)
        try {
            dispatch(registerUser(data))
            toast.success('Signup Successfull , Please Login!')
            navigate("/");
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error Signing In")
        } finally{
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
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Join Us Today
            </h2>

            <div className="flex flex-col">
            <input
                {...register('username' , {required : "Username is required"})}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 
                    ${errors.username 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-black"}`   
                }
                autoComplete="off"
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>

            <div className="flex flex-col">
            <input
                {...register('email' , {required : "Email is required"})}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 
                    ${errors.email 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-black"}`
                }
                autoComplete="off"
                
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col">
            <input
                {...register('password' , {required : "Password is required"})}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 
                    ${errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-black"}`
                }
                autoComplete="off"
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
                        "Signup"
                    )}
            </button>

            <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <NavLink
                to="/"
                className="text-black font-medium hover:underline"
            >
                Login
            </NavLink>
            </p>
        </form>
        </div>
    );
};

export default Signup;