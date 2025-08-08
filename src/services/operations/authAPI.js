import { handleLoading, setTokens } from "../../Redux/Slices/authSlice";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { loginapi, otpapi, resetpasswordtokenapi, signupapi, resetPasswordapi, verifyotpapi } from "../apis";
// import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/profileSlice"; // adjust path as needed
import { resetCart } from "../../Redux/Slices/cartSlice"; // if you have a cart system




export function login(email,password,navigate,setLoading)
{
return async function (dispatch)
{
    setLoading(true)
    try {
       
        const response = await apiConnector(
            "POST",
            loginapi.LOGIN_API,
            {
               "Content-Type": "application/json"

            },
            {
                email,
                password
            }
        )
        console.log(response);
        
        if(response.data.success)
        {
            dispatch(setTokens((response).data.token))
            toast.success("Login successful");
            const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebar.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user, image:userImage}))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile");
        } else {
            toast.error("failed")
        } 
        
    } catch (error) {
       toast.error(error?.response?.data?.message || "Something went wrong. Please try again.")

    }
    finally
        {
            setLoading(false)
        }
}


}



// const Signup =  () => {
//     return async function ()
//     {
//         try {
//             const response = await apiConnector(
//               "POST",
//               signup.SIGNUP_API,
//               {
//                 Content_Type: "application/json",
//               },
//               {
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 email: data.email,
//                 password: data.password,
//                 confirmPassword: data.confirmPassword,
//                 phone: data.phone,
//                 otp: data.otp,
//               }
//             );
//             if (response.success) {
//               toast("signup successful, go to login page");
//             } else {
//               toast("failed to signup");
//             }
//           } catch (error) {
//             toast(error.message);
//           }
//     }
   
//   };


export function signup(firstName, lastName, email, password, confirmPassword, contactNumber, accountType ,navigate,setLoading)
{
    return async function(dispatch)
    {
        setLoading(true)
        try {
            const response = await apiConnector(
                "POST",
                signupapi.SIGNUP_API,
                {
                    "Content-Type":"application/json"
                },
                {
                    firstName, lastName, email, password, confirmPassword, contactNumber , accountType
                }
            )

            if(response?.data?.success)
            {
                toast.success("signup succesfull"),
                navigate('/login')
            } else {
                toast.error("failed to login")
            }
            
        } catch (error) {
            console.log(error.message);
            
            toast.error(error?.response?.data?.message)
        }
        finally
        {
            setLoading(false)
        }
    }
}


export function sendotp(email,setLoading,setEmailsent )
{
return async function (dispatch)
{
    setLoading(true)
    try {
        const response = await apiConnector(
            "POST",
            otpapi.OTP_API,
          
            {
                "Content-Type":"application/json"
            },
            {
                email
            },
           
        )
        if(response?.data?.success)
        {
            setEmailsent(true)
            toast.success("otp sent sucessfully")
        } else {
            toast.error("failed to send otp")
        }
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    finally
    {
        setLoading(false)
    }

    
}
}



export function verifyOtp (email,otp,setLoading,navigate)
{
    return async (dispatch) => 
    {
        try {
            setLoading(true)
            const response = await apiConnector(
                "POST",
                verifyotpapi.OTP_API,
                
            {
                "Content-Type":"application/json"
            },
            {
                email,
                otp
            },
            )

            if(response?.data?.success)
            {
                toast.success("email verified succesfully")
                navigate('/signup')
            } else{
                toast.error("failed to verify otp")
            }
            
        } catch (error) {
            toast.error(error?.response?.data?.message)
            
        }
        finally
        {
            setLoading(false)
        }
    }
}

export function getResetPasswordToken(email,handleSentEmail) {
    return async (dispatch) => {
      dispatch(handleLoading(true));
      try {
        const response = await apiConnector(
          "POST",
          resetpasswordtokenapi.RESETPASSWORDTOKEN_API,
          { "Content-Type": "application/json" },
          { email }
        );
  
        if (response?.data?.success) {
          console.log(response);
          handleSentEmail(true)
          toast.success("Password reset link sent successfully");
        } else {
          toast.error("Failed to send reset link: " + (response?.data?.message || "Unknown error"));
        }
      } catch (error) {
        console.error(error);
        toast.error("Error: " + (error?.message || "Please try again later"));
      } finally {
        dispatch(handleLoading(false));
      }
    };
  }

  export function resetpassword(password, confirmPassword, token) {
    return async (dispatch) =>
    {
        dispatch(handleLoading(true))
        try {
            const response = await apiConnector(
            "POST",
            resetPasswordapi.RESETPASSWORD_API,
          { "Content-Type": "application/json" },
          {
            password,confirmPassword,token
          }

            )
            
        if (response?.data?.success) {
            console.log(response);
            toast.success("Password changed successfully");
          } else {
            toast.error("Failed to  reset password: " + (response?.data?.message || "Unknown error"));
          }
        } catch (error) {
            console.error(error);
            toast.error("Error: " + (error?.message || "Please try again later"));
          } finally {
            dispatch(handleLoading(false));
          }
            
        
    }
  }

  export function logout(navigate)
  {
    return (dispatch) => {
    dispatch(setTokens(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("logout succesfully")
    navigate('/')
   
    }
  }