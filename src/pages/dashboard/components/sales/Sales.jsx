import React from "react";
import "./Sales.css";
import salesIcon from "./assets/sales.svg";
import SalesTable from "./components/salesTable/SalesTable";

const Sales = () => {
  return (
    <div className="sales">
      <div className="sales-header">
        <img src={salesIcon} alt="" className="sales-header-icon" />
        <div>
          <div className="sales-title">Sales</div>
          <div className="sales-price">&#8377; 50,00,000.00</div>
        </div>
      </div>
      <SalesTable />
    </div>
  );
};

export default Sales;
