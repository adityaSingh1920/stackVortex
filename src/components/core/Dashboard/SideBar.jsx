import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-link'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SiderBarLinks from './SiderBarLinks'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const SideBar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, handleConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return <div className='text-white p-4'>Loading...</div>
  }

  return (
    <div className='w-[222px] flex flex-col border-r border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-6 px-4 shadow-md'>

      <div className='flex flex-col'>
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <SiderBarLinks key={link.id} link={link} iconName={link.icon} />
          )
        })}
      </div>

      <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600' />

      <div className='flex flex-col space-y-2 px-2'>
        <SiderBarLinks link={{ name: "Settings", path: "/dashboard/settings" }} iconName={"VscSettings"} />
        <button
          onClick={() =>
            handleConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => handleConfirmationModal(null),
            })
          }
          className='flex items-center gap-x-2 text-sm font-medium text-richblack-300 hover:text-white transition'
        >
          <VscSignOut className='text-lg' />
          <span>Logout</span>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default SideBar
