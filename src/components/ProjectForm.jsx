import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function ProjectForm({ close, id, projectName = "", projectDescription = "" }) {
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);
  const { token, setTitle, setMessage, setBadge, setType, badge } =
    useContext(AuthContext);

  const navigate = useNavigate();
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

      if (id) {
        axios
          .put(`${baseURL}/project/${id}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(token.access),
            },
          })
          .then((response) => {
            setBadge(true);
            setTitle("Successful operation");
            setMessage("Project updated successfully");
            setType("success");
            setName("");
            setDescription("");
            close();
            navigate(`/project/${response.data}`);
          })
          .catch((response) => {
            setBadge(true);
            setType("danger");
            setTitle("Error");
            setMessage(response.data);
          });
      } else {
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
            setMessage("Project created successfully");
            setType("success");
            setName("");
            setDescription("");
            navigate(`/project/${response.data}`);
          })
          .catch((response) => {
            setBadge(true);
            setType("danger");
            setTitle("Error");
            setMessage(response.response.data);
          });
      }
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <div className="absolute z-40 grid place-items-center w-screen h-screen bg-black/50 dark:bg-white/50">
        <form
          ref={ref}
          className="bg-white dark:bg-gray-900 w-full max-w-md lg:max-w-lg rounded m-5"
          onSubmit={saveProject}
        >
          <h1 className="p-7 pb-0 dark:text-white font-bold text-xl">
            {id ? "Edit" : "Create"} Project:
          </h1>
          <hr className="my-5 border-gray-300 dark:border-gray-600" />
          <div className="p-7 pt-0">
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
                onClick={close}
                className="w-full bg-gray-200 py-1.5 rounded-md text-gray-700 dark:text-gray-50 hover:text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:hover:text-white dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="save"
                className="w-full bg-green-700 py-1.5 rounded-md text-white dark:text-gray-50 hover:text-gray-50 hover:bg-green-600 dark:bg-green-800 dark:hover:text-white dark:hover:bg-green-900"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProjectForm;
