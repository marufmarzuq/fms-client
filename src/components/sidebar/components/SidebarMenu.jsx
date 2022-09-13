import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import dashboard_icon from "../assets/dashboard.svg";
import idea_farm_icon from "../assets/idea_farm.svg";
import satellite_farm_icon from "../assets/satellite_farm.svg";
import hatchery_icon from "../assets/hatchery.svg";
import farmer_icon from "../assets/farmer.svg";
import batch_icon from "../assets/batch.svg";
import stock_icon from "../assets/stock.svg";
import vaccination_icon from "../assets/vaccination.svg";
import daily_data_icon from "../assets/daily_data.svg";
import { HiChevronRight } from "react-icons/hi";
// import daily_data_icon from "../assets/sales.svg";
import task_icon from "../assets/task.svg";

const SidebarMenu = () => {
  const { pathname } = useLocation();
  const firstPath = pathname.split("/")[1];
  const [activeMenu, setActiveMenu] = useState(firstPath || "");

  const handleDropdown = (type) => {
    if (activeMenu === type) {
      setActiveMenu("");
    } else {
      setActiveMenu(type);
    }
  };
  return (
    <div className="sidebar_menu">
      {/* Dashboard............... */}
      <NavLink to="/" onClick={() => handleDropdown("")}>
        <img src={dashboard_icon} alt="" />
        <span>FMS Overview</span>
      </NavLink>

      {/* Idea Frams............... */}
      <div
        className={`drop-down-menu ${activeMenu === "idea-farm"}`}
        onClick={() => handleDropdown("idea-farm")}
      >
        <div>
          <img src={idea_farm_icon} alt="" />
          <span>Idea Farms</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "idea-farm"}`}>
        {/* <NavLink to="/idea-farm/overview">Overview</NavLink> */}
        <NavLink to="/idea-farm/all-farms">All</NavLink>
        <NavLink to="/idea-farm/create">Create</NavLink>
      </div>

      {/* Satellite Frams............... */}
      <div
        className={`drop-down-menu ${activeMenu === "satellite-farm"}`}
        onClick={() => handleDropdown("satellite-farm")}
      >
        <div>
          <img src={satellite_farm_icon} alt="" />
          <span>Satellite Farms</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "satellite-farm"}`}>
        {/* <NavLink to="/satellite-farm/overview">Overview</NavLink> */}
        <NavLink to="/satellite-farms/all-farms">All</NavLink>
        <NavLink to="/satellite-farms/create">Create</NavLink>
      </div>

      {/* Hatcheries............... */}
      <div
        className={`drop-down-menu ${activeMenu === "hatcheries"}`}
        onClick={() => handleDropdown("hatcheries")}
      >
        <div>
          <img src={hatchery_icon} alt="" />
          <span>Hatcheries</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "hatcheries"}`}>
        {/* <NavLink to="/hatcheries/overview">Overview</NavLink> */}
        <NavLink to="/hatcheries/all-hatcheries">All</NavLink>
        <NavLink to="/hatcheries/create">Create</NavLink>
      </div>

      {/* Farmers............... */}
      <div
        className={`drop-down-menu ${activeMenu === "farmers"}`}
        onClick={() => handleDropdown("farmers")}
      >
        <div>
          <img src={farmer_icon} alt="" />
          <span>Farmers</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "farmers"}`}>
        {/* <NavLink to="/farmers/overview">Overview</NavLink> */}
        <NavLink to="/farmers/all-farmers">All</NavLink>
        <NavLink to="/farmers/create">Create</NavLink>
      </div>

      {/* batches............... */}
      <div
        className={`drop-down-menu ${activeMenu === "batches"}`}
        onClick={() => handleDropdown("batches")}
      >
        <div>
          <img src={batch_icon} alt="" />
          <span>Batches</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "batches"}`}>
        <NavLink to="/batches/all-batches">All</NavLink>
        <NavLink to="/batches/create">Create</NavLink>
        <NavLink to="/batches/overview">Overview</NavLink>

      </div>

      {/* stock............... */}
      <div
        className={`drop-down-menu ${activeMenu === "stock"}`}
        onClick={() => handleDropdown("stock")}
      >
        <div>
          <img src={stock_icon} alt="" />
          <span>Stock</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "stock"}`}>
        {/* <NavLink to="/stock/overview">Overview</NavLink> */}
        {/* <NavLink to="/stock/all-stock">All</NavLink> */}
        <NavLink to="/stock/create">Create</NavLink>
      </div>

      {/* vaccination............... */}
      <div
        className={`drop-down-menu ${activeMenu === "vaccination"}`}
        onClick={() => handleDropdown("vaccination")}
      >
        <div>
          <img src={vaccination_icon} alt="" />
          <span>Vaccination</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "vaccination"}`}>
        {/* <NavLink to="/vaccination/overview">Overview</NavLink> */}
        {/* <NavLink to="/vaccination/all-vaccination">All</NavLink> */}
        <NavLink to="/vaccination/create">Create</NavLink>
      </div>

      {/* tasks............... */}
      <div
        className={`drop-down-menu ${activeMenu === "tasks"}`}
        onClick={() => handleDropdown("tasks")}
      >
        <div>
          <img src={task_icon} alt="" />
          <span>Tasks</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "tasks"}`}>
        {/* <NavLink to="/tasks/overview">Overview</NavLink> */}
        <NavLink to="/tasks/reports">Task Report</NavLink>
        <NavLink to="/tasks/create">Create</NavLink>
      </div>

      {/* daily-data............... */}
      <div
        className={`drop-down-menu ${activeMenu === "daily-data"}`}
        onClick={() => handleDropdown("daily-data")}
      >
        <div>
          <img src={daily_data_icon} alt="" />
          <span>Daily Data</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "daily-data"}`}>
        {/* <NavLink to="/daily-data/overview">Overview</NavLink> */}
        <NavLink to="/daily-data/reports">Daily Data Reports</NavLink>
        <NavLink to="/daily-data/create">Create</NavLink>
      </div>

      <div
        className={`drop-down-menu ${activeMenu === "sales"}`}
        onClick={() => handleDropdown("sales")}
      >
        <div>
          <img src={daily_data_icon} alt="" />
          <span>Sales</span>
        </div>
        <span>
          <HiChevronRight />
        </span>
      </div>
      <div className={`dd-items ${activeMenu === "sales"}`}>
        {/* <NavLink to="/sales/overview">Overview</NavLink> */}
        {/* <NavLink to="/sales/reports">Sales Report</NavLink> */}
        <NavLink to="/sales/create">Create</NavLink>
      </div>
    </div>
  );
};

export default SidebarMenu;
