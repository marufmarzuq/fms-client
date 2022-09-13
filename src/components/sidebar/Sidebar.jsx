import React from "react";
import SidebarFooter from "./components/SidebarFooter";
import SidebarHeader from "./components/SidebarHeader";
import SidebarMenu from "./components/SidebarMenu";
import SidebarWelcome from "./components/SidebarWelcome";
import "./sidebar.css";

const Sidebar = ({ sidebarFold, setSidebarFold }) => {
  return (
    <div>
      <SidebarHeader
        sidebarFold={sidebarFold}
        setSidebarFold={setSidebarFold}
      />
      <SidebarWelcome />
      <SidebarMenu />
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
