import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const ProifileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Avatar + Chevron */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.image ?  <>
          <img src={user?.image} alt={`profile-${user?.firstName}`}
          className='aspect-square w-[78px] rounded-full object-cover' />
          </>:  <FaUserCircle className="text-2xl text-richblack-300" /> }
       
        <FiChevronDown className="text-lg text-richblack-100" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-richblack-800 text-richblack-100 rounded shadow-md z-50">
          <div
            onClick={() => {
              navigate("/dashboard/my-profile");
              setIsOpen(false);
            }}
            className="px-4 py-2 hover:bg-richblack-700 cursor-pointer"
          >
            Dashboard
          </div>
        </div>
      )}
    </div>
  );
};

export default ProifileDropDown;
