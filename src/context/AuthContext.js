import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens")
      ? jwt_decode(
          localStorage.getItem("authTokens")
            ? localStorage.getItem("authTokens")
            : sessionStorage.getItem("authTokens")
        )
      : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens")
      ? JSON.parse(
          localStorage.getItem("authTokens")
            ? localStorage.getItem("authTokens")
            : sessionStorage.getItem("authTokens")
        )
      : null;
  });
  const [loading, setLoading] = useState(true);
  const [remember, setRemember] = useState(true);
  const [badge, setBadge] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  let [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    axios
      .post(
        `${baseURL}/token/`,
        JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setRemember(event.target.remember.checked);
        setToken(response.data);
        setUser(jwt_decode(response.data.access));
        event.target.remember.checked
          ? localStorage.setItem("authTokens", JSON.stringify(response.data))
          : sessionStorage.setItem("authTokens", JSON.stringify(response.data));
        navigate("/projects");
      })
      .catch((response) => {
        setBadge(true);
        setTitle("Sign in error");
        setMessage("Password and username combination do not match!");
        setType("danger");
      });
  };

  const updateToken = async (event) => {
    if (loading) {
      setLoading(false);
    } else if (token) {
      axios
        .post(
          `${baseURL}/token/refresh/`,
          {
            refresh: token?.refresh,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setToken(response.data);
            setUser(jwt_decode(response.data.access));
            remember
              ? localStorage.setItem(
                  "authTokens",
                  JSON.stringify(response.data)
                )
              : sessionStorage.setItem(
                  "authTokens",
                  JSON.stringify(response.data)
                );
          } else {
            logoutUser();
          }
        });
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    navigate("/signin");
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, 1000 * 60 * 59 * 4);

    return () => clearInterval(interval);
  }, [loading, token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${baseURL}/projects/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(token?.access),
          },
        })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, [badge, token]);

  const contextData = {
    loginUser: loginUser,
    logoutUser: logoutUser,
    token: token,
    setToken: setToken,
    setUser: setUser,
    user: user,
    badge: badge,
    setBadge: setBadge,
    type: type,
    setType: setType,
    message: message,
    setMessage: setMessage,
    title: title,
    setTitle: setTitle,
    projects: projects,
    setProjects: setProjects,
    loading: loading,
    remember: setRemember,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
