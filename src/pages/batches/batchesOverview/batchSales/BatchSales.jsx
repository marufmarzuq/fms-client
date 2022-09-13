import React from "react";
import "./BatchSales.css";
import icon from "./assets/sales.svg";
const BatchSales = () => {
  const sales = [
    { date: "20-03-21", quantity: "50000", sales_amount: "30,000.00" },
    { date: "20-03-21", quantity: "50000", sales_amount: "30,000.00" },
    { date: "20-03-21", quantity: "50000", sales_amount: "30,000.00" },
  ];
  return (
    <div className="batch-sales">
      <div className="bs-left">
        <div className="bs-title">Sales</div>
        <div className="bs-left-bottom">
          <div className="bs-left-img">
            <img src={icon} alt="" />
          </div>
          <div className="bs-left-details">
            <p>Total Sales</p>
            <div className="bs-left-count">₹ 1,30,000.00</div>
          </div>
        </div>
      </div>
      <div className="bs-right">
        <div>Graph</div>
        <div className="batch-sales-table">
          <div className="bst-header">
            <div>Date</div>
            <div>Quantity</div>
            <div>Sales Amount</div>
          </div>
          <div className="bst-body">
            {sales.map((sale) => (
              <div className="bst-row">
                <div>{sale.date}</div>
                <div>{sale.quantity}</div>
                <div>{sale.sales_amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchSales;
