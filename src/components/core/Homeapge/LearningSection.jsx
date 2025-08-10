import React from 'react'
import HighlightText from './HighlightText'
import img1 from '../../../assets/Images/Know_your_progress.svg'
import img2 from '../../../assets/Images/Plan_your_lessons.svg'
import img3 from '../../../assets/Images/Compare_with_others.svg'
import CtButton from './CtButton'

const LearningSection = () => {
  return (
    <div className='mt-[130px] mb-20'>
      <div className='flex flex-col gap-5 items-center  '>

        <div className='text-4xl text-center font-semibold'>
            Your swiss knife for
            <HighlightText text={"learning any language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base font-semibold w-[78%]'>
            <p>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
        {/* image section  */}
        <div className='flex flex-row mt-5 items-center justify-center mx-9'>

            <img src={img1} alt="" className=' w-1/3 -mr-10  ' />
            <img src={img3} alt="" className=' w-1/3  ' />
            <img src={img2} alt="" className='  w-1/3 -ml-14' />

        </div>
        <div className='w-fit '>
            <CtButton linkTo={'/signup'} active={true}>Learn more</CtButton>
        </div>



      </div>
    </div>
  )
}

export default LearningSection
