import React from 'react'

const HighlightText = ({text}) => {
  return (
    // add gradient 
   <span className='font-bold bg-gradient-to-r from-red-700 to-purple-500 bg-clip-text text-transparent'>
    {" "}
    {text}
   </span>
  )
}

export default HighlightText
