import React from 'react'
import { NavLink } from "react-router"
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/Homeapge/HighlightText';
import CtButton from '../components/core/Homeapge/CtButton';
import Banner from '../assets/Images/video.mp4'
import CodeBlocks from '../components/core/Homeapge/CodeBlocks';
import TimeLine from '../components/core/Homeapge/TimeLine';
import LearningSection from '../components/core/Homeapge/LearningSection';
import InstructorSection from '../components/core/Homeapge/InstructorSection';
import Footer from '../components/core/Homeapge/Footer';
import SignupPage from '../components/auth/SignupPage';
import LoginPage from '../components/auth/LoginPage';

const Home = () => {
  return (
    <div>

      {/* section 1 */}

      <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between'>

        <NavLink to={'/signup'}>

          <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            {/* add shadow  */}
            <div className='flex flex-row justify-center gap-2 items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:text-richblack-900 '>
              <p>Become a instructor</p>
              <FaArrowRight />

            </div>

          </div>

        </NavLink>

        <div className='text-center text-4xl  font-semibold mt-7'>
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className='text-center text-lg mt-4 w-[75%] text-richblack-300 ' >
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CtButton active={true} linkTo={'/signup'}>Learn demo </CtButton>

          <CtButton active={false} linkTo={'/login'}>Book demo </CtButton>
        </div>

        <div className=' mx-20 my-5 shadow-md shadow-white'>
          {/* gradient at top  */}
          {/* shadow in bottom-white left-blue */}
          <video className='rounded-sm'
            muted
            autoPlay
            loop>
            <source src={Banner} type='video/mp4' />

          </video>
        </div>

        {/* code section 1  */}
        <div>
          <CodeBlocks position={"lg:flex-row"}
            heading={<div className='text-4xl font-semibold'>
              Unlock your
              <HighlightText text={"coding potentials"}></HighlightText>
              {" "}with our online courses
            </div>}
            subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctbtn1={
              {
                active: true,
                linkTo: "/signup",
                btnText: "Try it yourself"
              }
            }
            ctbtn2={
              {
                active: false,
                linkTo: "/signup",
                btnText: "Try it yourself"
              }
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
            codeColor={"text-blue-100"}>


          </CodeBlocks>
        </div>

        {/* code Section 2  */}

        <div>
          <CodeBlocks position={"lg:flex-row-reverse"}
            heading={<div className='text-4xl font-semibold'>
              Start
              <HighlightText text={"coding in seconds"}></HighlightText>
              {" "}
            </div>}
            subHeading={" Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctbtn1={
              {
                active: true,
                linkTo: "/signup",
                btnText: "Continue Lesson"
              }
            }
            ctbtn2={
              {
                active: false,
                linkTo: "/signup",
                btnText: "Learn More"
              }
            }
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
            codeColor={"text-yellow-300"}>


          </CodeBlocks>
        </div>

      </div>

      {/* section 2  */}

      <div className='bg-pure-greys-5 text-richblack-800' >

        <div className='homepage_bg h-[250px] mx-12'>

          <div className='w-11/12 max-w-maxContent flex 
                justify-center
                items-center gap-5 mx-16'>
            <div className='h-[150px] mb-32'></div>

            <div className='flex flex-row gap-7 text-white'></div>

            <CtButton active={true} linkTo={'/signup'} >
              <div className='flex gap-3 items-center'>Explore Full Catalog
                <FaArrowRight />
              </div>

            </CtButton>

            <CtButton active={false} linkTo={'/signup'} >
              <div  >Learn More
              </div>

            </CtButton>



          </div>

        </div>



        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7'>

          <div className='flex flex-row items-center justify-between gap-10 mb-8  mt-[55px]'>

            <div className='text-3xl font-semibold  text-richblack-900 w-[55%]'>
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>
            <div>

              <div className='fon flex flex-col gap-10 items-start  '>
                <p className='text-[16px] font-bold'>The modern StackVortex is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <CtButton active={true} linkTo={'/signup'}>Learn more</CtButton>
              </div>
            </div>

          </div>
          <TimeLine />
          <LearningSection></LearningSection>


        </div>



      </div>


      {/* section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-center bg-richblack-900 text-white '>

        <InstructorSection />

        <h2 className='text-center text-4xl font-semibold mt-10'>Review from other Learners</h2>

        {/* slider here  */}

      </div>




      {/* section 4  */}
      <Footer/>

    </div>
  )
}

export default Home
