import React from "react";

const StatusBox = ({ data }) => {
  return (
    <div
      style={{
        background: data.bgColor,
        color: data.status,
        width: "fit-content",
        height: "fit-content",
        border: "1px solid black",
        padding: "2%",
        opacity: 0.3,
      }}
    >
      {data.text}
    </div>
  );
};

export default StatusBox;
