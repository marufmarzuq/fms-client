import React, { useContext,useState,useEffect } from 'react';
import { IdeaContext } from '../../../components/contexts/IdeaFarm';
import Select from "react-select";
import axios from "axios";
import config from "../../../config.json";
import batches from "./asset/Group 328.svg";
import idea from "./asset/Group 322.svg";
import satellites from "./asset/Group 324.svg";
import vaccineicons from "./asset/Group 332.svg";
import photo from "./asset/photo.svg";
import video from "./asset/video.svg";
import Loading from "../../../components/loading/Loading";
import swal from "sweetalert";
import "./CreateVaccination.css";

const CreateVaccination = () => {

    const url = config.server_url;
    const {ideaFarm,setIdeafarm} = useContext(IdeaContext)
    const [vaccine, setVaccine] = useState([]);
    const [product, setProduct] = useState([]);
    const [scheuled, setScheuled] = useState([]);
    const [ideaId, setIdeaId] = useState("");
    const [ideaValue, setIdeaValue] = useState([]);
    const [satellite, setSatellite] = useState([]);
    const [satelliteValue, setSatelliteValue] = useState([]);

    const [satelliteId, setSatelliteId] = useState("");
    const [batch, setBatches] = useState([]);
    const [batchValue, setBatchValue] = useState([]);
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
    const style = {
        control: (base,state) => ({
          ...base,
          // This line disable the blue border
          boxShadow: "0 !important",
          // border: state.isFocused ? 0 : 0,
          "&:hover": {
            border: "1px solid #46BC5C !important",
              // Overwrittes the different states of border
              borderColor: state.isFocused ? "red" : "green"
          },
        }),
        option :(styles,{isFocused,isSelected}) => {
          return {
            ...styles,
            backgroundColor : isFocused ? "#46bc5c99" : "null",
            color:isFocused ? "white" : "null",
            // color: "black",
            fontWeight:400,
            padding:20
          }
        },
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 9999,
          overFlowX: "hidden",
          padding: 0,
          margin: 0,
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
          overFlowX: "hidden",
          padding: 0,
          margin: 0,
        }),
      };
    useEffect(() => {
      getProduct();
    //   getIdeafarm();
    }, []);
    const getProduct = async () => {
      const response = await axios.get(`${url}/get-all-products`);
      setProduct(response.data.data);
      console.log(response.data.data);
    };
    // const getIdeafarm = async () => {
    //   const response = await axios.get(`${url}/show-idea-farms`);
    //   setIdeafarm(response.data.data);
    //   console.log(response.data.data);
    // };
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
      const response = await axios.get(
        `${url}/show-vaccines?batch_id='${value}'`
      );
      console.log("check response", response.data.data);
      setSupervisor(response.data.data);
      setVaccine(response.data.data);
    };
    console.log("vaccines are", vaccine)
    console.log("check batches", batchess);
  
    const formVaccineSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let data = {};
      for (let i = 0; i < e.target.length - 1; i++) {
        let name = e.target[i].name;
  
        let value = e.target[i].value;
  
        data[e.target[i].name] = e.target[i].value;
      }
      data.administered_time = new Date().toLocaleTimeString();
      console.log("data tes", data);
      const res = await axios.post(`${url}/create-vaccination`, data);
      setLoading(false);
      swal(`Vaccination added successfully`, "", "success", {
        closeOnClickOutside: false,
        className: "warning-swal",
      }).then((value) => {
        if (value) {
          window.location.reload();
        } else return;
      });
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
    <div className="create-vaccine">
    <form onSubmit={formVaccineSubmit}>
      <h4> Create Daily Data</h4>
      <div className="farms">
      <div className="single-inp">
              <img src={idea} alt="" className="react-select-img" />
              <span className="vertical-line select"></span>

              <Select
                // defaultValue={hatcheries[0]}
                name="idea_farms"
                options={ideaFarm}
                className="idea_farm_select"
                isSearchable
                // isMulti
                onChange={setIdeaValue}
                placeholder="Select Idea Farm"
                styles = {style}
              />
            </div>
            <div className="single-inp">
            <img src={satellites} alt="" className="react-select-img" />
          <span className="vertical-line select"></span>
            <Select
              name="satellite_farms"
              options={satellite}
              isSearchable
              // isMulti
              onChange={setSatelliteValue}
              className="idea_farm_select"
              placeholder="Select Satellite Farm"
              styles={style}
            />
            </div>
            <div className="single-inp">
            <img src={batches} alt="" className="react-select-img" />
          <span className="vertical-line select"></span>
            <Select
              name="satellite_farms"
              options={batch}
              isSearchable
              // isMulti
              onChange={setBatchValue}
              className="idea_farm_select"
              placeholder="Select Batches"
              styles={style}
            />
            </div>
            <div className="single-inp">
            <img src={batches} alt="" className="react-select-img" />
          <span className="vertical-line select"></span>
            <Select
              name="satellite_farms"
              options={batch}
              isSearchable
              // isMulti
              onChange={setBatchValue}
              className="idea_farm_select"
              placeholder="Select Batches"
              styles={style}
            />
            </div>
      </div>
      <div className="second-container">
          <p className="title">Vaccine Details</p>
        <div className='vaccine'>
        <div className="single-inp">
                <img src={vaccineicons} alt="" />
                <span className="vertical-line"></span>
                <select
                  onChange={(e) => handleScheduledFarms(e)}
                  name="name_en"
                  required
                >
                  {vaccine.map((elem) => (
                    <option value={elem.name_en} key={elem.id}>
                      {elem.name_en}
                    </option>
                  ))}
                </select>
              </div>
              <div className="single-inp">
              <img src={batches} alt="" />
              <span className="vertical-line"></span>
              <input
                type="text"
                name="scheduled_date"
                placeholder='Planned Date'
                value={date}
                readOnly
              />
            </div>
            <div className="single-inp">
              <img src={batches} alt="" className="icon" />
              <span className="vertical-line"></span>

              <input
                name="administered_date"
                required
                placeholder="Date"
                type="date"
                // onfocus=(this.type='date')
                id="date"
              />
            </div>
        </div>
        <div className='vaccine-image'>
        <div className="daily-data-image-upload">
              {file.length == 0 ? (
                <>
                <img src={photo} alt="" />
                  <p>Images Upload</p>
                </>
              ) : (
                <p id="no-image">{file}</p>
              )}

              <input type="file" multiple="multiple" onChange={handleImage} />
            </div>
            <div className="daily-data-image-upload">
              {videos.length == 0 ? (
                <>
                <img src={video} alt="" />
                  <p>Videos Upload</p>
                </>
              ) : (
                <p id="no-image">{videos}</p>
              )}

              <input type="file" multiple="multiple" onChange={handleVideos} />
            </div>
            </div>
            </div>
      </form>
      </div>
  )
}

export default CreateVaccination