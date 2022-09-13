// import React, { useEffect, useState } from "react";
// import "./CreateDailyData.css";
// import { BsImage } from "react-icons/bs";
// import idea_farm from "../../../assets/assets/idea_farm.svg";
// import batch_icon from "../../../assets/assets/batch.svg"
// import satellite_farm from "../../../assets/assets/satellite_farm.svg";
// import config from "../../../config.json";
// import axios from "axios";
// import Select from "react-select";

// const CreateDailyData = () => {
//   const [ideaFarm, setIdeaFarm] = useState([]);
//   const [ideaValue, setIdeaValue] = useState("");
//   const [satelliteFarm, setSatelliteFarm] = useState([]);
//   const [satelliteValue, setSatelliteValue] = useState("");
//   const [batch, setBatch] = useState([]);
//   const [ideaFarmId, setIdeaFarmId] = useState([]);
//   const [batchValue,setBatchValue] = useState([])

//   useEffect(() => {
//     getIdeaFarm();
//   }, []);

//   useEffect(() => {
//     if(ideaValue) {
//       handleIdeaFarm();
//     }
//   }, [ideaValue]);

//   useEffect(() => {
//     if(satelliteValue) {
//       handleSatelliteFarm();
//     }
//   }, [satelliteValue]);


// // Style for react select 
// const style = {
//   control: (base, state) => ({
//     ...base,
//     // This line disable the blue border
//     boxShadow: "0 !important",
//     // border: state.isFocused ? 0 : 0,
//     "&:hover": {
//       border: "1px solid #46BC5C !important",
//       // Overwrittes the different states of border
//       borderColor: state.isFocused ? "red" : "green",
//     },
//   }),
//   option: (styles, { isFocused, isSelected }) => {
//     return {
//       ...styles,
//       backgroundColor: isFocused ? "#46bc5c99" : "null",
//       backgroundColor: isSelected ? "#48bf7f" : "null",
//       // color: "black",
//       fontWeight: 400,
//       padding: 20,
//       ":hover": {
//         backgroundColor: "#46bc5c99",
//         color: "white",
//       },
//       cursor: "pointer",
//     };
//   },
//   menuPortal: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//     overFlowX: "hidden",
//     padding: 0,
//     margin: 0,
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//     overFlowX: "hidden",
//     padding: 0,
//     margin: 0,
//   }),
// };


//   const url = config.server_url;

//   //  Getting idea farm
//   const getIdeaFarm = async () => {
//     const res = await axios.get(`${url}/show-idea-farms`);
//     setIdeaFarm(res.data.data);
//   };

//   const handleIdeaFarm = async (e) => {
//     let value = ideaFarm.value;
   
//     const res = await axios.get(`${url}/show-satellite-farms?id='${value}'`);
//     console.log(res.data.data);
//     setSatelliteFarm(res.data.data);
//   };

//   const handleSatelliteFarm = async (e) => {
   
//     let satellite = satelliteValue.value
//     const res = await axios.get(
//       `${url}/show-batches?satellite_farm_id='${satellite}'`
//     );
//     setBatch(res.data.data);
//   };

//   const [file, setFile] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [files, setFiles] = useState({
//     image: [],
//     video: [],
//   });

//   const [supervisorImage, setSupervisorImage] = useState([]);
//   const [supervisorVideos, setSupervisorVideos] = useState([]);
//   const [supervisorfiles, setSuperVisorFiles] = useState({
//     image: [],
//     video: [],
//   });

//   const dailyDataSubmit = (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     for (let i = 0; i < e.target.length - 1; i++) {
//       let name = e.target[i].name;
//       let value = e.target[i].value;
//       formData.append(`${name}`, value);
//     }
//     for (let i = 0; i < files.image.length; i++) {
//       formData.append("daily_data_image", files.image[i]);
//     }

//     for (let i = 0; i < files.video.length; i++) {
//       formData.append("daily_data_video", files.video[i]);
//     }

//     for (let i = 0; i < supervisorfiles.image.length; i++) {
//       formData.append("supervisor_image", supervisorfiles.image[i]);
//     }

//     for (let i = 0; i < supervisorfiles.video.length; i++) {
//       formData.append("supervisor_video", supervisorfiles.video[i]);
//     }
//   };

//   const handleSupervisorImage = (e) => {
//     for (let i = 0; i < e.target.files.length; i++) {
//       console.log(e.target.files[i].name);
//       setSupervisorImage((prev) => [...prev, e.target.files[i].name]);
//     }
//     setSuperVisorFiles({ ...supervisorfiles, image: [...e.target.files] });
//   };

//   const handleSupervisorVideo = (e) => {
//     for (let i = 0; i < e.target.files.length; i++) {
//       console.log(e.target.files[i].name);
//       setSupervisorVideos((prev) => [...prev, e.target.files[i].name]);
//     }
//     setSuperVisorFiles({ ...supervisorfiles, video: [...e.target.files] });
//   };

//   const handleImage = (e) => {
//     for (let i = 0; i < e.target.files.length; i++) {
//       console.log(e.target.files[i].name);
//       setFile((prev) => [...prev, e.target.files[i].name]);
//     }
//     setFiles({ ...supervisorfiles, image: [...e.target.files] });
//   };
//   const handleVideos = (e) => {
//     for (let i = 0; i < e.target.files.length; i++) {
//       setVideos((prev) => [...prev, e.target.files[i].name]);
//     }
//     setFiles({ ...files, video: [...e.target.files] });
//   };

//   return (
//     <div className="create-daily-data">
//       <form onSubmit={dailyDataSubmit}>
//         <h4> Create Daily Data</h4>
//         <div className="farms">
//         <div className="single-inp">
//                 <img src={idea_farm} alt="" className="react-select-img" />
//                 <span className="vertical-line select"></span>

//                 <Select
//                   // defaultValue={hatcheries[0]}
//                   name="idea_farms"
//                   options={ideaFarm}
//                   className="idea_farm_select"
//                   isSearchable
//                   // isMulti
//                   onChange={setIdeaValue}
//                   placeholder="Select Idea Farm"
//                   styles = {style}
//                 />
//               </div>
//               <div className="single-inp">
//               <img src={satellite_farm} alt="" className="react-select-img" />
//             <span className="vertical-line select"></span>
//               <Select
//                 name="satellite_farms"
//                 options={satelliteFarm}
//                 isSearchable
//                 // isMulti
//                 onChange={setSatelliteValue}
//                 className="idea_farm_select"
//                 placeholder="Select Satellite Farm"
//                 styles={style}
//               />
//               </div>
//               <div className="single-inp">
//               <img src={batch_icon} alt="" className="react-select-img" />
//             <span className="vertical-line select"></span>
//               <Select
//                 name="satellite_farms"
//                 options={batch}
//                 isSearchable
//                 // isMulti
//                 onChange={setBatchValue}
//                 className="idea_farm_select"
//                 placeholder="Select Satellite Farm"
//                 styles={style}
//               />
//               </div>
//         </div>
//         <div className="second-container">
//           <p className="title">Mortality</p>
//           <div className="mortality-container">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Mortality No's"
//                 name="mortality_count"
//               />
//             </div>
//             <div>
//               <select name="mortality_reason">
//                 <option>Mortality Reason</option>
//               </select>
//             </div>
//             <div className="daily-data-image-upload">
//               {file.length == 0 ? (
//                 <>
//                   <BsImage />
//                   <p>Images Upload</p>
//                 </>
//               ) : (
//                 <p id="no-image">{file}</p>
//               )}

//               <input type="file" multiple="multiple" onChange={handleImage} />
//             </div>
//             <div className="daily-data-image-upload">
//               {videos.length == 0 ? (
//                 <>
//                   <BsImage />
//                   <p>Videos Upload</p>
//                 </>
//               ) : (
//                 <p id="no-image">{videos}</p>
//               )}

//               <input type="file" multiple="multiple" onChange={handleVideos} />
//             </div>
//           </div>
//         </div>
//         <div className="third-container">
//           <div>
//             <p className="title">Feed</p>
//             <div className="box-grid">
//               <div>
//                 <select>
//                   <option>Feed bag Type</option>
//                 </select>
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   name="feed_bag_used"
//                   placeholder="Feed bags used"
//                 />
//               </div>
//             </div>
//           </div>
//           <div>
//             <div>
//               <p className="title">Weight</p>
//               <div className="box-grid-weight">
//                 <div>
//                   <input type="text" name="weight" placeholder="Weight" />
//                 </div>
//                 <div>
//                   <select name="unit">
//                     <option>Kg</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="fourth-container">
//           <p className="title">Vaccination Data</p>
//           <div className="vaccination-container">
//             <div>Vaccination </div>
//             <div>
//               <input type="radio" id="yes" name="vaccination" />
//               <label for="yes">Yes</label>
//               <input type="radio" id="no" name="vaccination" />
//               <label for="no">No</label>
//             </div>
//             <div>
//               <select name="vaccination_type">
//                 <option>Vaccination Type</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="last-container">
//           <p className="title">Supervisor Visit</p>
//           <div className="supervisor-container">
//             <div>
//               <textarea
//                 rows="6"
//                 cols="40"
//                 placeholder="Comments"
//                 name="comments"
//               />
//             </div>
//             <div className="daily-data-image-upload supervisor">
//               {supervisorImage.length == 0 ? (
//                 <>
//                   <BsImage />
//                   <p>Images Upload</p>
//                 </>
//               ) : (
//                 <p id="no-image">{supervisorImage}</p>
//               )}

//               <input
//                 type="file"
//                 multiple="multiple"
//                 onChange={handleSupervisorImage}
//               />
//             </div>
//             <div className="daily-data-image-upload supervisor">
//               {supervisorVideos.length == 0 ? (
//                 <>
//                   <BsImage />
//                   <p>Videos Upload</p>
//                 </>
//               ) : (
//                 <p id="no-image">{supervisorVideos}</p>
//               )}

//               <input
//                 type="file"
//                 multiple="multiple"
//                 onChange={handleSupervisorVideo}
//               />
//             </div>
//             <div className="daily-data-btn">
//               <button type="submit">Submit</button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateDailyData;
