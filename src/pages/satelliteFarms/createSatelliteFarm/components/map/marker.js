import React from "react";
import "./marker.css";

const Marker = (props) => {
    const { color, name, id } = props;
    return <div className="marker" style={{ backgroundColor: color, cursor: "pointer" }} title={name} />;
};

export default Marker;