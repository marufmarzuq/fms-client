import React from "react";
import "./StockDetails.css";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const StockDetails = () => {
  const stockProducts = [
    {
      name: "ASEEL CROSS",
      TotalQuantity: 5000,
      CurrentQuantity: 4000,
      titleColor: "#00c3f3",
      image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
    },
    {
      name: "JAPANESE QUAILS",
      TotalQuantity: 5000,
      CurrentQuantity: 4000,
      titleColor: "#eb008d",
      image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
    },
    {
      name: "KADAKNATH CHICKEN",
      TotalQuantity: 5000,
      CurrentQuantity: 4000,
      titleColor: "#6b13ff",
      image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
    },
    {
      name: "ASEEL CROSS",
      TotalQuantity: 5000,
      CurrentQuantity: 4000,
      titleColor: "#00c3f3",
      image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
    },
    {
      name: "JAPANESE QUAILS",
      TotalQuantity: 5000,
      CurrentQuantity: 4000,
      titleColor: "#eb008d",
      image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
    },
    {
      name: "KADAKNATH CHICKEN",
      TotalQuantity: 5000,
      CurrentQuantity: 4000,
      titleColor: "#6b13ff",
      image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
    },
  ];
  return (
    <div className="stock-details">
      <div className="stock-details-title">Stock Details</div>
      <div className="stock-title-container">
        <div className="widget-title">Total Birds Going</div>
        <div className="widget-count">2,00,000</div>
      </div>
      <div className="stcok-products-container">
        {stockProducts.map((sp) => (
          <div className="single-stock-product">
            <div className="stock-product-img">
              <img src={sp.image} alt="" />
            </div>
            <div>
              <div
                className="stock-product-title"
                style={{ color: sp.titleColor }}
              >
                {sp.name}
              </div>
              <div className="stock-product-details-grid">
                <div className="stock-product-total-quantity">
                  {sp.TotalQuantity}
                </div>
                <span className="stock-product-total-span">Total Quantity</span>
                <div className="total-quantity-percentage">
                  <IoMdArrowDropup />
                  <span>100% +</span>
                </div>
                <div className="stock-product-current-quantity">
                  {sp.TotalQuantity}
                </div>
                <span className="stock-product-current-span">
                  Total Quantity
                </span>
                <div className="current-quantity-percentage">
                  <IoMdArrowDropdown />
                  <span>10% -</span>
                </div>
              </div>
            </div>
            <div className="stock-chart">Chart</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockDetails;
