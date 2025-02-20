import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { authContext } from "../AuthProvider/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
}
