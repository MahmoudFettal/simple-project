import React, { useContext } from "react";
import { MdOutlineDarkMode, MdLogout, MdViewStream } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar({ sidebar }) {
  const { user, logoutUser } = useContext(AuthContext);

  const dark = () => {
    if (localStorage.theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return ( 
    <nav className="flex justify-between items-center w-full max-w-8xl px-10 py-5 border-b-2 border-gray-100 dark:border-gray-700 dark:text-gray-200">
      <button
        onClick={sidebar}
        className="flex items-center gap-2.5 dark:text-white"
      >
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg w-fit h-fit">
          <MdViewStream className="text-2xl dark:text-white" />
        </div>
        <Link to="/projects" className="text-md font-semibold">
          Project Board
        </Link>
      </button>
      <div className="flex items-center justify-self-end">
        <MdOutlineDarkMode
          onClick={dark}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white"
        />

        <span className="mx-2.5">|</span>
        <button
          onClick={logoutUser}
          className="flex items-center gap-1.5 hover:text-gray-800 dark:hover:text-white"
        >
          <MdLogout />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
