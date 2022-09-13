import React, { useEffect, useState } from "react";
import "./CreateIdeaFarm.css";
import GoogleMaps from "./components/map/GoogleMaps";

import StockData from "./StockData";
// import addIcon from "./components/assets/addIcon.svg";
import axios from "axios";
import config from "../../../config.json";
import Select from "react-select";
import userIcon from "../../../components/sidebar/assets/userIcon.svg";
import image from "../../../components/sidebar/assets/image.svg";
import video from "../../../assets/video.svg";
import addressbook from "../../../assets/addressbook.svg";
import phone from "../../../assets/phone.svg";
import hatchery from "../../../assets/assets/hatchery.svg";
import swal from "sweetalert";
import Loading from "../../../components/loading/Loading";
import addIcon from "../../../assets/addIcon.svg";

const CreateIdeaFarm = () => {
  useEffect(() => {
    getSuperVisor();
    getAllStocks();
    getAllProducts()
    getHatcheries()
  }, []);
  const [stockSubCategory,setStockSubCategory] = useState([])

 
  const [supervisor, setSupervisors] = useState([])
  const [allStocks, setAllStocks] = useState([]);
  const [selectedHatcheries, setSelectedHatcheries] = useState("");
  const [selectedSupervisors, setSelectedSupervisors] = useState("");
  const [allProducts,setAllProducts] = useState([])
  const [productId,setProductId] = useState("")
  const [stockId,setStockId] = useState("")
  const [file, setFile] = useState([]);
  const [videos, setVideos] = useState([]);
  const [Landmark, setLandmark] = useState("");
  const [userCoordinates, setUserCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const [input,setInput] = useState({
    product:"",
    category:"",
    sub_category:"",
    quantity:"",
    cost:"",
  })

  const [hatcheries, setHatcheries] = useState([]);

const [loading,setLoading] = useState(false)
  const [items, setItems] = useState([0]);

  const [files, setFiles] = useState({
    image: [],
    video: [],
  });

  const getAllProducts = async () => {
    const res = await axios.get(`${url}/get-all-products`);
    setAllProducts(res.data.data);
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


  const url = config.server_url;

  const getSuperVisor = async () => {
    const res = await axios.get(`${url}/show-all-supervisors`);
    setSupervisors(res.data.data)
  };

  const getAllStocks = async () => {
    const res = await axios.get(`${url}/get-stock-category`);
    setAllStocks(res.data.data);
  };


const getHatcheries = async () => {
  const res = await axios.get(`${url}/show-all-hatcheries`)
  setHatcheries(res.data.data)
}
 
 

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

  const ideaFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let data = {};
    let formData = new FormData();
    for (let i = 0; i < e.target.length; i++) {
      let name = e.target[i].name;
      let value = e.target[i].value;
      formData.append(`${name}`, value);
      data[e.target[i].name] = e.target[i].value;
    }
    console.log(data);
    for (let i = 0; i < files.image.length; i++) {
      console.log(files.image[i]);
      formData.append("idea_image", files.image[i]);
    }

    for (let i = 0; i < files.video.length; i++) {
      // console.log(files.image[i]);
      formData.append("idea_video", files.video[i]);
    }
    let address = data.address2 ? data.address1.concat(',', data.address2) : data.address1;
    formData.append("address", address);
    const res = await axios.post(`${url}/add-idea-farm`, formData);
    if(res.data.status === true){
      setLoading(false)
      swal(`Idea Farm added successfully`, "", "success", {
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
    <div className="create-idea-farm">
      <span>Onboard Idea Farm</span>
      <form onSubmit={ideaFormSubmit} className="idea-farm-form">
        <div className="grid-idea-farm">
          <div className="grid-idea-farm-column">
            <div>
              <p className="sub-heading">Farm Details</p>
              <p className="horizontal-line"></p>

              <div className="single-inp">
                <img src= {userIcon} alt="" />
                <span className="vertical-line"></span>
                <input type="text" placeholder="Name" name="name" required />
              </div>
              <div className="single-inp">
                <img src= {phone} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone"
                  name="phone"
                  required
                />
              </div>
              <p className="sub-heading">Upload Image And Video</p>
              <p className="horizontal-line"></p>
              <div className="address-grid-container">
                <div className="single-inp">
                  <div className="hatchery-img">
                    {file.length == 0 ? (
                      <>
                        <img src= {image} alt="" />
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
                        <img src= {video} alt="" />
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
              <p className="sub-heading">Hatcheries</p>
              <p className="horizontal-line"></p>
              <div className="single-inp">
                <img src= {hatchery} alt="" className="react-select-img"/>
                <span className="vertical-line select"></span>
                <Select
                  options={hatcheries}
                  placeholder="Select Hatcheries"
                  isSearchable
                  isMulti
                  name="hatcheries"
                  styles={style}
                  className="idea_farm_select"
                  onChange={setSelectedHatcheries}
                  required
                />
              </div>
              <p className="sub-heading">Supervisors</p>
              <p className="horizontal-line"></p>
              <div className="single-inp">
                <img src= {userIcon} alt="" className="react-select-img"/>
                <span className="vertical-line select"></span>
                {/* <select name="supervisor_id" required>
                 <option value ="">Select Supervisor</option>
                 {
                   supervisor.map((ele) => (
                     <option value={ele[0].id}>{ele[0].name}</option>
                   ) )
                 }
               </select> */}
                <Select
                  options={supervisor}
                  placeholder="Select Supervisors"
                  isSearchable
                  isMulti
                  name="Supervisors"
                  styles={style}
                  className="idea_farm_select"
                  onChange={setSelectedSupervisors}
                  required
                />
              </div>
            </div>
            <div>
              <p className="sub-heading">Address Details</p>
              <p className="horizontal-line"></p>
              <div>
                <div className="single-inp">
                  <img src= {addressbook} alt="" />
                  <span className="vertical-line"></span>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    name="address1"
                    required
                  />
                </div>
                <div className="single-inp">
                  <img src= {addressbook} alt="" />
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
              <div style={{width:"100%",height:"72%"}}>
              <GoogleMaps
                setLandmark={setLandmark}
                setUserCoordinates={setUserCoordinates}
              />
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* Bottom */}
          <div>
            <p className="sub-heading">Stock Details</p>
            <p className="horizontal-line"></p>
            <>
              {items.map((elem) => (
                <StockData items={items}  stockSubCategory = {stockSubCategory}
  setStockSubCategory = {setStockSubCategory} stockId = {stockId} setInput = {setInput} input = {input} setStockId = {setStockId} productId = {productId} setProductId = {setProductId} allStocks = {allStocks} id={elem} allProducts = {allProducts} setItems={setItems} />
              ))}
            </>
          

            <div className="idea-btn">
              <button>Submit</button>
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

export default CreateIdeaFarm;
