import React, { useState } from "react";
import "./DashboardHeader.css";

const DashboardHeader = ({ handleHeaderToggle }) => {
  const [headerToggle, setHeaderToggle] = useState(false);
  return (
    <div className="dashboard-header">
      <div className="dashboard-title">OVERVIEW</div>
      <div className="sty-toggle-container">
        <div
          className="sty-toggle"
          onClick={() => {
            headerToggle && handleHeaderToggle("ongoing");
            setHeaderToggle(false);
          }}
        >
          Ongoing
        </div>
        <div
          className="sty-toggle"
          onClick={() => {
            !headerToggle && handleHeaderToggle("complete");
            setHeaderToggle(true);
          }}
        >
          Completed
        </div>
        <div className={`sty-toggle-bg ${headerToggle}`}></div>
      </div>
      <div className="state-dropdown">
      <label>Select Region </label>
      <select className="region-select">
        <option value="all">All</option>
      </select>
      </div>
    </div>
  );
};

export default DashboardHeader;
