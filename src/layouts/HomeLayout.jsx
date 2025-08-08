import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/common/NavBar'
import LoginPage from '../components/auth/LoginPage'
import SignupPage from '../components/auth/SignupPage'

const HomeLayout = () => {
  return (
    <div className='w-screen  min-h-screen flex flex-col bg-richblack-900  font-inter'>
      <NavBar/>
      <Outlet/>
    </div>
  )
}

export default HomeLayout
