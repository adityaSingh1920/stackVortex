import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import Home from './pages/Home'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'
import SendOtpPage from './components/auth/sendOtp'
import NavBar from './components/common/NavBar'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Error from './pages/Error'
import Myprofile from './components/core/Dashboard/Myprofile'
import DashBoard from './pages/Dashboard'
import PrivateRoute from './components/auth/PrivateRoute'
import Settings from './pages/setting'


const App = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<HomeLayout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/signup',
          element: <SignupPage />
        },
        {
          path: '/sendotp',
          element: <SendOtpPage />
        },
        {
          path:'/forgotpassword',
          element:<ForgotPassword/>
        },
        {
        path:'/reset-password/:token',
        element:<UpdatePassword/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/contact',
          element:<ContactUs/>
        },
        {
          path:'*',
          element:<Error/>
        },
       
        {
          path:'/dashboard',
          element:
          (<PrivateRoute>
            <DashBoard/>
          
          </PrivateRoute>),
          children:[
             {
          path:'my-profile',
          element:<Myprofile/> 
        },
         {
            path: "settings", // 👈 move settings route here
            element: <Settings />,
          },
          ]
        }
      ]
    },
   
  ])

  return (
  < RouterProvider router={router}/>
  )
}

export default App
