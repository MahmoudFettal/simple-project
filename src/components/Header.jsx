import React from "react";
import { Link } from "react-router-dom";

function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
  return (
    <div className="mb-10">
      <Link to="/">
        <h1 className="text-center font-extralight text-4xl text-gray-500">
          Simple<span className="font-bold">Project</span>{" "}
        </h1>
      </Link>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
        {paragraph}{" "}
        <Link to={linkUrl} className="font-medium dark:text-white">
          {linkName}
        </Link>
      </p>
    </div>
  );
}

export default Header;
