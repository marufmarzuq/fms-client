import React from "react";
import "./SalesTable.css";

const SalesTable = () => {
  const sales = [
    {
      product_name: "Aseel Cross",
      product_image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
      sold: 123,
      revenue: 123333,
      overall_sold_percentage: 50,
      mortality_sold_percentage: 65,
    },
    {
      product_name: "Aseel Cross",
      product_image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
      sold: 123,
      revenue: 123333,
      overall_sold_percentage: 70,
      mortality_sold_percentage: 30,
    },
    {
      product_name: "Aseel Cross",
      product_image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
      sold: 123,
      revenue: 123333,
      overall_sold_percentage: 65,
      mortality_sold_percentage: 65,
    },
    {
      product_name: "Aseel Cross",
      product_image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
      sold: 123,
      revenue: 123333,
      overall_sold_percentage: 65,
      mortality_sold_percentage: 65,
    },
    {
      product_name: "Aseel Cross",
      product_image:
        "https://storage.googleapis.com/aqai-product-images/giriraja-one-day-old-main.jpg",
      sold: 123,
      revenue: 123333,
      overall_sold_percentage: 65,
      mortality_sold_percentage: 65,
    },
  ];
  return (
    <div className="sales-table">
      <div className="sales-table-header">
        <div></div>
        <div>Product Name</div>
        <div>Sold</div>
        <div>Trend</div>
        <div>Revenue</div>
        <div>
          <div>Sold % </div>
          <div>(In overall)</div>
        </div>
        <div>
          <div>Sold % </div>
          <div>(With Mortality)</div>
        </div>
      </div>
      <div className="sales-table-body">
        {sales.map((singleSale) => (
          <div className="sales-table-single-row">
            <div className="sales-img-container">
              <div className="sales-table-img">
                <img src={singleSale.product_image} alt="" />
              </div>
            </div>
            <div className="sales-table-name-column">
              {singleSale.product_name}
            </div>
            <div className="sales-table-sold-column">{singleSale.sold}</div>
            <div>Trend</div>
            <div className="sales-table-revenue-column">
              {singleSale.revenue}
            </div>
            <div className="st-graph-column">
              <div className="st-percent">
                <svg>
                  <circle cx="25" cy="25" r="25"></circle>
                  <circle
                    cx="25"
                    cy="25"
                    r="25"
                    style={{
                      strokeDashoffset: `calc(156 - (156 * ${singleSale.overall_sold_percentage}) / 100)`,
                    }}
                  ></circle>
                </svg>
                <div className="st-number">
                  <span>{singleSale.overall_sold_percentage}%</span>
                </div>
              </div>
            </div>
            <div className="st-graph-column">
              <div className="st-percent">
                <svg>
                  <circle cx="25" cy="25" r="25"></circle>
                  <circle
                    cx="25"
                    cy="25"
                    r="25"
                    style={{
                      strokeDashoffset: `calc(156 - (156 * ${singleSale.mortality_sold_percentage}) / 100)`,
                    }}
                  ></circle>
                </svg>
                <div className="st-number">
                  <span>{singleSale.mortality_sold_percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTable;
