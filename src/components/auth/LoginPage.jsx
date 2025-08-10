import React, { useState } from 'react';
import img from '../../assets/Images/loginImg.jpg';
import HighlightText from '../core/Homeapge/HighlightText';
import CtButton from '../core/Homeapge/CtButton';
import { useForm } from "react-hook-form";
// import { apiConnector } from '../../services/apiConnector';
// import { loginendpopint } from '../../services/apis';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { login } from '../../services/operations/authAPI';



const LoginPage = () => {
  const Dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({mode:"onTouched"});

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  

  const handlePasswordDisplay = () => {
    setShowPassword(!showPassword)
  }
  // call login api 
  const loginuser = (data)=>
  {
    const {email, password} = data;
    Dispatch(login(email,password,navigate,setLoading))
  }
  return (
  
    <div className="w-screen mx-auto  gap-28 text-white bg-richblack-900 flex flex-row justify-center min-h-screen items-center p-6">
      {/* Left Section */}
      <div className="w-[40%] flex flex-col justify-center p-10">
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-400"><HighlightText text={"Welcome Back"}></HighlightText></h1>
        <p className="text-richblack-300 mb-6 text-lg leading-relaxed">
          Build skills for today, tomorrow, and beyond.{' '}
          <span className="text-blue-50 font-semibold">Education to future-proof your career.</span>
        </p>

        <form onSubmit={handleSubmit(loginuser)} className="flex flex-col space-y-6 gap-2">
          <div>
            <label className="block text-sm font-medium mb-3" htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              {...register("email", { required: "mail is required" })}
              className="w-full px-4 py-3 rounded bg-richblack-700  focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
            />
             
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                {...register("password", { required: "password is required" })}
                className="w-full px-4 py-3 rounded bg-richblack-700  focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              <span onClick={handlePasswordDisplay} className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-white">{showPassword ? "🙈" : "👁️"}</span>
            </div>
          </div>

          <button type='submit'
          disabled={loading}
          className={`w-full py-3 px-6 rounded-md text-white font-semibold transition duration-200
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300 hover:text-black"}
          `}>
          {loading ? "logging in" : "login"}</button>

            <NavLink className="text-blue-50 text-sm text-right hover:underline" to={'/forgotpassword'}>
            Forgot Password?</NavLink>
          
           
        
        </form>

        <div className="flex items-center my-6">
          <div className="w-full h-px bg-gray-500"></div>
          <span className="px-3 text-gray-400">OR</span>
          <div className="w-full h-px bg-gray-500"></div>
        </div>

        <CtButton active={false} >🌍 Sign in with Google</CtButton>
      </div>

      {/* Right Section */}
      <div className="w-[55%] flex justify-center">
        <img src={img} loading='lazy' alt="Login" className="w-full h-[34rem] rounded-lg shadow-lg loading" />
      </div>
    </div>
  );
};

export default LoginPage;
