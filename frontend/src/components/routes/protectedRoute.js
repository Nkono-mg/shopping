import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticatedUser, user } = useSelector(
    (state) => state.authUser
  );
  if (isAuthenticatedUser) {
    return children;
  } 
  if (isAdmin === true && user.role !=="admin") {
    
    return <Navigate to="/" />;
  } 
  return <Navigate to="/user/login" />;
};

export default ProtectedRoute;
