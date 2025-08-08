import React from 'react'
import * as Icons from 'react-icons/vsc'
import { NavLink, useLocation } from 'react-router-dom'

const SiderBarLinks = ({ link, iconName }) => {
  const Icon = Icons[iconName]
  const location = useLocation()

  const isActive = location.pathname === link.path

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        isActive ? "bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] ${
          isActive ? "bg-yellow-800" : "bg-opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SiderBarLinks
