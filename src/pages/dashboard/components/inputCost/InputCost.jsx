import React from "react";
import "./InputCost.css";
import feedIcon from "./assets/feed.svg";
import hatcheriesIcon from "./assets/hatcheries.svg";
import othersIcon from "./assets/others.svg";
import transportIcon from "./assets/transport.svg";
import vaccinationIcon from "./assets/vaccination.svg";
import inputCostIcon from "./assets/input-cost.svg";

const InputCost = () => {
  return (
    <div className="input-cost">
      <div className="ic-left">
        <select>
          <option value="">Select last week</option>
        </select>
        <div className="ic-left-bottom">
          <div className="ic-left-bottom-img">
            <img src={inputCostIcon} alt="" />
          </div>
          <div className="iclb-right">
            <h3>TOTAL INPUT COST</h3>
            <h2>&#8377; 3,30,000.00</h2>
          </div>
        </div>
      </div>
      <div className="ic-right">
        <div className="ic-right-single-box input-box-bg-1">
          <div className="icrsb-img">
            <img src={hatcheriesIcon} alt="" />
          </div>
          <div className="icrsb-title">Hatcheries</div>
          <div className="icrsb-cost">&#8377; 15000.00</div>
          <div className="icrsb-parcentage">45%</div>
        </div>
        <div className="ic-right-single-box input-box-bg-2">
          <div className="icrsb-img">
            <img src={feedIcon} alt="" />
          </div>
          <div className="icrsb-title">Feed</div>
          <div className="icrsb-cost">&#8377; 15000.00</div>
          <div className="icrsb-parcentage">40%</div>
        </div>
        <div className="ic-right-single-box input-box-bg-3">
          <div className="icrsb-img">
            <img src={vaccinationIcon} alt="" />
          </div>
          <div className="icrsb-title">Vaccination</div>
          <div className="icrsb-cost">&#8377; 15000.00</div>
          <div className="icrsb-parcentage">3%</div>
        </div>
        <div className="ic-right-single-box input-box-bg-4">
          <div className="icrsb-img">
            <img src={transportIcon} alt="" />
          </div>
          <div className="icrsb-title">Transport</div>
          <div className="icrsb-cost">&#8377; 15000.00</div>
          <div className="icrsb-parcentage">8%</div>
        </div>
        <div className="ic-right-single-box input-box-bg-5">
          <div className="icrsb-img">
            <img src={othersIcon} alt="" />
          </div>
          <div className="icrsb-title">Others</div>
          <div className="icrsb-cost">&#8377; 15000.00</div>
          <div className="icrsb-parcentage">4%</div>
        </div>
      </div>
    </div>
  );
};

export default InputCost;
