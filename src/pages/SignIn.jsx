import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import { signInFields } from "../support/formFields";
import Input from "../components/Input";
import FormOptions from "../components/FormOptions";
import Submit from "../components/Submit";
import AuthContext from "../context/AuthContext";
import Alert from "../components/Alert";

const fields = signInFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function SignIn() {
  const { loginUser } = useContext(AuthContext);
  const [loginState, setLoginState] = useState(fieldsState);

  const {
    setMessage,
    setTitle,
    setBadge,
    setType,
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
              heading="Login to your account"
              paragraph="Don't have an account yet? "
              linkName="Sign Up"
              linkUrl="/signup"
            />
            <form className="mt-8 space-y-10 px-5" onSubmit={loginUser}>
              <div className="-space-y-px">
                {fields.map((field) => (
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
              <FormOptions />
              <Submit text="Sign in" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
