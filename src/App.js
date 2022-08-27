import "./App.css";
import Project from "./pages/Project";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import { useContext, useEffect } from "react";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function PrivateRoute({ children, ..._ }) {
  const {
    user,
    loading,
    badge,
    message,
    type,
    title,
    setBadge,
    setTitle,
    setMessage,
    setType,
  } = useContext(AuthContext);
  useEffect(() => {
    setTimeout(() => {
      setBadge(false);
      setTitle("");
      setMessage("");
      setType("");
    }, 2500);
  }, [badge]);
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
      {!user ? <Navigate to="/signin" /> : loading ? null : children}
    </>
  );
}

function App() {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/project/:slug"
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
