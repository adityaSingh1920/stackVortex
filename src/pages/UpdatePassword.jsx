import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { RingLoader } from "react-spinners";
import { resetpassword } from '../services/operations/authAPI';


const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onTouched" });
  const { loading } = useSelector((state) => state.auth);
//   add  it 
//   const [showpassword ,setshowPassword] = useState()

  const handleonsubmit = (data) => {
    const { password, confirmPassword } = data;
    const token = location.pathname.split('/').at(-1);
    dispatch(resetpassword(password, confirmPassword, token));
  };

  return (
    <div className="text-white flex justify-center items-center min-h-screen px-4">
      {loading ? (
        <div><RingLoader color="#60A5FA" size={80} /></div>
      ) : (
        <div className="flex flex-col items-center gap-4 max-w-md w-full">
          <h1 className="text-2xl font-bold">Choose new password</h1>
          <p className="text-center text-sm">
            Almost done. Enter your new password and you are all set.
          </p>

          <form onSubmit={handleSubmit(handleonsubmit)} className="w-full flex flex-col gap-4">
            <label htmlFor="password" className="flex flex-col text-left">
              <p className="mb-1">New Password:</p>
              <input
                type="password"
                placeholder="Enter new password"
                className="p-2 rounded text-black"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </label>

            <label htmlFor="confirmPassword" className="flex flex-col text-left">
              <p className="mb-1">Confirm Password:</p>
              <input
                type="password"
                placeholder="Confirm your password"
                className="p-2 rounded text-black"
                {...register("confirmPassword", { required: "Confirm password is required" })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
              )}
            </label>

            <button
              type="submit"
              className="bg-red-700 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
            >
              change Password
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

export default UpdatePassword;
