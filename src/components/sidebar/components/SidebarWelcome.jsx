import React from "react";
import { useDate } from "../../../hooks/useDate";
import welcome_user from "../assets/welcome_user.svg";

const SidebarWelcome = () => {
  const { wish } = useDate();
  return (
    <div className="sidebar_welcome">
      <img src={welcome_user} alt="" className="welcome_user_img" />
      <div className="welcome_right">
        <p>{wish}</p>
        <p>user@aqgromalin.com</p>
      </div>
    </div>
  );
};

export default SidebarWelcome;
