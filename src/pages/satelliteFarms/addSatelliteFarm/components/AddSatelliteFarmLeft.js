import React from "react";
import "./add_satellite_form_left.css";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useState } from "react";

const AddSatelliteFormLeft = () => {
  // idea farm search logic starts ////////////////////////////////////////////////////////////////////////////////////
  let [idea_farms, setFarms] = useState([
    { value: "1", label: "Farm 1" },
    { value: "2", label: "Farm 2" },
    { value: "3", label: "Farm 3" },
  ]);

  const filterIdeaFarms = (inputValue: string) => {
    return idea_farms.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadIdeaFarmOptions = (
    inputValue: string,
    callback: (options: ColourOption[]) => void
  ) => {
    setTimeout(() => {
      callback(filterIdeaFarms(inputValue));
    }, 1000);
  };
  // idea farm search logic ends ///////////////////////////////////////////////////////////////////////

  return (
    <div className="add_sf_left">
      <h4 className="add_sf_left_farm_title">Farm Details</h4>
      <AsyncSelect
        name="idea_farms"
        options={idea_farms}
        className="idea_farm_select_add_sf"
        classNamePrefix="select"
        cacheOptions
        defaultOptions
        loadOptions={loadIdeaFarmOptions}
        placeholder="Choose Idea Farm"
      />
      <input
        type="text"
        name="name"
        placeholder="Satellite Farm Name Here"
        className="add_sf_left_farm_name"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="add_sf_left_farm_phone"
      />
      <div className="file_upload_box">
        <h4 className="add_sf_left_farm_title">Upload Images And Videos</h4>
        <label className="add_sf_left_farm_photos">
          <input type="file" name="images" />
          Choose Image
        </label>
        <label className="add_sf_left_farm_videos">
          <input type="file" name="videos" />
          Choose Video
        </label>
      </div>
      <div className="btn_wrapper"><button type="submit" className="onboard_sf_submit_btn">Submit</button></div>
    </div>
  );
};

export default AddSatelliteFormLeft;