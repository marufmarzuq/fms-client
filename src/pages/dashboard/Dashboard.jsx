import React from "react";
import DashboardHeader from "./components/dashboardHeader/DashboardHeader";
import FeedData from "./components/feedData/FeedData";
import InputCost from "./components/inputCost/InputCost";
import Sales from "./components/sales/Sales";
import StockDetails from "./components/stockDetails/StockDetails";
import TotalBatches from "./components/totalBatches/TotalBatches";
import TotalFarms from "./components/totalFarms/TotalFarms";
import TotalMortality from "./components/totalMortality/TotalMortality";
import "./Dashboard.css";

const Dashboard = () => {
  const handleHeaderToggle = (type) => {
    console.log(type);
  };
  const handleTotalFarmsToggle = (type) => {
    console.log(type);
  };
  return (
    <div className="container">
      <DashboardHeader handleHeaderToggle={handleHeaderToggle} />
      <div className="dashboard_farms_and_batches">
        <TotalFarms handleTotalFarmsToggle={handleTotalFarmsToggle} />
        <TotalBatches />
      </div>
      <InputCost />
      <StockDetails />
      <div className="dashboard_mortality_and_feed_data">
        <TotalMortality />
        <FeedData />
      </div>
      <Sales />
    </div>
  );
};

export default Dashboard;
