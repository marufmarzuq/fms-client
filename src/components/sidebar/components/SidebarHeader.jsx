import React from "react";
import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import { AiOutlineMenu } from "react-icons/ai";

const SidebarHeader = ({ sidebarFold, setSidebarFold }) => {
  return (
    <div className="sidebar_header">
      <img src={logo} alt="" className="logo" />
      <div
        className="menu_btn"
        onClick={() => {
          setSidebarFold(!sidebarFold);
          localStorage.setItem(
            "fms-sidebar-fold",
            JSON.stringify(!sidebarFold)
          );
        }}
      >
        <AiOutlineMenu />
      </div>
    </div>
  );
};

export default SidebarHeader;
