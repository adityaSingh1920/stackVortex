import React, { useState } from "react";
import img from "../../assets/Images/signup.webp";
import HighlightText from "../core/Homeapge/HighlightText";
import CtButton from "../core/Homeapge/CtButton";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signup } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleConfirmPassword = () =>
    setConfirmShowPassword(!showConfirmPassword);

  const handleSignup = (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      accountType,
    } = data;

    dispatch(
      signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        accountType,
        navigate,
        setLoading
      )
    );
  };

  return (
    <div className="w-full mx-auto gap-28 text-white bg-richblack-900 flex flex-row justify-center min-h-screen items-center p-6">
      {/* Left Section */}
      <div className="w-[40%] flex flex-col justify-center p-10">
        <h1 className="text-4xl font-extrabold mb-4 text-yellow-400">
          <HighlightText text={"Join us today!"} />
        </h1>
        <p className="text-richblack-300 mb-6 text-lg leading-relaxed">
          Unlock your potential and build the future.{" "}
          <span className="text-blue-50 font-semibold">
            Start your journey with us today.
          </span>
        </p>

        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col space-y-5 gap-2"
        >
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs font-medium mb-2 mr-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full px-3 py-2 rounded bg-richblack-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-xs font-medium mb-2 mr-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="w-full px-3 py-2 rounded bg-richblack-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium mb-2 mr-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 rounded bg-richblack-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium mb-2 mr-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("contactNumber", {
                required: "Phone number is required",
              })}
              className="w-full px-3 py-2 rounded bg-richblack-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
            />
            {errors.contactNumber && (
              <span className="text-red-500 text-sm">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-xs font-medium mb-2 mr-2">
              Account Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("accountType", {
                required: "Account type is required",
              })}
              className="w-full px-3 py-2 rounded bg-richblack-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select account type</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
            {errors.accountType && (
              <span className="text-red-500 text-sm">
                {errors.accountType.message}
              </span>
            )}
          </div>

          {/* Passwords */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs font-medium mb-2 mr-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-3 py-2 rounded bg-richblack-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
                />
                <span
                  onClick={handleShowPassword}
                  className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-white text-xs"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-xs font-medium mb-2 mr-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  className="w-full px-3 py-2 rounded bg-richblack-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-white"
                />
                <span
                  onClick={handleConfirmPassword}
                  className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-white text-xs"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <button type='submit'
          disabled={loading}
          className={`w-full py-3 px-6 rounded-md text-white font-semibold transition duration-200
            ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300 hover:text-black"}
          `}>
          {loading ? "signing in" : "signup"}</button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="w-full h-px bg-gray-500"></div>
            <span className="px-2 text-gray-400 text-xs">OR</span>
            <div className="w-full h-px bg-gray-500"></div>
          </div>

          {/* Google Button */}
          <CtButton active={false}>
            <p className="w-full h-full flex justify-center items-center">
              <FcGoogle size={18} className="mr-1" /> Sign in with Google
            </p>
          </CtButton>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-[55%] flex justify-center">
        <img
          src={img}
          alt="Signup"
          className="w-full h-[30rem] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default SignupPage;
