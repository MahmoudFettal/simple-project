import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function SideBar({ sidebar }) {
  const {
    token,
    user,
    setTitle,
    setMessage,
    setBadge,
    setType,
    badge,
    projects,
  } = useContext(AuthContext);

  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveProject = (event) => {
    event.preventDefault();

    if (name === "") {
      setBadge(true);
      setType("danger");
      setTitle("Error");
      setMessage("Title musn't be empty!");
    } else if (description === "") {
      setBadge(true);
      setTitle("Error");
      setTitle("Error");
      setType("danger");
      setMessage("Body musn't be empty!");
    } else {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);

      axios
        .post(`${baseURL}/project/`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(token.access),
          },
        })
        .then((response) => {
          setBadge(true);
          setTitle("Successful operation");
          setMessage("Task deleted successfully");
          setType("success");
          setName("");
          setDescription("");
          setAdd(false);
        })
        .catch((response) => {
          setType("danger");
          setTitle("Error");
          setMessage(response.data);
          setBadge(true);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setBadge(false);
      setTitle("");
      setMessage("");
      setType("");
    }, 5000);
  }, [badge]);

  return (
    <>
      <div
        onClick={sidebar}
        className="absolute h-screen w-screen bg-black/50 dark:bg-gray-100/50"
      ></div>
      <div className="absolute w-80 h-screen bg-white dark:bg-gray-900 overflow-y-auto pb-7 sidebar">
        <div className="p-7">
          <p className="text-gray-700 dark:text-gray-400">
            Hello <span className="font-bold">{user.username}</span>,
          </p>
          <h1 className="mt-1 text-3xl font-bold dark:text-white">
            Your projects
          </h1>
        </div>
        <hr className="mb-4 border-gray-300 dark:border-gray-700" />
        {projects.map((project, key) => {
          return (
            <Link
              key={key}
              to={`/project/${project.slug}`}
              onClick={() => {
                sidebar();
              }}
              className="block w-full text-left dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  py-3 px-7 overflow-x-hidden"
              style={{ whiteSpace: "nowrap" }}
            >
              {project.name}
            </Link>
          );
        })}
        <hr className="my-4 border-gray-300 dark:border-gray-700" />
        <div className="px-7">
          {add ? (
            <form onSubmit={saveProject}>
              <div className="flex justify-between items-center mb-3">
                <div className="w-full">
                  <label htmlFor="taskTile" className="sr-only">
                    Project title
                  </label>
                  <input
                    name="taskTile"
                    type="text"
                    placeholder="Project title"
                    className="outline-none w-full focus:border-b-2 focus:border-gray-500 pb-1 font-semibold bg-transparent dark:text-white"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </div>
              </div>
              <label htmlFor="taskBody" className="sr-only">
                Project description
              </label>
              <textarea
                name="taskBody"
                id="taskBody"
                className="w-full outline-none bg-transparent dark:text-gray-50"
                placeholder="Project description...."
                rows={5}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <div className="flex gap-5 mt-2.5">
                <button
                  onClick={() => {
                    setAdd(false);
                  }}
                  className="w-full bg-gray-200 py-1.5 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="save"
                  className="w-full bg-green-700 py-1.5 rounded-md text-white dark:text-gray-200 hover:text-gray-50 hover:bg-green-600 dark:bg-green-800 dark:hover:text-white dark:hover:bg-green-900"
                />
              </div>
            </form>
          ) : (
            <button
              onClick={() => {
                setAdd(true);
              }}
              className="w-full bg-gray-200 py-2.5 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-800"
            >
              Add a project
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
