import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/Routes/studentRout/routes";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}
