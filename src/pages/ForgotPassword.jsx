import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getResetPasswordToken } from "../services/operations/authAPI";
import { RingLoader } from "react-spinners";


const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched" });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [emailsent, handleSentEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handlePassword = (data) => {
    const { email } = data;
    setEmail(data.email)
    dispatch(getResetPasswordToken(email, handleSentEmail));
  };

  return (
    <div className="text-white flex justify-center items-center min-h-screen px-4">
      {loading ? (
        <div><RingLoader  color="#60A5FA" size={80}/></div>
      ) : (
        <div className="flex flex-col items-center gap-4 max-w-md w-full">
          <h1 className="text-2xl font-bold">
            {emailsent ? "Check your email" : "Reset password"}
          </h1>
          <p className="text-center">
            {emailsent
              ? `We have sent the reset email to ${email}`
              : "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."}
          </p>

          <form onSubmit={handleSubmit(handlePassword)} className="w-full flex flex-col gap-4">
            {!emailsent && (
              <label htmlFor="email" className="flex flex-col text-left">
                <p className="mb-1">Email address:</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded text-black"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </label>
            )}

            <button
              type="submit"
              className="bg-red-700 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
            >
              {emailsent ? "Resend email" : "Reset password"}
            </button>
          </form>

          <NavLink to="/login" className="text-blue-400 underline">
            Back to login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
