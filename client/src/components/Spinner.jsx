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
    <div>
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 bg-[#111111] text-gray-500">
        <h1 className="text-2xl">{`Redirecting in ${count} seconds`}</h1>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      </div>
    </div>
  );
};

export default Spinner;
