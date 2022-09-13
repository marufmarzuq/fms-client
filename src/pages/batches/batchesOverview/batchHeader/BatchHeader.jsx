import React, { useState } from "react";
import "./BatchHeader.css";

const BatchHeader = ({ handleHeaderToggle }) => {
  const [headerToggle, setHeaderToggle] = useState(false);

  return (
    <div className="batch-header">
      <div className="btach-header-title">Batchs Overview</div>
      <div className="sty-toggle-container">
        <div
          className="sty-toggle"
          onClick={() => {
            headerToggle && handleHeaderToggle("ongoing");
            setHeaderToggle(false);
          }}
          style={{ color: headerToggle && "#777" }}
        >
          Ongoing
        </div>
        <div
          className="sty-toggle"
          onClick={() => {
            !headerToggle && handleHeaderToggle("complete");
            setHeaderToggle(true);
          }}
          style={{ color: !headerToggle && "#777" }}
        >
          Completed
        </div>
        <div className={`sty-toggle-bg ${headerToggle}`}></div>
      </div>
      <div></div>
    </div>
  );
};

export default BatchHeader;
