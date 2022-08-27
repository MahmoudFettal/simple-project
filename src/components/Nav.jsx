import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";

function Nav({}) {
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
    <nav className="flex justify-between items-center w-full max-w-7xl px-3 py-3 border-b-2 mx-10 border-gray-700 text-gray-200">
      <Link to="/">
        <h1 className="text-center font-extralight text-2xl text-white">
          Simple<span className="font-bold">Project</span>{" "}
        </h1>
      </Link>
      <Link to="/signin">
        <div className="py-2 px-5 bg-gray-200 hover:bg-white focus:bg-white rounded-lg font-bold">
          <p className="text-md text-gray-900">Sign In</p>
        </div>
      </Link>
    </nav>
  );
}

export default Nav;
