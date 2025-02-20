import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/icons8-task-64.png";
import { authContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
export default function Navbar() {
  const { user, signOutUser } = useContext(authContext);
  // const user = "snigdha";
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const links = (
    <>
      <NavLink to="/">
        <li>Home</li>
      </NavLink>
      {user && (
        <NavLink to="/dashboard">
          <li>Dashboard</li>
        </NavLink>
      )}
    </>
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleSignOut = () => {
    signOutUser().then(() => {});
  };
  // Theme toggle state and effect using new key in localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("storeDarkLight") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("storeDarkLight", theme); // Changed the key here
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`w-full fixed top-0 z-10 transition-all duration-500 ease-in-out ${
        pathname === "/"
          ? isScrolled
            ? "bg-primary/35 backdrop-blur-md" // Background color when scrolled on homepage
            : "bg-transparent" // Transparent background on homepage
          : "bg-primary/35 backdrop-blur-xl" // Non-transparent background on other pages
      }`}
    >
      <div className="navbar lg:w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="text-2xl flex items-center justify-center font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
            <img className="w-14 h-14" src={logo} alt="" />
            Task Manager
          </a>
        </div>
        <div className="navbar-end">
          <div className=" hidden lg:flex mr-3">
            <ul className="menu menu-horizontal gap-6 px-1 font-semibold ">
              {links}
            </ul>
          </div>
          {user ? (
            <div className="relative flex">
              <div
                className="relative flex items-center"
                onMouseEnter={() => setIsHovered(true)}
              >
                <img
                  src={user.photoURL}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user?.displayName}
                  alt="User Profile"
                  className="w-12 h-12 mr-2 rounded-full object-cover cursor-pointer"
                />
                <Tooltip id="my-tooltip" />
                <Link
                  onClick={handleSignOut}
                  to="/login"
                  className="btn bg-gradient-to-r from-primary to-secondary text-white"
                >
                  Log Out
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-x-1">
              <Link
                to="/login"
                className="btn bg-gradient-to-r from-primary to-secondary text-white"
              >
                Login
              </Link>
            </div>
          )}
          <label className="swap swap-rotate ml-2">
            {/* this hidden checkbox controls the state */}
            <input
              onChange={toggleTheme}
              checked={theme === "dark"}
              type="checkbox"
              className="theme-controller "
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-7 text-black fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              // className="text-white"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 text-white w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
