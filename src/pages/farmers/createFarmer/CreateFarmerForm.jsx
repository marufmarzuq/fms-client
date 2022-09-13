import React, { useState } from "react";
import "./CreateFarmerForm.css";
import welcome_user from "../../../assets/assets/welcome_user.svg";
import { BsImage } from "react-icons/bs";
import axios from "axios";
import config from "../../../config.json";
import userIcon from "../../../assets/userIcon.svg";
import image from "../../../assets/image.svg";
import phone from "../../../assets/phone.svg";
import farmer_icon from "../../../assets/assets/farmer.svg";
import language from "../../../assets/language.svg";
import swal from "sweetalert";
import Loading from "../../../components/loading/Loading";

const CreateFarmerForm = () => {
  const url = config.server_url;
  const [file, setFile] = useState([]);
  const [kycImage, setKycImage] = useState([]);
  const [files, setFiles] = useState({
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [kycFiles, setKycFiles] = useState({
    image: [],
  });

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

  const handleKycFile = (e) => {
    setKycImage([]);
    for (let i = 0; i < e.target.files.length; i++) {
      setKycImage((prev) => [...prev, e.target.files[i].name]);
    }
    setKycFiles({ ...kycFiles, image: [...e.target.files] });
  };

  const handleImage = (e) => {
    setFile([]);
    for (let i = 0; i < e.target.files.length; i++) {
      setFile((prev) => [...prev, e.target.files[i].name]);
    }
    setFiles({ ...files, image: [...e.target.files] });
  };

  const farmerFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();

    for (let i = 0; i < e.target.length; i++) {
      let name = e.target[i].name;
      let value = e.target[i].value;
      formData.append(`${name}`, value);
    }

    for (let i = 0; i < files.image.length; i++) {
      formData.append("farmer_image", files.image[i]);
    }
    for (let i = 0; i < kycFiles.image.length; i++) {
      formData.append("kyc_document", kycFiles.image[i]);
    }
    const res = await axios.post(`${url}/add-farmer`, formData);
    if (res.data.status === true) {
      setLoading(false);
      swal(`Farmer details added successfully`, "", "success", {
        closeOnClickOutside: false,
        className: "warning-swal",
      }).then((value) => {
        if (value) {
          window.location.reload();
        } else return;
      });
    } else {
      setLoading(false);
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
      <div className="farmer-create-form">
        <div className="farmer-form-container">
          <form onSubmit={farmerFormSubmit}>
            <div>
              <span>Onboard Farmers</span>
              <p className="title">Profile details</p>
            </div>
            <div className="top-container">
              <div className="profile-photo-farmer">
                <div>
                  <img src={userIcon} alt="" />
                  {file.length != 0 ? (
                    <p>{file}</p>
                  ) : (
                    <p>Choose profile photo</p>
                  )}
                  <input
                    type="file"
                    multiple="multiple"
                    onChange={handleImage}
                    required
                  />
                  {file && <p>{file}</p>}
                </div>
              </div>
              <div className="input-fields">
                <div className="single-inp-farmer">
                  <img src={farmer_icon} alt="" />
                  <span></span>
                  <input type="text" name="name" placeholder="Name" required />
                </div>
                <div className="single-inp-farmer">
                  <img src={phone} alt="" />
                  <span></span>
                  <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Phone"
                  name="phone"
                  required
                />
                </div>
                <div className="single-inp-farmer">
                  <img src={language} alt="" />
                  <span></span>
                  <select name="lang_key" required>
                    <option value="">Select Language</option>
                    <option value="en">English</option>
                    <option value="ta">Tamil</option>
                    <option value="kn">Kannada</option>
                    <option value="te">Telugu</option>
                    <option value="hi">Hindi</option>
                    <option value="or">Oriya</option>
                    <option value="as">Assamese</option>
                    <option value="ml">Malayalam</option>
                    <option value="mr">Marathi</option>
                    <option value="bn">Bengali</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="middle-container ">
              <p className="title">KYC Details</p>
              <div>
                <div className="single-inp-farmer-kyc">
                  <img src={language} alt="" />
                  <span></span>
                  <input
                    style={{ fontSize: "14px" }}
                    list="document"
                    name="kyc_document_type"
                    placeholder="Select KYC document Type"
                    required
                  />
                  <datalist id="document">
                    <option>Pan Card</option>
                    <option>Aadhar Card</option>
                    <option>Voter ID</option>
                  </datalist>
                </div>
                <div className="single-inp-farmer">
                  <img src={language} alt="" />
                  <span></span>
                  <input
                    type="text"
                    name="kyc_no"
                    placeholder="KYC No."
                    required
                  />
                </div>
              </div>
            </div>
            <div className="bottom-container">
              <div className="kyc-image">
                {kycImage.length == 0 ? (
                  <>
                    <img src={image} alt="" />
                    <p>Choose KYC Images</p>
                  </>
                ) : (
                  <p id="kyc-image-name">{kycImage}</p>
                )}
                <input
                  type="file"
                  multiple="multiple"
                  onChange={handleKycFile}
                  required
                />
              </div>
              <div className="farmer-btn">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default CreateFarmerForm;
