import React, { useContext, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import date from "../support/Date";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function ProjectHeader({ data, open }) {
  const { token, setTitle, setMessage, setBadge, setType } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const deleteProject = () => {
    axios
      .delete(`${baseURL}/project/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      })
      .then((response) => {
        setBadge(true);
        setTitle("Successful operation");
        setMessage("Project deleted successfully");
        setType("success");
        navigate("/projects");
      })
      .catch((response) => {
        setBadge(true);
        setTitle("Error");
        setMessage(response.data);
        setType("warning");
      });
  };

  return (
    <>
      <div className="bg-white grid py-10 px-10 w-full max-w-8xl items-start grid-cols-1 lg:grid-cols-2 dark:bg-gray-900">
        <div className="row">
          <p className="font-light text-sm dark:text-white">Project:</p>
          <h1 className="font-bold text-3xl dark:text-white">{data.name}</h1>
          <h2 className="text-gray-700 mb-4 text-sm dark:text-gray-400">
            Created: {date(new Date(data.created))}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 line-clamp-2">
            {data.description}
          </p>
        </div>
        <div className="flex gap-5 mt-5 justify-end">
          <button
            onClick={deleteProject}
            className="flex items-center justify-center font-semibold bg-gray-900 hover:bg-red-500 text-gray-100 dark:bg-gray-600 dark:hover:bg-red-500 dark:text-gray-100 rounded w-32 py-2 px-2"
          >
            <MdDelete className="text-xl mr-2" /> Delete
          </button>
          <button
            onClick={open}
            className="flex items-center justify-center font-semibold bg-gray-900 hover:bg-blue-500 text-gray-100 dark:bg-gray-600 dark:hover:bg-blue-500 dark:text-gray-100 rounded w-32 py-2 px-2"
          >
            <MdModeEdit className="text-xl mr-2" /> Edit
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectHeader;
