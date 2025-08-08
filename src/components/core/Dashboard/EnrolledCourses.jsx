import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth)

    const [enrolledCourses,setEnrolledCourses] = useState(null)
    
  return (
    <div>
        <div>
            Enrolled Courses
        </div>
         
    </div>
  )
}

export default EnrolledCourses