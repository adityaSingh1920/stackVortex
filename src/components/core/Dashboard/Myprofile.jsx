import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../common/IconButton'
import axios from 'axios'
import { setUser } from '../../../Redux/Slices/profileSlice'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"))
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/profile/getAllUserDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const userData = response.data.user
        dispatch(setUser(userData))
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        console.log("Failed to fetch user profile:", error.message)
      }
    }

    if (
      !user ||
      !user.additionalDetails ||
      typeof user.additionalDetails === "string"
    ) {
      fetchUserProfile()
    }
  }, [dispatch, user])

  return (
    <div className='min-h-screen bg-richblack-900 text-white px-6 py-8 space-y-10'>
      <h1 className='text-3xl font-semibold'>My Profile</h1>

      {/* Profile Card */}
      <div className='flex items-center gap-4 bg-richblack-800 border border-richblack-700 rounded-lg p-4 shadow-sm'>
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='w-[80px] h-[80px] rounded-full object-cover border border-richblack-600 shadow-md'
        />
        <div className='flex flex-col'>
          <p className='text-lg font-medium'>{user?.firstName} {user?.lastName}</p>
          <p className='text-sm text-richblack-300'>{user?.email}</p>
        </div>
        <div className='ml-auto'>
          <IconButton
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>
      </div>

      {/* About Section */}
      <div className='bg-richblack-800 rounded-lg p-4 border border-richblack-700 space-y-3 shadow-sm'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-medium'>About</p>
          <IconButton
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>
        <p className='text-richblack-300'>
          {user?.additionalDetails?.about || "No information provided"}
        </p>
      </div>

      {/* Personal Details */}
      <div className='bg-richblack-800 rounded-lg p-4 border border-richblack-700 space-y-4 shadow-sm'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-medium'>Personal Details</p>
          <IconButton
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <DetailItem label="First Name" value={user?.firstName} />
          <DetailItem label="Last Name" value={user?.lastName} />
          <DetailItem label="Email" value={user?.email} />
          <DetailItem label="Phone Number" value={user?.additionalDetails?.contactNumber || "N/A"} />
          <DetailItem label="Gender" value={user?.additionalDetails?.gender || "N/A"} />
          <DetailItem label="Date of Birth" value={user?.additionalDetails?.dateOfBirth || "N/A"} />
        </div>
      </div>
    </div>
  )
}

const DetailItem = ({ label, value }) => (
  <div>
    <p className='text-sm text-richblack-300 mb-1'>{label}</p>
    <p className='text-base text-white'>{value}</p>
  </div>
)

export default MyProfile
