import React, { Children, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import Spinner from "../Spinner";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (!auth?.token) {
    return <Spinner path="login" from={location.pathname} />;
  }
  return children;
};

export default AdminRoute;
