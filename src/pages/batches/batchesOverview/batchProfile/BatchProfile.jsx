import React from "react";
import "./BatchProfile.css";
import farmerIcon from "./assets/farmer.svg";
import batchIcon from "./assets/batch.svg";
import ideaFarmIcon from "./assets/idea_farm.svg";

import { GiKiwiBird } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillCalendarMinusFill } from "react-icons/bs";

const BatchProfile = ({dailyData,productData,batchData}) => {
  // console.log(productData)
  // console.log(dailyData)
  // console.log(batchData)
  const batch = {
    farmer_name: batchData.farmer_data[0].name ? batchData.farmer_data[0].name : "NA",
    farm_name: batchData.satellite_farm_name ? batchData.satellite_farm_name : "NA",
    batch_id: batchData.id,
    farmer_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI0bNp1bAlqUcw7mdOEfWu-gV8UZb9qNsO_Q&usqp=CAU",
    product_name: productData["name"],
    product_img_1: productData["product_image"],
    product_img_2:
      "https://www.aqai.in/product-images/400x400.jpg/430722000003742408/1100x1100",
    start_date: batchData.source_date,
    harvest_date: batchData.est_harvest_date,
    over_due_dates: 0,
    status: "green",
    score: batchData.score,
    idea_farm_name: batchData.idea_farm_name,
    hatcheries_name: batchData.hatchery_name,
    region: "Tamilnadu",
  };
  return (
    <>
      <div className="profile-top-widget">
        <div className="profile-top">
          <div className="profile-top-single-card">
            <img src={farmerIcon} alt="" className="ptdc-img" />
            <div>
              Farmer Name : <span>{batch.farmer_name}</span>
            </div>
          </div>
          <div className="profile-top-single-card">
            <img src={ideaFarmIcon} alt="" className="ptdc-img" />
            <div>
              Farm Name : <span>{batch.farm_name}</span>
            </div>
          </div>
          <div className="profile-top-single-card">
            <img src={batchIcon} alt="" className="ptdc-img" />
            <div>
              Batch Id : <span>{batch.batch_id}</span>
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <div className="pb-images-container">
            <div className="pb-single-img">
              <img src={batch.farmer_img} alt="" />
            </div>
            <div className="pb-single-img">
              <img src={batch.product_img_1} alt="" />
            </div>
            <div className="pb-single-img">
              <img src={batch.product_img_2} alt="" />
            </div>
          </div>
          <div className="batch-details-container">
            <div className="single-bdc">
              <div>
                <GiKiwiBird />
                <span>Product</span>
              </div>
              <span>{batch.product_name}</span>
            </div>
            <div className="single-bdc">
              <div>
                <FaCalendarAlt />
                <span>Start Date</span>
              </div>
              <span>{batch.start_date}</span>
            </div>
            <div className="single-bdc harvest">
              <div>
                <FaCalendarAlt />
                <span>Harvest Date</span>
              </div>
              <span>{batch.harvest_date}</span>
            </div>
            <div className="single-bdc due">
              <div>
                <BsFillCalendarMinusFill />
                <span>Over Due Day's</span>
              </div>
              <span>{batch.over_due_dates}</span>
            </div>
          </div>
          <div className="batch-status-container">
            <div className="batch-status-header">
              <span>Status: </span>
              <span
                className="status-color-container"
                style={{
                  backgroundColor:
                    batch.status === "green" ? "#BFF9DA" : "#ffbebe",
                  color: batch.status === "green" ? "68cd80" : "#d93636",
                }}
              >
                {batch.status}
              </span>
            </div>
            <div>
              <div className="batch-overview-performance-gauge">
                <div class="gauge">
                  <div class="gauge__body">
                    <div
                      class="gauge__fill"
                      style={{
                        transform: `rotate(${batch.score / 200}turn)`,
                      }}
                    ></div>
                    <div class="gauge__cover"></div>
                  </div>
                </div>
                <div className="perfomance-gauge-text">
                  <div className="pgt-title">Score</div>
                  <div className="pgt-percentage">{batch.score}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-source-details">
        <h4 className="bo-widget-title">source details</h4>
        <div>
          <p>Idea Farm Name</p>
          <h5 className="color-lite-blue">{batch.idea_farm_name}</h5>
        </div>
        <div>
          <p>Hatcheries Name</p>
          <h5>{batch.hatcheries_name}</h5>
        </div>
        <div>
          <p>Region</p>
          <h5>{batch.region}</h5>
        </div>
      </div>
    </>
  );
};

export default BatchProfile;
