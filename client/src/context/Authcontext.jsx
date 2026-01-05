import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  //* default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("ecommerce");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, user: parseData.user, token: parseData.token });
    }
    //* eslint-disable-next-line
  }, []);

  const values = { auth, setAuth };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;


/* import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Load auth data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("ecommerce");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  // addded
  const values = { auth, setAuth };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; */
