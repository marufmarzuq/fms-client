import React from "react";
import "./BatchInputCost.css";
import inputCostIcon from "./assets/input-cost.svg";
import feedIcon from "./assets/feed-fill.svg";
import hatcheriesIcon from "./assets/hatcheries-fill.svg";
import othersIcon from "./assets/others-fill.svg";
import transportIcon from "./assets/transport-fill.svg";
import vaccinationIcon from "./assets/vaccination-fill.svg";

const BatchInputCost = () => {
  return (
    <div className="batch-input-cost">
      <div className="bic-left">
        <div className="bic-title">Input Cost</div>
        <div className="bic-left-bottom">
          <div className="bic-left-img">
            <img src={inputCostIcon} alt="" />
          </div>
          <div className="bic-left-details">
            <p>Total Input Cost</p>
            <div className="bic-left-count">₹ 1,30,000.00</div>
          </div>
        </div>
      </div>
      <div className="bic-right">
        <div className="input-cost-cards-container">
          <div className="input-cost-single-card">
            <div className="icsc-img">
              <img src={hatcheriesIcon} alt="" />
            </div>
            <div className="icsc-title">Hatcheries</div>
            <div className="icsc-input">₹ 1,50,000.00</div>
            <div className="icsc-percentage">45%</div>
          </div>
          <div className="input-cost-single-card">
            <div className="icsc-img">
              <img src={feedIcon} alt="" />
            </div>
            <div className="icsc-title">Feed</div>
            <div className="icsc-input">₹ 1,50,000.00</div>
            <div className="icsc-percentage">45%</div>
          </div>
          <div className="input-cost-single-card">
            <div className="icsc-img">
              <img src={vaccinationIcon} alt="" />
            </div>
            <div className="icsc-title">Vaccination</div>
            <div className="icsc-input">₹ 1,50,000.00</div>
            <div className="icsc-percentage">45%</div>
          </div>
          <div className="input-cost-single-card">
            <div className="icsc-img">
              <img src={transportIcon} alt="" />
            </div>
            <div className="icsc-title">Transport</div>
            <div className="icsc-input">₹ 1,50,000.00</div>
            <div className="icsc-percentage">45%</div>
          </div>
          <div className="input-cost-single-card">
            <div className="icsc-img">
              <img src={othersIcon} alt="" />
            </div>
            <div className="icsc-title">Others</div>
            <div className="icsc-input">₹ 1,50,000.00</div>
            <div className="icsc-percentage">45%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchInputCost;
