import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProjectHeader from "../components/ProjectHeader";
import Board from "../components/Board";
import AuthContext from "../context/AuthContext";
import SideBar from "../components/SideBar";
import notFound from "../static/24.svg";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";

const baseURL = process.env.REACT_APP_BACKEND_URL;

function Project() {
  const { token, badge } = useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  const [open, setOpen] = useState(false);

  const { slug } = useParams();
  const loadProjects = () => {
    axios
      .get(`${baseURL}/projects/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(token.access),
        },
      })
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((response) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProjects();
  }, [slug, badge]);

  return (
    <>
      {open && (
        <ProjectForm
          close={() => setOpen(false)}
          projectName={project.name}
          projectDescription={project.description}
          id={project.id}
        />
      )}
      {sidebar && (
        <SideBar
          sidebar={() => {
            setSidebar(false);
          }}
        />
      )}
      <div className="flex flex-col items-center h-screen w-screen dark:bg-gray-900 overflow-y-auto home">
        <Navbar
          sidebar={() => {
            setSidebar(true);
          }}
        />
        <div className="grow flex flex-col w-full items-center">
          {project ? (
            <>
              <ProjectHeader data={project} open={() => setOpen(true)} />
              <Board project={project} />
            </>
          ) : (
            <div className="grow grid items-center justify-center py-10">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <h1 className="text-center text-xl md:text-4xl font-semibold text-notFound">
                    Project{" "}
                    <span className="text-gray-900 dark:text-white">
                      not found!
                    </span>
                  </h1>
                  <img
                    src={notFound}
                    className="h-96 w-auto spin"
                    alt="not found"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Project;
