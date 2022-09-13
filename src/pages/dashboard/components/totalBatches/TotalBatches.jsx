import React from "react";
import "./TotalBatches.css";

const TotalBatches = () => {
  const overallPerfomance = 90;
  const greenPercentage = 80;
  const amberPercentage = 10;
  const redPercentage = 10;
  return (
    <div className="total-batches-container">
      <div className="tb-top">
        <div className="left">
          <div className="widget-title">Total Batches</div>
          <div className="widget-count">2400</div>
        </div>
        <div className="right">
          <div className="performance-gauge">
            <div class="gauge">
              <div class="gauge__body">
                <div
                  class="gauge__fill"
                  style={{
                    transform: `rotate(${overallPerfomance / 200}turn)`,
                  }}
                ></div>
                <div class="gauge__cover"></div>
              </div>
            </div>
            <div className="perfomance-gauge-text">
              <div className="pgt-percentage">{overallPerfomance}%</div>
              <div className="pgt-title">Overall Performance</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tb-bottom">
        <div className="tb-status-title">Status</div>
        <div className="tb-status-container">
          <div className="tb-single-status green-circle">
            <div className="tbss-percent">
              <svg>
                <circle cx="40" cy="40" r="40"></circle>
                <circle
                  cx="40"
                  cy="40"
                  r="40"
                  style={{
                    strokeDashoffset: `calc(251 - (251 * ${greenPercentage}) / 100)`,
                    stroke: "#08A652",
                  }}
                ></circle>
              </svg>
              <div className="tbss-number">
                <div className="tbss-number-title">Green</div>
                <span>{greenPercentage}%</span>
              </div>
            </div>
            <div className="tb-status-total-number">1920</div>
          </div>
          <div className="tb-single-status abmer-circle">
            <div className="tbss-percent">
              <svg>
                <circle cx="40" cy="40" r="40"></circle>
                <circle
                  cx="40"
                  cy="40"
                  r="40"
                  style={{
                    strokeDashoffset: `calc(251 - (251 * ${amberPercentage}) / 100)`,
                    stroke: "#F2AF3E",
                  }}
                ></circle>
              </svg>
              <div className="tbss-number">
                <div className="tbss-number-title">Amber</div>

                <span>{amberPercentage}%</span>
              </div>
            </div>
            <div className="tb-status-total-number">240</div>
          </div>
          <div className="tb-single-status red-circle">
            <div className="tbss-percent">
              <svg>
                <circle cx="40" cy="40" r="40"></circle>
                <circle
                  cx="40"
                  cy="40"
                  r="40"
                  style={{
                    strokeDashoffset: `calc(251 - (251 * ${redPercentage}) / 100)`,
                    stroke: "#FF0000",
                  }}
                ></circle>
              </svg>
              <div className="tbss-number">
                <div className="tbss-number-title">Red</div>
                <span>{redPercentage}%</span>
              </div>
            </div>
            <div className="tb-status-total-number">240</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBatches;
