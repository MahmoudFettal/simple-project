import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { signUpFields } from "../support/formFields";
import Input from "../components/Input";
import Submit from "../components/Submit";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const fields = signUpFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function SignUp() {
  const {
    setMessage,
    setTitle,
    setBadge,
    remember,
    setType,
    setToken,
    setUser,
    badge,
    message,
    type,
    title,
  } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setBadge(false);
      setTitle("");
      setMessage("");
      setType("");
    }, 2500);
  }, [badge, setMessage, setTitle, setBadge, setType]);

  const [loginState, setLoginState] = useState(fieldsState);
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", loginState["firstname"]);
    formData.append("last_name", loginState["lastname"]);
    formData.append("email", loginState["email"]);
    formData.append("username", loginState["username"]);
    formData.append("password", loginState["password"]);
    formData.append("password2", loginState["confirm"]);

    axios
      .post(`${baseURL}/register/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTimeout(() => {
          axios
            .post(
              `${baseURL}/token/`,
              JSON.stringify({
                username: loginState["username"],
                password: loginState["password"],
              }),
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              remember(false);
              setToken(response.data);
              setUser(jwt_decode(response.data.access));
              navigate("/projects");
            })
            .catch((response) => {});
        }, 1000);
      })
      .catch((response) => {
        setPhase(0);
        setBadge(true);
        setType("danger");

        if (response.response.data.email) {
          setTitle("Email Error");
          setMessage("This email is already used");
        } else if (response.response.data.username) {
          setTitle("Username Error");
          setMessage(response.response.data.username);
        } else if (response.response.data.password) {
          setTitle("Password Error");
          setMessage(response.response.data.password[0]);
        } else {
          setTitle("Sign Up error");
          setMessage("An error has occured!");
        }
      });
  };

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  return (
    <>
      {badge && (
        <Alert
          type={type}
          title={title}
          message={message}
          close={() => {
            setBadge(false);
          }}
        />
      )}
      <div className="grid lg:grid-cols-2 min-h-screen dark:bg-gray-900 dark:text-white">
        <div className="bg-gray-100 dark:bg-gray-800 hidden lg:grid place-items-center">
          <div className="h-64 w-64 dark:bg-white bg-gray-900 rounded-full" />
          <div className="absolute bottom-0 h-1/2 w-1/2 dark:bg-gray-800/50 bg-gray-100/50 backdrop-blur-lg" />
        </div>
        <div className="grid place-items-center">
          <div className="max-w-sm w-full space-y-10">
            <Header
              heading="Create a new account"
              paragraph="Already have an account? "
              linkName="Sign In"
              linkUrl="/signin"
            />
            <form className="space-y-6 px-5" onSubmit={register}>
              <div className="flex-row mb-10">
                {fields.slice(phase * 3, (phase + 1) * 3).map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={loginState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                ))}
              </div>
              {phase === 0 && (
                <button
                  onClick={() => {
                    setPhase(phase + 1);
                  }}
                  className="group font-semibold relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-600"
                >
                  Next
                </button>
              )}
              {phase === 1 && (
                <div className="grid grid-cols-2 gap-x-5">
                  <button
                    onClick={() => {
                      setPhase(phase - 1);
                    }}
                    className="group h-fit font-semibold  relative flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-600"
                  >
                    Back
                  </button>
                  <Submit text="Sign Up" className="mt-0" />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
