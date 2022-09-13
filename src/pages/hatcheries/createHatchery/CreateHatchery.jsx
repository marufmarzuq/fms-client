import React, { useState } from "react";
import "./CreateHatchery.css";
import hatchery from "../../../assets/assets/hatchery.svg";
import ProductData from "./ProductData";
import addIcon from "../../../assets/addIcon.svg";
import GoogleMaps from "../../../components/map/GoogleMaps";
import config from "../../../config.json";
import axios from "axios";
import userIcon from "../../../assets/userIcon.svg";
import phone from "../../../assets/phone.svg";
import addressbook from "../../../assets/addressbook.svg";
import image from "../../../assets/image.svg";
import video from "../../../assets/video.svg";
import swal from "sweetalert";
import Loading from "../../../components/loading/Loading";

const CreateHatchery = () => {
  const [Landmark, setLandmark] = useState("");
  const [userCoordinates, setUserCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const [loading, setLoading] = useState(false);
  const url = config.server_url;
  const [addBtn, setAddBtn] = useState(false);
  const [products, setProducts] = useState(["Quails", "kadaknath", "Aseel"]);
  const [items, setItems] = useState([0]);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState([]);
  const [videos, setVideos] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [files, setFiles] = useState({
    image: [],
    video: [],
  });

 
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

  const handleAddress = (e) => {
    //   setaddress((prev) => [...prev,e.target.value])
  };

  const hatcheryFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {};
    let formData = new FormData();

    for (let i = 0; i < e.target.length - 1; i++) {
      let name = e.target[i].name;
      let value = e.target[i].value;
      formData.append(`${name}`, value);
      data[e.target[i].name] = e.target[i].value;
    }
    for (let i = 0; i < files.image.length; i++) {
      console.log(files.image[i]);
      formData.append("hatchery_image", files.image[i]);
    }

    for (let i = 0; i < files.video.length; i++) {
      // console.log(files.image[i]);
      formData.append("hatchery_video", files.video[i]);
    }

    let address = data.address1.concat(",", data.address2);
    formData.append("address", address);

    const res = await axios.post(`${url}/add-hatchery`, formData);
    if (res.data.status === true) {
      setLoading(false);
      swal(`Hatchery added successfully`, "", "success", {
        closeOnClickOutside: false,
        className: "warning-swal",
      }).then((value) => {
        if (value) {
          window.location.reload();
        } else return;
      });
    } else {
      setLoading(false);
      swal(`Something went wrong`, "", "success", {
        closeOnClickOutside: false,
        className: "warning-swal",
      }).then((value) => {
        if (value) {
          window.location.reload();
        } else return;
      });
    }
  };
// let [focus,setFocus] = useState(false)
//   const handleFocus = () => {
//     document.querySelector(".single-inp").addEventListener("click", (e) => {

//       console.log(e.target);
//       e.target.classList.add("filterimg")
//     });
//   };

  return (
    <>
      <div className="hatchery-create-form">
        <div className="hatchery-header">
          <span>Onboard Hatchery</span>
          <p className="sub-heading">Address Detail</p>
          <p className="horizontal-line"></p>
        </div>
        <form onSubmit={hatcheryFormSubmit}>
          <div className="grid-hatchery-container">
            <div>
              <div className="single-inp">
               
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Hatchery Name"
                  name="name"
                  required
                />
                 <img src={hatchery} alt="" />
              </div>
              <div className="single-inp">
                <img src={userIcon} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Point of Contact"
                  name="poc"
                  required
                />
              </div>
              <div className="single-inp">
                <img src={phone} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone No."
                  name="phone"
                  required
                />
              </div>
              <p className="sub-heading">UPLOAD IMAGE AND VIDEO</p>
              <p className="horizontal-line"></p>
              <div className="address-grid-container hatcheries">
                <div className="single-inp">
                  <div className="hatchery-img">
                    {file.length == 0 ? (
                      <>
                        <img src={image} alt="" />
                        <p>Choose Images</p>
                      </>
                    ) : (
                      <>
                        <p className="file-name">{file} &nbsp;</p>
                      </>
                    )}

                    <input
                      type="file"
                      name="img"
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
                        <p className="file-name">{videos} &nbsp;</p>
                      </>
                    )}
                    <input
                      type="file"
                      name="videos"
                      multiple="multiple"
                      placeholder="Choose Video"
                      onChange={handleVideos}
                      // accept="image/png, image/jpeg, image/jpg"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="add-product-hatchery">
                <p className="sub-heading">ADD PRODUCT</p>
                <p className="horizontal-line"></p>

                <>
                  {items.map((ele, i) => (
                    <ProductData
                      products={products}
                      id={ele}
                      items={items}
                      setItems={setItems}
                      selected={selected}
                      setSelected={setSelected}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      error={error}
                      key={i}
                      setProductDetail={setProductDetail}
                      selected={selected}
                      productDetail={productDetail}
                      setError={setError}
                    />
                  ))}
                </>
                <div>{error && <p className="error">{error}</p>}</div>
                
              </div>

              <div className="hatchery-btn">
                <button type="submit">Submit</button>
              </div>
            </div>

            {/* left side */}

            <div>
              <div className="single-inp">
                <img src={addressbook} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  name="address1"
                  onChange={handleAddress}
                  required
                />
              </div>
              <div className="single-inp">
                <img src={addressbook} alt="" />
                <span className="vertical-line"></span>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  onChange={handleAddress}
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
              <div className="hatchery-google-map">
                <GoogleMaps
                  setLandmark={setLandmark}
                  setUserCoordinates={setUserCoordinates}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default CreateHatchery;
