import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../Redux/Slices/profileSlice'
import { apiConnector } from '../services/apiConnector'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    gender: '',
    dateofBirth: '',
    about: '',
  })

  const [profilePic, setProfilePic] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        contactNumber: user?.additionalDetails?.contactNumber?.toString() || '',
        gender: user?.additionalDetails?.gender || '',
        dateofBirth: user?.additionalDetails?.dateOfBirth || '',
        about: user?.additionalDetails?.about || '',
      })
    }
  }, [user])

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      String(formData.contactNumber).trim() &&
      formData.gender &&
      formData.dateofBirth &&
      formData.about.trim()
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = async () => {
    if (!isFormValid()) {
      toast.error('All fields are required')
      return
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'))

      const res = await apiConnector(
        'PUT',
        `${import.meta.env.VITE_BASE_URL}/api/v1/profile/updateProfile`,
        {
          Authorization: `Bearer ${token}`,
        },
        formData
      )

      toast.success('Profile updated successfully')
      dispatch(setUser(res.data.updateProfile))
      localStorage.setItem('user', JSON.stringify({ ...user, additionalDetails: res.data.updateProfile }))
    } catch (error) {
      toast.error('Failed to update profile')
      console.log(error)
    }
  }

  const handleProfilePicUpload = async () => {
    if (!profilePic) {
      toast.error('Select an image first')
      return
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'))
      const data = new FormData()
      data.append('image', profilePic)

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/profile/profilePicUpdate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Profile picture updated')
      dispatch(setUser(res.data.updatepic))
      localStorage.setItem('user', JSON.stringify(res.data.updatepic))
    } catch (error) {
      toast.error('Failed to update picture')
      console.log(error)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This is irreversible.')) return

    try {
      const token = JSON.parse(localStorage.getItem('token'))
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/profile/deleteProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      toast.success('Account deleted')
      localStorage.clear()
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete account')
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-richblack-900 text-white px-6 md:px-20 py-10'>
      <h2 className='text-3xl font-semibold mb-10 text-center'>Edit Profile</h2>

      {/* Profile Picture Upload */}
      <div className='bg-richblack-800 p-6 rounded-lg mb-10'>
        <p className='text-lg font-semibold mb-4'>Change Profile Picture</p>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <div className='w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-xl'>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setProfilePic(e.target.files[0])}
            className='text-white'
          />
          <button
            onClick={handleProfilePicUpload}
            className='bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-md'
          >
            Upload
          </button>
        </div>
      </div>

      {/* Profile Info Form */}
      <div className='bg-richblack-800 p-6 rounded-lg space-y-6'>
        <p className='text-lg font-semibold'>Profile Information</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <input
            name='firstName'
            type='text'
            value={formData.firstName}
            onChange={handleChange}
            placeholder='First Name'
            className='bg-richblack-700 p-3 rounded-md text-white'
          />
          <input
            name='lastName'
            type='text'
            value={formData.lastName}
            onChange={handleChange}
            placeholder='Last Name'
            className='bg-richblack-700 p-3 rounded-md text-white'
          />
          <input
            name='dateofBirth'
            type='date'
            value={formData.dateofBirth}
            onChange={handleChange}
            placeholder='Date of Birth'
            className='bg-richblack-700 p-3 rounded-md text-white'
          />
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            className='bg-richblack-700 p-3 rounded-md text-white'
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </select>
          <input
            name='contactNumber'
            type='text'
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder='Contact Number'
            className='bg-richblack-700 p-3 rounded-md text-white'
          />
          <textarea
            name='about'
            value={formData.about}
            onChange={handleChange}
            placeholder='About You'
            className='bg-richblack-700 p-3 rounded-md text-white h-28 resize-none md:col-span-2'
          />
        </div>

        <div className='flex justify-between mt-6'>
          <button
            onClick={handleDeleteAccount}
            className='bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md'
          >
            Delete Account
          </button>
          <button
            onClick={handleProfileUpdate}
            className='bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-md'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
