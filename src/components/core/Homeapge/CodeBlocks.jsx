import React from 'react'
import CtButton from './CtButton'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';



const CodeBlocks = ({position,heading,subHeading,ctbtn1,ctbtn2,codeblock,backgroundFradient,codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-36 `}>

       {/* section 1  */}
       <div className='flex flex-col w-[50%] gap-8 '>
        {heading}
      

        <div className='text-richblack-300 font-bold'> 
          {subHeading}
        </div>

        <div className='flex gap-7 mt-7'>

          <CtButton active={ctbtn1.active} linkTo={ctbtn1.linkTo}>
            <div className='flex gap-2 items-center'>
              {ctbtn1.btnText}
              <FaArrowRight />
            </div>
          </CtButton>

          <CtButton active={ctbtn2.active} linkTo={ctbtn2.linkTo}>
            <div className='flex gap-2 items-center'>
              {ctbtn2.btnText}
            </div>
          </CtButton>

        </div>

       </div>

       {/* section 2 */}
       <div className='flex flex-row w-[100%] text-10[px] h-fit  shadow-sm py-4 shadow-blue-25 bg-gradient-to-r from-black to-gray-800 rounded lg:w-[550px]' >
        <div className='w-[8%] flex flex-col text-center text-richblack-300 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`w-[80%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2} `}>

      <TypeAnimation 
      sequence={[codeblock,2000,""
      ]}
      repeat={Infinity}
      omitDeletionAnimation={true}
      cursor={true}
      style={
        {
          whiteSpace:"pre-line",
          display:"block"
        }
      }>

      </TypeAnimation>
          
        </div>
         
       </div>

    </div>
  )
}

export default CodeBlocks
