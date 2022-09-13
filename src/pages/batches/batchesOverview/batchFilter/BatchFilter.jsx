import React from "react";
import "./BatchFilter.css";
import Select from "react-select";
import ideaFarmIcon from "./assets/idea_farm.png";
import setelliteIcon from "./assets/setellite.png";
import batchIcon from "./assets/batch.png";

const BatchFilter = () => {
  const options = [
    { value: "farm1", label: "Farm 1" },
    { value: "farm2", label: "Farm 2" },
    { value: "farm3", label: "Farm 3" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#48bf7f" : "white",
      ":hover": {
        backgroundColor: "#a8d7bd",
        color: "white",
      },
      cursor: "pointer",
    }),
  };
  return (
    <div className="batch-filter">
      <div className="single-select-conainer">
        <div className="ssc-img">
          <img src={ideaFarmIcon} alt="" />
        </div>
        <Select options={options} styles={customStyles} />
      </div>
      <div className="single-select-conainer">
        <div className="ssc-img">
          <img src={setelliteIcon} alt="" />
        </div>
        <Select options={options} styles={customStyles} />
      </div>
      <div className="single-select-conainer">
        <div className="ssc-img">
          <img src={batchIcon} alt="" />
        </div>
        <Select options={options} styles={customStyles} />
      </div>
    </div>
  );
};

export default BatchFilter;
