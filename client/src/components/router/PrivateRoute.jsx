/* import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/Authcontext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [okay, setOkay] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/user-auth");
      if (data.okay) {
        setOkay(true);
      } else {
        setOkay(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return okay ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
 */

import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import Spinner from "../Spinner";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.token) {
    // not logged in → show spinner before redirecting to login
    return <Spinner path="login" from={location.pathname} />;
  }

  // logged in → render the page
  return children;
};

export default PrivateRoute;
