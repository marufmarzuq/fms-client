import React from "react";
import "./BatchStock.css";

const BatchStock = (batchData) => {
  const stock = {
    total_stock: batchData.batchData.inbound_quantity ? batchData.batchData.inbound_quantity : 0,
    current_stock: batchData.batchData.current_quantity ? batchData.batchData.current_quantity : 0,
    mortality: batchData.batchData.mortality ? batchData.batchData.mortality : 0,
    mortality_percent : batchData.batchData.mortality_percent ? batchData.batchData.mortality_percent : 0
  };
  return (
    <div className="batch-stock">
      <h4 className="bo-widget-title">Stock</h4>
      <div className="batch-stock-cards-container">
        <div className="batch-stock-single-card">
          <div className="bssc-title">Total Given</div>
          <div className="bssc-amount">{stock.total_stock}</div>
        </div>
        <div className="batch-stock-single-card">
          <div className="bssc-title">Current Stock</div>
          <div className="bssc-amount">{stock.current_stock}</div>
        </div>
        <div className="batch-stock-single-card">
          <div className="bssc-title">MortalityCount</div>
          <div className="bssc-amount">{stock.mortality}</div>
        </div>
        <div className="batch-stock-single-card">
          <div className="bssc-title">Mortality %</div>
          <div className="bssc-amount">{stock.mortality_percent}%</div>
        </div>
        <div className="batch-stock-single-card">
          <div className="bssc-title">Sold Qty</div>
          <div className="bssc-amount">0</div>
        </div>
        <div className="batch-stock-single-card">
          <div className="bssc-title">Sold %</div>
          <div className="bssc-amount">0%</div>
        </div>
      </div>
    </div>
  );
};

export default BatchStock;
