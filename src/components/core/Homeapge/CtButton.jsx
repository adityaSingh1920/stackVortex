import React from 'react'
import { NavLink } from "react-router"

const CtButton = ({children,linkTo,active}) => {
  return (
     <NavLink to={linkTo}>
        
     <div className={`text-center text-[15px] px-6 py-3 rounded font-bold ${active ? "bg-red-600 text-white" : "bg-richblack-300"} transition-all duration-200 hover:scale-95`}>

     {children}

     </div>
     </NavLink>

  )
}

export default CtButton
