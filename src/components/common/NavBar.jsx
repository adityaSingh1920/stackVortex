import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/logo.png";
import { NavBarLinks } from "../../layouts/NavBarLinkst";
import { useSelector } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import ProifileDropDown from "../auth/ProifileDropDown";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { TiArrowDown } from "react-icons/ti";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLiknks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("prinitng sublinks", result);
      // console.log("Fetched Categories:", result.data.allCategory);

      setSubLinks(result.data.allCategory);
    } catch (error) {
      console.log("could not connsct the categrory list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12 max-w-maxContent gap-36 items-center justify-center">
        <NavLink to={"/"}>
          <img className="h-44 w-44 mr-5" src={logo} alt="" />
        </NavLink>

        {/* navlinks  */}

        <nav>
          <ul className="flex gap-x-6 text-richblack-500">
            {NavBarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="flex  relative items-center gap-1 text-white group">
                    <p className="font-semibold text-richblack-100 hover:text-yellow-300 x">
                      {link.title}
                    </p>
                    <TiArrowDown className="font-semibold" />

                    <div
                      className="absolute -left-[60%] top-[120%] flex flex-col items-center
                      invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 z-50"
                    >
                      {/* Triangle */}
                      <div className="h-4 w-4 rotate-45 bg-richblack-200 -mb-2 z-0"></div>

                      {/* Dropdown content */}
                      <div className="flex flex-col rounded-md bg-richblack-200 text-richblack-900 w-[200px] z-10 shadow-lg">
                        {subLiknks.length > 0 ? (
                          subLiknks.map((subLink, index) => (
                            <NavLink
                              key={index}
                              to={`/catalog/${subLink.name.toLowerCase()}`}
                            >
                              <p className="px-4 py-2 hover:bg-richblack-100">
                                {subLink.name}
                              </p>
                            </NavLink>
                          ))
                        ) : (
                          <p className="px-4 py-2 text-sm italic text-richblack-400">
                            No categories found
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={link?.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-300  font-semibold"
                        : "text-richblack-100 hover:text-yellow-300 font-semibold"
                    }
                  >
                    {link.title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login signup  */}
        <div className="flex  gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <NavLink to={"/dashboard/cart"} className={"relative"}>
              <BsCart2 />
              {totalItems > 0 && <span>{totalItems}</span>}
            </NavLink>
          )}
          {token == null && (
            <NavLink to={"/login"}>
              <button className="border-richblack-600 border items-center  bg-richblack-900 px-[8px] font-semibold  text-richblack-100 rounded py-[1px]">
                Login
              </button>
            </NavLink>
          )}

          {token == null && (
            <NavLink to={"/sendotp"}>
              <button className="border-richblack-600  items-center font-semibold border bg-richblack-900 px-[12px] text-richblack-100 rounded py-[1px]">
                signup
              </button>
            </NavLink>
          )}

          {token !== null && <ProifileDropDown></ProifileDropDown>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
