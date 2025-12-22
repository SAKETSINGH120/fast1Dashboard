import React, { useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { Sidebar } from "../Components/Sidebar/Sidebar";
import Sidebar from "../Components/Sidebar/Sidebar";

export const CheckAuth = () => {
  const login = useRef(false);
  const isLoggedIn = localStorage.getItem("isFastoneLoggedIn");

  if (isLoggedIn === "true") {
    login.current = true;
  }

  return login.current ? (
    <Sidebar>
      <Outlet />{" "}
    </Sidebar>
  ) : (
    <Navigate to="/login" replace />
  );
};
