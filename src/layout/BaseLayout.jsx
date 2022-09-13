import React, { useState } from "react";
import "./BaseLayout.css";
import { Outlet } from "react-router";
import Sidebar from "../components/sidebar/Sidebar";

const BaseLayout = () => {
  const [sidebarFold, setSidebarFold] = useState(
    JSON.parse(localStorage.getItem("fms-sidebar-fold")) || false
  );
  return (
    <div
      className={sidebarFold ? "base_container sidebar-fold" : "base_container"}
    >
      <div className="sidebar_container">
        <Sidebar setSidebarFold={setSidebarFold} sidebarFold={sidebarFold} />
      </div>
      <div className="content_container">
        <Outlet />
      </div>
    </div>
  );
};

export default BaseLayout;
