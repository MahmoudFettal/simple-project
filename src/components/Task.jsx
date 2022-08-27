import { useState } from "react";
import Options from "./Options";
import TaskForm from "./TaskForm";
import date from "../support/Date";

function Task({ id, title, body, created, onDragStart, project }) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <TaskForm
          edit={() => {
            setEdit(false);
          }}
          editBody={body}
          editTitle={title}
          taskId={id}
          project={project}
        />
      ) : (
        <div
          className="bg-white p-4 rounded-md dark:bg-gray-900"
          draggable
          onDragStart={(e) => onDragStart(e, id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-md font-semibold dark:text-white">{title}</h3>
              <p className="text-xs text-gray-400 mb-2 dark:text-gray-500">
                {date(new Date(created))}
              </p>
            </div>
            <Options taskId={id} edit={() => setEdit(true)} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-200">{body}</p>
        </div>
      )}
    </>
  );
}

export default Task;
