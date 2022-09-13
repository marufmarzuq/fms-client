import React from "react";
import information_icon from "../assets/information.svg";
import setting_icon from "../assets/setting.svg";
import notification_icon from "../assets/notification.svg";
import logout_icon from "../assets/logout.svg";

const SidebarFooter = () => {
  return (
    <div className="sidebar-footer">
      <div>
        <img src={information_icon} alt="" />
      </div>
      <div>
        <img src={setting_icon} alt="" />
      </div>
      <div>
        <img src={notification_icon} alt="" />
      </div>
      <div>
        <img src={logout_icon} alt="" />
      </div>
    </div>
  );
};

export default SidebarFooter;
