import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/Authcontext";

const Spinner = ({ path = "login", from }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  /* const location = useLocation(); */
  const { auth } = useContext(AuthContext);

  /* useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000); */
  /* count === 0 && navigate(`/${path}`, { state: location.pathname }); */
  /* if (count === 0) {
      navigate(`/${path}`, { state: { from: location.pathname } });
    } */

  useEffect(() => {
    if (auth?.token) {
      // ✅ if user is logged in, go to dashboard immediately
      navigate("/dashboard", { replace: true });
      return;
    }

    // else, run countdown
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}`, { state: { from }, replace: true });
    }
    return () => clearInterval(interval);
  }, [count, navigate, path, from, auth?.token]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 p-8 text-center">
      <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin shadow-lg"></div>
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Redirecting...
        </h1>
        <p className="text-xl text-gray-600">{`Jumping to your dashboard in ${count} seconds`}</p>
      </div>
      <div className="space-y-1 text-sm text-gray-500">
        <p>• Fast & secure redirection</p>
        <p>• Protecting your session</p>
      </div>
    </div>
  );
};

export default Spinner;
