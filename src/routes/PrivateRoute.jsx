import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // যদি user না থাকে → Login page এ redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // user থাকলে children/inner component দেখাবে
  return children;
};

export default PrivateRoute;
