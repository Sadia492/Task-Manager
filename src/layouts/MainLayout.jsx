import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div>
      <ScrollRestoration />
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
