import React from "react";

const UpdateVaccineBottom = () => {
  return (
    <div className="update_vaccine_bottom">
      <h4>Vaccine Details</h4>
      <div className="label_input_vaccination">
        <label htmlFor="vaccine_actual_date">Vaccine Scheuled Date</label>
        <input
          type="date"
          className="update_vaccine_actual_date"
          name="vaccine_actual_date"
        />
      </div>
      <div className="label_input_vaccination">
        <label htmlFor="vaccine_administered_date">
          Vaccine Administered Date
        </label>
        <input
          type="date"
          className="update_vaccine_vaccinated_date"
          name="vaccine_administered_date"
        />
      </div>
      <div className="label_input_vaccination_datalist">
        <label htmlFor="vaccine_type"> Vaccine Type</label>
        <div className="vaccine_type_box">
          <input
            type="text"
            className="update_vaccine_vaccinetype"
            list="vaccine_types"
            placeholder="Choose Vaccine Type"
            name="vaccine_type"
          />
          <datalist id="vaccine_types" name="vaccine_types">
            <option>5th day Vaccine</option>
            <option>15th day vaccine</option>
            <option>25th day vaccine</option>
          </datalist>
        </div>
        <p className="vaccine_type_alert">
          Note : The actual vaccine is 15th day vaccine
        </p>
      </div>
      <label className="update_vaccine_image_upload">
        <input type="file" />
        Upload Vaccine Images
      </label>
      <label className="update_vaccine_video_upload">
        <input type="file" />
        Upload Vaccine Videos
      </label>
      <div className="btn_wrapper">
        <button type="submit" className="update_vaccine_submit_btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default UpdateVaccineBottom;
