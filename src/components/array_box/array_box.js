import React from "react";
import "./array_box.css";

const ArrayBox = ({ arr }) => {
  return (
    <div className="array_box">
      {arr.map((ele) => {
        let key = Object.keys(ele);
        return (
          <div>
            <div>{key[0]}</div>
            <div>{`-  ${ele[key[0]]}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ArrayBox;
