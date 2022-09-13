import React from "react";
import "./add_satellite_farm_right.css"
const AddSatelliteFarmRight = () => {
  return (
    <div className="add_sf_farm_right">
      <h4 className="add_sf_right_farm_title">Address Details</h4>
      <input
        type="text"
        name="address_1"
        placeholder="Address Line 1"
        className="add_sf_right_farm_address_1"
      />
      <input
        type="text"
        name="address_2"
        placeholder="Adress Line 2"
        className="add_sf_right_farm_address_2"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        className="add_sf_right_farm_pincode"
      />
      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        className="add_sf_right_farm_landmark"
      />
      <input
        type="text"
        name="latitude"
        placeholder="Latitude"
        className="add_sf_right_farm_latitude"
      />
      <input
        type="text"
        name="longitude"
        placeholder="Landmark"
        className="add_sf_right_farm_longitude"
      />
    </div>
  );
};


export default AddSatelliteFarmRight;


