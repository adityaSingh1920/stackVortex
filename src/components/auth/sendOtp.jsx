import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendotp, verifyOtp } from "../../services/operations/authAPI";
import img from "../../assets/Images/signup.webp";

const SendOtpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailsent, setEmailsent] = useState(false);

  // Handle sending OTP
  const handleOtp = (data) => {
    const { email } = data;
    setEmail(email);
    dispatch(sendotp(email, setLoading, setEmailsent));
  };

  // Handle verifying OTP
  const handleverifyOtp = (data) => {
    const { otp } = data;
    dispatch(verifyOtp(email, otp, setLoading, navigate));
  };

  // Handle resending OTP
  const handleResendOtp = () => {
    if (email) {
      dispatch(sendotp(email, setLoading, setEmailsent));
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-richblack-900 text-white p-6">
      <div className="w-[40%] p-10">

        {emailsent ? (
          <>
            <h1 className="text-4xl font-extrabold mb-4 text-yellow-400">Verify OTP</h1>
            <p className="text-richblack-300 mb-6 text-lg">
              Enter the OTP sent to <span className="text-yellow-300">{email}</span>
            </p>

            <form onSubmit={handleSubmit(handleverifyOtp)} className="space-y-6">
              <div>
                <label className="block text-xs font-medium mb-2">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  {...register("otp", { required: "OTP is required" })}
                  className="w-full px-3 py-2 rounded bg-richblack-700 text-sm text-white focus:outline-none"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-md font-semibold transition duration-200 ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="mt-4 text-sm text-yellow-300 hover:underline"
            >
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold mb-4 text-yellow-400">Send OTP</h1>
            <p className="text-richblack-300 mb-6 text-lg">
              Enter your email to receive a one-time password (OTP).
            </p>

            <form onSubmit={handleSubmit(handleOtp)} className="space-y-6">
              <div>
                <label className="block text-xs font-medium mb-2" htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-3 py-2 rounded bg-richblack-700 text-sm text-white focus:outline-none"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-md font-semibold transition duration-200 ${
                  loading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300 text-black"
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}
      </div>

      <div className="w-[50%] hidden md:block">
        <img src={img} alt="Send OTP" className="h-[30rem] w-full object-cover rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default SendOtpPage;
