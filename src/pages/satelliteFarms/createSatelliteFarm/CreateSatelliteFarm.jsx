import React, { useEffect, useState } from "react";
import hatchery from "../../../assets/assets/hatchery.svg";
import "./CreateSatelliteFarm.css";
import GoogleMaps from "../../../components/map/GoogleMaps";
import axios from "axios";
import config from "../../../config.json";
import { getDefaultNormalizer } from "@testing-library/react";
import idea_farm from "../../../assets/assets/idea_farm.svg";
import farmer_icon from "../../../assets/assets/farmer.svg";
import satellite_farm from "../../../assets/assets/satellite_farm.svg";
import Select from "react-select";
import phone from "../../../assets/phone.svg";
import userIcon from "../../../assets/userIcon.svg";
import image from "../../../assets/assets/image.svg";
import video from "../../../assets/video.svg";
import swal from "sweetalert";
import { useDebounce } from "../../../hooks/useDebounce";
import Loading from "../../../components/loading/Loading";
import addressbook from "../../../assets/addressbook.svg"

const CreateSatelliteFarm = () => {
  const [ideaFarm, setIdeaFarm] = useState([]);
  const [farmer, setFarmer] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [farmerId, setFarmerId] = useState("");
  const [ideaValue, setIdeaValue] = useState("");
  const [ideaFarmId,setIdeaFarmId] = useState()
  const [supervisorSearch,setSupervisorSearch] = useState()
  let filteringValue = useDebounce(supervisorSearch,3000)
  const [supervisorId,setSupervisorId] = useState()
const [loading,setLoading] = useState(false)
  useEffect(() => {
    getIdeaFarm();
    getFarmer();
  }, []);

  useEffect(() => {
    console.log(ideaValue)
    if(ideaValue){
      console.log("hiii")
    handleIdeaFarm()
    }
  },[ideaValue])

  useEffect(() => {
     if(filteringValue) {
       let filter = supervisor.filter((ele) => ele[0].name == supervisorSearch)
       if(filter.length > 0) {
       let id =filter[0][0].id
       setSupervisorId(id)
       }
     }
  },[filteringValue])


  const url = config.server_url;
  const getIdeaFarm = async () => {
    const res = await axios.get(`${url}/show-idea-farms`);
    setIdeaFarm(res.data.data);
  };

 
  const style = {
    control: (base, state) => ({
      ...base,
      // This line disable the blue border
      boxShadow: "0 !important",
      // border: state.isFocused ? 0 : 0,
      "&:hover": {
        border: "1px solid #46BC5C !important",
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "red" : "green",
      },
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#46bc5c99" : "null",
        backgroundColor: isSelected ? "#48bf7f" : "null",
        // color: "black",
        fontWeight: 400,
        padding: 20,
        ":hover": {
          backgroundColor: "#46bc5c99",
          color: "white",
        },
        cursor: "pointer",
      };
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
  
  const getFarmer = async () => {
    const res = await axios.get(`${url}/show-farmer`);
    console.log(res.data.data)
    setFarmer(res.data.data);
  };
  const handleIdeaFarm = async () => {
    let value = ideaValue.value
    setIdeaFarmId(value)
    const res = await axios.get(`${url}/search-supervisor?id='${value}'`);
    setSupervisor(res.data.data);
  };


  const [file, setFile] = useState([]);
  const [videos, setVideos] = useState([]);
  const [Landmark, setLandmark] = useState("");
  const [userCoordinates, setUserCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const [files, setFiles] = useState({
    image: [],
    video: [],
  });

  const handleFarmer = (e) => {
    let value = e.target.value;
    let filter = farmer.filter((ele) => ele.name === value);
    console.log(filter)
    // setFarmerId(filter[0].id);
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

  const satelliteFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let data = {};
    let formData = new FormData();
    for (let i = 0; i < e.target.length - 1; i++) {
      let name = e.target[i].name;
      let value = e.target[i].value;
      formData.append(`${name}`, value);
      data[e.target[i].name] = e.target[i].value;
    }
    let address = data.address2 ? data.address1.concat(",", data.address2) : data.address1;
    formData.append("address", address);
    formData.append("farmer_id", farmerId.value);
    formData.append("supervisor_id",supervisorId)
    formData.append("idea_farm_id",ideaFarmId)
    for (let i = 0; i < files.image.length; i++) {
      formData.append("satellite_image", files.image[i]);
    }

    for (let i = 0; i < files.video.length; i++) {
      formData.append("satellite_video", files.video[i]);
    }
    const res = await axios.post(`${url}/add-satellite`, formData);
    if(res.data.status === true) {
      setLoading(false)
      swal(`Satellite Farm added successfully`, "", "success", {
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

  return (
    <>
    <div className="satellite-create-form">
      <div className="hatchery-header">
        <span>Onboard Satellite Farm</span>
      </div>
      <form onSubmit={satelliteFormSubmit}>
        <div className="grid-satellite-container">
          <div>
            <p className="sub-heading">Farm Details</p>
            <p className="horizontal-line"></p>
            <div>
              <div className="single-inp">
                <img src={idea_farm} alt="" className="react-select-img"/>
                <span className="vertical-line select"></span>
                {/* <select name="idea_farm_id" onChange={handleIdeaFarm}>
                  <option className="no-option" value="">
                    Select Idea Farm
                  </option>
                  {ideaFarm.map((elem) => (
                    <option value={elem.id} key={elem.id}>
                      {elem.name}
                    </option>
                  ))}
                </select> */}
                <Select
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
                <img src={satellite_farm} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Satellite Farm"
                  name="name"
                  required
                />
              </div>
              <div className="single-inp">
                <img src={phone} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone"
                  name="phone"
                  required
                />
              </div>
              <div className="single-inp">
              <img src={farmer_icon} alt="" className="react-select-img"/>
                <span className="vertical-line select"></span>
          
                 <Select
                  name="idea_farms"
                  options={farmer}
                  className="idea_farm_select"
                  isSearchable
                  // isMulti
                  onChange={setFarmerId}
                  placeholder="Select Farmer"
                  styles = {style}
                />
               
              </div>
              <div className="single-inp">
                <img src={userIcon} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  list="supervisor"
                  placeholder="Search Supervisor"
                  onChange={(e) => setSupervisorSearch(e.target.value)}
                  required
                />
                <datalist id="supervisor">
                  {supervisor.length > 0 ? (
                    supervisor.map((elem) =>
                    elem[0] ? (
 <>
                      <option value={elem[0].name}>{elem[0].name}</option>
                      </>
                    ):(
                      <option></option>
                    )
                    
                  )
                  ):(
                    <option></option>
                  )
                  }
                </datalist>
              </div>
              <p className="sub-heading">Upload Image and Video</p>
              <p className="horizontal-line"></p>
              <div className="address-grid-container">
                <div className="single-inp">
                  <div className="hatchery-img">
                    {file.length == 0 ? (
                      <>
                        <img src={image} alt="" />
                        <p>Choose Images</p>
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
                <div className="single-inp">
                  <div className="hatchery-img">
                    {videos.length == 0 ? (
                      <>
                        <img src={video} alt="" />
                        <p>Choose Videos</p>
                      </>
                    ) : (
                      <>
                        <p className="file-name"> {videos} &nbsp;</p>
                      </>
                    )}
                    <input
                      type="file"
                      name="videos"
                      multiple="multiple"
                      placeholder="Choose Video"
                      onChange={handleVideos}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="satellite-btn">
                <button>Submit</button>
              </div>
            </div>
          </div>
          <div>
            <p className="sub-heading">Address Details</p>
            <p className="horizontal-line"></p>
            <div>
              <div className="single-inp">
                <img src={addressbook} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  name="address1"
                  required
                />
              </div>
              <div className="single-inp">
                <img src={addressbook} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  name="address2"
                />
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
                <div className="single-inp">
                  <input
                    type="text"
                    placeholder="Latitude"
                    className="input-no-img"
                    name="latitude"
                    value={userCoordinates.lat}
                    required
                  />
                </div>
                <div className="single-inp">
                  <input
                    type="text"
                    placeholder="Longitude"
                    className="input-no-img"
                    name="longitude"
                    value={userCoordinates.lng}
                    required
                  />
                </div>
              </div>
            </div>
            <div style = {{width:"100%",height:"70%",marginTop:"10px"}}>
            <GoogleMaps
              setLandmark={setLandmark}
              setUserCoordinates={setUserCoordinates}
            />
            </div>
          </div>
        </div>
      </form>
    </div>
{
  loading && (
    <Loading 
    />
  )
}
    </>
  );
};

export default CreateSatelliteFarm;
