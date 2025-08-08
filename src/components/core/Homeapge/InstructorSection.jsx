import React from 'react'
import instructor from '../../../assets/Images/img2.jpg'
import HighlightText from './HighlightText'
import CtButton from './CtButton'
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className='mt-14'>
      <div className='flex flex-row gap-20 items-center'>
        {/* left section  */}
        <div className='w-[50%]'> 
            <img src={instructor} alt=""
            className='shadow-blue-200 shadow-md h-[550px] w-[550px] rounded-md' />
        </div>

        {/* right section  */}
        <div className='w-[50%] flex flex-col  '>
            <div className='text-4xl font-semibold w-[50%] mb-2'>Become an <HighlightText text={"Instructor"}/></div>

            <p className='font-medium text-[16px] w-[80%] text-richblack-500 mb-12'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <div className='w-fit'>
            <CtButton active={true} linkTo={'/signup'}>
            <div className='flex flex-row gap-2 '>Start Teaching Today
             <FaArrowRight/>
                </div></CtButton>
            </div>
           

        </div>

      </div>
    </div>
  )
}

export default InstructorSection
