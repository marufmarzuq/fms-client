import React, { useState } from "react";
import "./TotalFarms.css";
import batchIcon from "./assets/batch.svg";
import hatcheryIcon from "./assets/hatchery.svg";
import idea_farmIcon from "./assets/idea_farm.svg";
import satellite_farmIcon from "./assets/satellite_farm.svg";

const TotalFarms = ({ handleTotalFarmsToggle }) => {
  const [totalFarmsToggle, setTotalFarmsToggle] = useState(false);
  return (
    <div className="total-farms-container">
      <div className="total-farms-header">
        <div>
          <div className="widget-title">Total Farms</div>
          <div className="widget-count">20000</div>
        </div>
        <div className="sty-toggle-container">
          <div
            className="sty-toggle"
            onClick={() => {
              totalFarmsToggle && handleTotalFarmsToggle("daily");
              setTotalFarmsToggle(false);
            }}
            style={{ color: totalFarmsToggle && "#777" }}
          >
            Daily
          </div>
          <div
            className="sty-toggle"
            onClick={() => {
              !totalFarmsToggle && handleTotalFarmsToggle("monthly");
              setTotalFarmsToggle(true);
            }}
            style={{ color: !totalFarmsToggle && "#777" }}
          >
            Last Month
          </div>
          <div className={`sty-toggle-bg ${totalFarmsToggle}`}></div>
        </div>
      </div>
      <div className="tf-count-container">
        <div className="tf-single-count-box">
          <div className="tf-single-count-box-img">
            <img src={idea_farmIcon} alt="" />
          </div>
          <div className="tf-single-count-box-right">
            <p>Total Idea Farms</p>
            <h3>11000</h3>
          </div>
        </div>
        <div className="tf-single-count-box">
          <div className="tf-single-count-box-img">
            <img src={batchIcon} alt="" />
          </div>
          <div className="tf-single-count-box-right">
            <p>Total Batches</p>
            <h3>2000</h3>
          </div>
        </div>
        <div className="tf-single-count-box">
          <div className="tf-single-count-box-img">
            <img src={satellite_farmIcon} alt="" />
          </div>
          <div className="tf-single-count-box-right">
            <p>Total Satellite Farms</p>
            <h3>13000</h3>
          </div>
        </div>
        <div className="tf-single-count-box">
          <div className="tf-single-count-box-img">
            <img src={hatcheryIcon} alt="" />
          </div>
          <div className="tf-single-count-box-right">
            <p>Total Hatcheries</p>
            <h3>3000</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalFarms;
