import React from "react";
import "./update_vaccine_head.css";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useState } from "react";

const UpdateVaccineHead = () => {
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
  return (
    <div className="update_vaccine_head">
      <h3>Create Vaccination</h3>
      <AsyncSelect
        // defaultValue={hatcheries[0]}
        name="idea_farms"
        options={idea_farms}
        className="idea_farm_vaccination"
        classNamePrefix="select"
        cacheOptions
        defaultOptions
        loadOptions={loadIdeaFarmOptions}
        placeholder="Choose Idea Farm"
      />

      <Select
        name="satellite_farms"
        closeMenuOnSelect={false}
        options={idea_farms}
        className="satellite_farms_vaccination"
        placeholder="Select Satellite Farm"
        // styles={colourStyles}
      />
      <Select
        name="sourced_from"
        closeMenuOnSelect={false}
        options={idea_farms}
        className="batch_vaccination"
        placeholder="Select Batch"
        // styles={colourStyles}
      />
    </div>
  );
};

export default UpdateVaccineHead;
