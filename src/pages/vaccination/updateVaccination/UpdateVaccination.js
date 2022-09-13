import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config.json";
import "./UpdateVaccination.css";
import product_icon from "../updateVaccination/asset/product.svg"
import AsyncSelect from "react-select/async";
import Select from "react-select";
import batches from "./asset/Group 328.svg";
import idea from "./asset/Group 322.svg";
import satellites from "./asset/Group 324.svg";
import vaccineicons from "./asset/Group 332.svg";
import photo from "./asset/photo.svg";
import video from "./asset/video.svg";
import Loading from "../../../components/loading/Loading";
import swal from "sweetalert";
import date_icon from "../updateVaccination/asset/date.svg"

const UpdateVaccination = () => {
  const url = config.server_url;
  const [ideafarm, setIdeafarm] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [product, setProduct] = useState([]);
  const [scheuled, setScheuled] = useState([]);
  const [ideaId, setIdeaId] = useState("");
  const [satellite, setSatellite] = useState([]);
  const [satelliteId, setSatelliteId] = useState("");
  const [batch, setBatches] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [batchess, setbatches] = useState();
  const [date, setDate] = useState();
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState({
    image: [],
    video: [],
  });
  const [loading, setLoading] = useState(false);
  const [productDetail,setProductDetail] = useState([])

  useEffect(() => {
    getProduct();
    getIdeafarm();
  }, []);
  const getProduct = async () => {
    const response = await axios.get(`${url}/get-all-products`);
    setProduct(response.data.data);
    console.log(response.data.data);
  };
  const getIdeafarm = async () => {
    const response = await axios.get(`${url}/show-idea-farms`);
    setIdeafarm(response.data.data);
    console.log(response.data.data);
  };
  const handleScheduledFarms = async (e) => {
    let value = e.target.value;
    console.log("tes value", value);
    const response = await axios.get(
      `${url}/show-vaccination-date?id=${batchess}&name=${value}`
    );
    setScheuled(response.data.data);
    // setVaccine(response.data.data)
    setDate(response.data.data[0].scheduled_date.split("T")[0]);
  };
  const handleIdeaFarms = async (e) => {
    let value = e.target.value;
    setIdeaId(value);
    console.log("test value", value);

    const res = await axios.get(`${url}/show-satellite-farms?id='${value}'`);
    console.log(res.data.data);
    setSatellite(res.data.data);
  };
  const handleSatelliteFarms = async (e) => {
    let value = e.target.value;
    setSatelliteId(value);
    const response = await axios.get(
      `${url}/show-batches?satellite_farm_id='${value}'`
    );
    setBatches(response.data.data);
  };
  const handleBatchFarms = async (e) => {
    let value = e.target.value;
    setbatches(value);
    const res = await axios.get(
      `${url}/get-product-quantity?batch_id=${value}`
    );
    console.log(res.data.data)
    setProductDetail(res.data.data[0])
    const response = await axios.get(
      `${url}/show-vaccines?batch_id='${value}'`
    );
    console.log("check response", response.data.data);
    setSupervisor(response.data.data);
    setVaccine(response.data.data);
  };
  console.log("check batches", batchess);

  const formVaccinSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
let data = {}
    for (let i = 0; i < e.target.length; i++) {

      let name = e.target[i].name;

      let value = e.target[i].value;

      formData.append(`${name}`, value);

      data[e.target[i].name] = e.target[i].value;

    }

    console.log(data);

    for (let i = 0; i < files.image.length; i++) {

      console.log(files.image[i]);

      formData.append("vaccination_image", files.image[i]);

    }



    for (let i = 0; i < files.video.length; i++) {

      // console.log(files.image[i]);

      formData.append("vaccination_video", files.video[i]);

    }
    formData.append("administered_time" ,new Date().toLocaleTimeString());
    const res = await axios.post(`${url}/create-vaccination`, formData);
    if(res.data.status === true){
      setLoading(false)
      swal(`Vaccination updated successfully`, "", "success", {
       closeOnClickOutside: false,
       className: "warning-swal",
   }).then((value) => {
       if (value) {
           window.location.reload();
       } else return;
   });
   }else {
     setLoading(false)
     swal(`Something went wrong`, "", "warning", {
      closeOnClickOutside: false,
      className: "warning-swal",
  }).then((value) => {
      if (value) {
          window.location.reload();
      } else return;
  });
   }
  };

  const handleImage = (e) => {
    setFile([]);
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i].name);
      setFile((prev) => [...prev, e.target.files[i].name]);
    }
    setFiles({ ...files, image: [...e.target.files] });
  };
  const handleVideos = (e) => {
    setVideos([]);
    for (let i = 0; i < e.target.files.length; i++) {
      setVideos((prev) => [...prev, e.target.files[i].name]);
    }
    setFiles({ ...files, video: [...e.target.files] });
  };

  return (
    <>
      <form className="vaccination-form" onSubmit={(e) => formVaccinSubmit(e)}>
        <p className="table_heading1">Record Vaccination</p>

        <div className="update_vaccination">
          <div className="update_vaccine_head">
            <div className="single-inp1">
              <img src={idea} alt="" className="icon" />
              <span className="vertical-line"></span>
              <select
                name="idea_farm"
                onChange={(e) => handleIdeaFarms(e)}
                required
              >
                <option>Select Idea Farm</option>
                {ideafarm.map((elem) => (
                  <option value={elem.value} key={elem.value}>
                    {elem.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="single-inp1">
              <img src={satellites} alt="" className="icon" />
              <span className="vertical-line"></span>
              <select
                type="search"
                name="satellite_name"
                onChange={(e) => handleSatelliteFarms(e)}
                required
              >
                <option value="">Select satellite farm</option>
                {satellite.map((elem) => (
                  <option value={elem.value} key={elem.value}>
                    {elem.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="single-inp1">
              <img src={batches} alt="" className="icon" />
              <span className="vertical-line"></span>
              <select
                name="batch_id"
                onChange={(e) => handleBatchFarms(e)}
                required
              >
                <option value="">Select Batch ID</option>
                {batch.map((elem) => (
                  <option value={elem.value} key={elem.value}>
                    {elem.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="single-inp1">
              <img src={product_icon} alt="" className="icon" />
              <span className="vertical-line"></span>
              <input className="batch_vaccination" type = "text" placeholder="Product Name" value = {productDetail ? productDetail.product_sub_category : ""} name = "product_id" readonly/>
              {/* <select
                className="batch_vaccination"
                name="product_sub_category"
                required
              >
                <option>Select Product Name</option>
                {product.map((elem) => (
                  <option value={elem.id} key={elem.id}>
                    {elem.product_sub_category}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
          <h4 className="add_sf_left_farm_title">Vaccine Details</h4>

          <hr />
          <div className="label_input_vaccination_datalist">
            <label htmlFor="vaccine_type"> Vaccine Type</label>
            <div className="vaccine_type_box">
              <div className="single-inp11">
                <img src={vaccineicons} alt="" className="icon" />
                <span className="vertical-line"></span>
                <select
                  className="vac-update_vaccine_actual_date"
                  onChange={(e) => handleScheduledFarms(e)}
                  name="name_en"
                  required
                >
                  <option >Select Vaccine Type</option>
                  {vaccine.map((elem) => (
                    <option value={elem.name_en} key={elem.id}>
                      {elem.name_en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="label_input_vaccination">
            <label htmlFor="vaccine_actual_date">Vaccine Scheuled Date</label>
            <div className="single-inp1">
              <img src={date_icon} alt="" className="icon" />
              <span className="vertical-line"></span>
              <input
                type="text"
                name="scheduled_date"
                value={date}
                className="vac-update_vaccine_actual_date"
                readOnly
              />
            </div>
          </div>
          <div className="label_input_vaccination">
            <label htmlFor="vaccine_administered_date">
              Vaccine Administered Date
            </label>
            <div className="single-inp1">
              <img src={date_icon} alt="" className="icon" />
              <span className="vertical-line"></span>

              <input
                name="administered_date"
                required
                className="update_vaccine_vaccinated_date"
                placeholder="Date"
                type="date"
                // onfocus=(this.type='date')
                id="date"
              />
            </div>
          </div>

          <div className="address-grid-container-vaccine">
            {/* <div className="single-inp">
              <div className="hatchery-img vaccine">
                {file.length == 0 ? (
                  <>
                    <img src={photo} alt="" />
                    <p className="vaccine">Choose Images</p>
                  </>
                ) : (
                  <>
                    <p className="file-name">{file}&nbsp;</p>
                  </>
                )}

                <input
                  type="file"
                  name="file"
                  multiple="multiple"
                  placeholder="Choose Image"
                  onChange={handleImage}
                  // required
                />
              </div>
            </div> */}
            <div className="single-inp">
              <div className="hatchery-img ">
              {file.length == 0 ? (
                  <>
                    <img src={photo} alt="" />
                    <p className="vaccine">Choose Images</p>
                  </>
                ) : (
                  <>
                    <p className="file-name">{file}&nbsp;</p>
                  </>
                )}

                <input
                  type="file"
                  name="file"
                  multiple="multiple"
                  placeholder="Choose Image"
                  onChange={handleImage}
                  required
                />
              </div>
            </div>
          </div>

          <div className="btn_wrapper">
            <button type="submit" className="update_vaccine_submit_btn">
              Submit
            </button>
          </div>
        </div>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default UpdateVaccination;


// {videos.length == 0 ? (
//   <>
//     <img src={video} alt="" />
//     <p className="vaccine">Choose Videos</p>
//   </>
// ) : (
//   <>
//     <p className="file-name"> {videos} &nbsp;</p>
//   </>
// )}
// <input
//   type="file"
//   name="videos"
//   multiple="multiple"
//   placeholder="Choose Video"
//   onChange={handleVideos}
  // required
// />