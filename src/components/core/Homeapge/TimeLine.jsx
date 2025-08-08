import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImg from '../../../assets/Images/img1.png'

const timeLine = [
    {
        Logo: logo1,
        heading: "Leadership",
        description: "Full comitted to the sucees company"
    },
    {
        Logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority "
    },
    {
        Logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        Logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]

const TimeLine = () => {
    return (
        <div>
            <div className='flex flex-row  items-center gap-20 mt-10'>
                {/* left box  */}
                <div className='flex flex-col w-[45%] gap-5'>

                    {
                        timeLine.map((element, index) => {
                            return (
                                <div key={ index }>
                                    <div className='flex flex-row gap-6' >

                                        <div className=' flex w-[35px] h-[35px] bg-white justify-center items-center] rounded-md'>
                                            <img src={element.Logo} alt="" />
                                        </div>
                                        <div>
                                            <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                            <h3 className='text-base'>{element.description}</h3>
                                        </div>


                                    </div>
                                   <div className='flex flex-col items-start gap-1 '>
                                   <div className='border h-2'></div>
                                    <div className='border h-2' ></div>
                                    <div className='border h-2'></div>
                                   </div>
                                </div>

                            )
                        })
                    }



                </div>

                {/* right section  */}
                <div className='relative shadow-blue-50'>
                    <img src={timeLineImg} alt="" className='shadow-blue-100 shadow-md  w-[860px] h-fit rounded-md' />

                    <div className='absolute  bg-richblack-800 flex flex-row text-white uppercase py-8 
                    left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                       <div className='flex flex-row gap-3 items-center border-r border-caribbeangreen-200 px-8'>
                       <p className='text-3xl font-bold'>2</p>
                       <p className='text-sm'> Years of Experience</p>
                       </div>
                       <div className='flex flex-row gap-3 items-center border-r border-caribbeangreen-200 px-7'>
                       <p className='text-3xl font-bold'>100</p>
                       <p className='text-sm'> Types of courses</p>
                       </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default TimeLine
