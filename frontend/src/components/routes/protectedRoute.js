import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticatedUser, user } = useSelector(
    (state) => state.authUser
  );
  if (isAuthenticatedUser) {
    return children;
  } else {
    return <Navigate to="/user/login" />;
  }
};

export default ProtectedRoute;
