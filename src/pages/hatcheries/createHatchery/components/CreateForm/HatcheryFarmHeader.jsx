import React, { useState } from "react";
import hatchery from "../CreateForm/assets/hatchery.svg";

const HatcheryFarmHeader = ({ userCoordinates, Landmark }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="create-form-container">
      <div className="single-inp">
        <img src={hatchery} alt=""  />
        <span className="vertical-line"></span>
        <input
          type="text"
          placeholder="Hatchery Name"
          name="hatchery_name"
          required
        />
      </div>
      <div className="single-inp">
        <img src="" alt="" />
        <span className="vertical-line"></span>
        <input type="text" placeholder="Address" name="address" required />
      </div>
      <div className="single-inp">
        <img src="" alt="" />
        <span className="vertical-line"></span>
        <input type="text" placeholder="Point of Contact" name="poc" required />
      </div>
      <div className="address-grid-container">
        <div className="single-inp">
          <input
            type="text"
            placeholder="Pincode"
            className="input-no-img"
            name="pincode"
            required
          />
        </div>
        <div className="single-inp">
          <input
            type="text"
            placeholder="Landmark"
            className="input-no-img"
            name="landmark"
            value={Landmark}
            required
          />
        </div>
      </div>
      <div className="single-inp">
        <img src="" alt="" />
        <span className="vertical-line"></span>
        <input type="text" placeholder="Phone No." name="phone" required />
      </div>
      <div className="address-grid-container">
        <div className="single-inp">
          <input
            type="text"
            className="input-no-img"
            placeholder="Latitude"
            name="latitude"
            value={userCoordinates.lat}
            readOnly
            required
          />
        </div>
        <div className="single-inp">
          <input
            type="text"
            className="input-no-img"
            placeholder="Longitude"
            name="longitude"
            value={userCoordinates.lng}
            readOnly
            required
          />
        </div>
      </div>
    </div>
  );
};

export default HatcheryFarmHeader;
