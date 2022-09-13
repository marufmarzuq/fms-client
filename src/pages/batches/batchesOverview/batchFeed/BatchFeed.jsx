import React from "react";
import "./BatchFeed.css";

const BatchFeed = () => {
  return (
    <div className="batch-feed">
      <h4 className="bo-widget-title">Feed</h4>
      <div className="batch-feed-cards-container">
        <div className="batch-feed-card">
          <div className="bfc-count">20</div>
          <span>Total</span>
          <span>Given</span>
        </div>
        <div className="batch-feed-card">
          <div className="bfc-count">10</div>
          <span>Current</span>
          <span>Stock</span>
        </div>
        <div className="batch-feed-card">
          <div className="bfc-count">10</div>
          <span>Used</span>
          <span>Stock</span>
        </div>
        <div className="batch-feed-card">
          <div className="bfc-count">20</div>
          <span>Avg Per</span>
          <span>Day</span>
        </div>
      </div>
    </div>
  );
};

export default BatchFeed;
