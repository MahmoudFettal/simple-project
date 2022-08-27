import { MdOutlineOpenInFull, MdClose, MdCheck } from "react-icons/md";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function TaskForm({ close, laneId, editTitle, editBody, edit, taskId, project }) {
  const { token, setTitle, setMessage, setBadge, setType, badge } =
    useContext(AuthContext);

  const [title, setTaskTitle] = useState(editTitle ? editTitle : "");
  const [body, setBody] = useState(editBody ? editBody : "");

  const saveTask = (event) => {
    event.preventDefault();

    if (title === "") {
      setBadge(true);
      setType("danger");
      setTitle("Error");
      setMessage("Title musn't be empty!");
    } else if (body === "") {
      setBadge(true);
      setTitle("Error");
      setTitle("Error");
      setType("danger");
      setMessage("Body musn't be empty!");
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("body", body);

      if (edit) {
        axios
          .put(`${baseURL}/task/${taskId}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(token.access),
            },
          })
          .then((response) => {
            setBadge(true);
            setTitle("Successful operation");
            setMessage("Task updated successfully");
            setType("success");
            setTaskTitle("");
            setBody("");
            edit();
          })
          .catch((response) => {
            console.log(response);
            setType("danger");
            setTitle("Error");
            setMessage(response.data);
            setBadge(true);
          });
      } else {
        data.append("stage", laneId);
        data.append("project", project.id);
        axios
          .post(`${baseURL}/task/`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(token.access),
            },
          })
          .then((response) => {
            close(false);
            setBadge(true);
            setTitle("Successful operation");
            setMessage("Task deleted successfully");
            setType("success");
            setTaskTitle("");
            setBody("");
          })
          .catch((response) => {
            setType("danger");
            setTitle("Error");
            setMessage(response.data);
            setBadge(true);
          });
      }
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
      <div className="bg-white p-4 rounded-md dark:bg-gray-800">
        <div className="flex justify-between items-center mb-3">
          <div>
            <label htmlFor="taskTile" className="sr-only">
              Task title
            </label>
            <input
              name="taskTile"
              type="text"
              placeholder="Task title"
              className="outline-none focus:border-b-2 focus:border-gray-500 pb-1 font-semibold bg-transparent dark:text-white"
              value={title}
              onChange={(event) => {
                setTaskTitle(event.target.value);
              }}
            />
          </div>
          <div className="flex gap-2.5 items-center">
            <MdOutlineOpenInFull className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" />
            <MdClose
              onClick={() => {
                if (close) {
                  close(false);
                }
                if (edit) {
                  edit();
                }
              }}
              className="text-lg text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            />
            <MdCheck
              onClick={saveTask}
              className="text-lg text-gray-500 hover:text-gray-800dar k:hover:text-gray-200"
            />
          </div>
        </div>
        <label htmlFor="taskBody" className="sr-only">
          Task body
        </label>
        <textarea
          name="taskBody"
          id="taskBody"
          className="w-full outline-none bg-transparent dark:text-gray-50"
          placeholder="Task description...."
          value={body}
          rows={5}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </div>
    </>
  );
}

export default TaskForm;
