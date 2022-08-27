import React from "react";
import notFound from "../static/24.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="grid place-items-center h-screen dark:bg-gray-900 ">
      <div className="grid justify-items-center">
        <h1 className="text-center text-xl md:text-4xl font-semibold text-notFound">
          Page <span className="text-gray-900 dark:text-white">not found!</span>
        </h1>
        <img src={notFound} className="h-96 w-auto spin" alt="not found" />
        <button className="relative z-50 text-md md:text-xl font-semibold text-white bg-gray-700 hover:bg-gray-600 w-fit px-5 py-2.5 rounded-md">
          <Link to="/">Return to home</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
