import React from "react";
import "./FeedData.css";

const FeedData = () => {
  return (
    <div className="feed-data">
      <div className="feed-data-title">Feed Data</div>
      <div className="feed-title-container">
        <div className="widget-title">Total Feed Bags Used</div>
        <div className="widget-count">1200</div>
        <span className="widget-optional-text">(bags)</span>
      </div>
      <div className="feed-cards-container">
        <div className="feed-single-card">
          <div className="feed-card-img">
            <img
              src="https://m.media-amazon.com/images/I/71x6uFYUFTL._SL1500_.jpg"
              alt=""
            />
          </div>
          <div className="feed-card-right">
            <div className="feed-card-title">Starter</div>
            <div className="feed-card-count feed-card-count-color-1">400</div>
            <div className="feed-card-percentage">24%</div>
          </div>
        </div>
        <div className="feed-single-card">
          <div className="feed-card-img">
            <img
              src="https://m.media-amazon.com/images/I/71x6uFYUFTL._SL1500_.jpg"
              alt=""
            />
          </div>
          <div className="feed-card-right">
            <div className="feed-card-title">Growth</div>
            <div className="feed-card-count feed-card-count-color-2">400</div>
            <div className="feed-card-percentage">24%</div>
          </div>
        </div>
        <div className="feed-single-card">
          <div className="feed-card-img">
            <img
              src="https://m.media-amazon.com/images/I/71x6uFYUFTL._SL1500_.jpg"
              alt=""
            />
          </div>
          <div className="feed-card-right">
            <div className="feed-card-title">Maintainer</div>
            <div className="feed-card-count feed-card-count-color-1">400</div>
            <div className="feed-card-percentage">24%</div>
          </div>
        </div>
        <div className="feed-single-card">
          <div className="feed-card-img">
            <img
              src="https://m.media-amazon.com/images/I/71x6uFYUFTL._SL1500_.jpg"
              alt=""
            />
          </div>
          <div className="feed-card-right">
            <div className="feed-card-title">Pre-Starter</div>
            <div className="feed-card-count feed-card-count-color-2">400</div>
            <div className="feed-card-percentage">24%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedData;
