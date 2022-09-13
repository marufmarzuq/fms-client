import React, { useContext, useEffect, useState } from "react";
import config from "../../../config.json";
import axios from "axios";
import "./CreateSales.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import idea_farm from "../../../assets/assets/idea_farm.svg";
import satellite_farm from "../../../assets/assets/satellite_farm.svg";
import batch_icon from "../../../assets/assets/batch.svg";
import Loading from "../../../components/loading/Loading";
import search from "../../../assets/search.svg";
import swal from "sweetalert";
import { IdeaContext } from "../../../components/contexts/IdeaFarm";

const CreateSales = () => {
  // const [ideaFarm, setIdeaFarm] = useState([]);
  const [satelliteFarm, setSatelliteFarm] = useState([]);
  const [batch, setBatch] = useState([]);
  const [ideaFarmId, setIdeaFarmId] = useState("");
  const [satelliteFarmId, setSatelliteFarmId] = useState("");
  const [ideaValue, setIdeaValue] = useState("");
  const [satelliteValue, setSatelliteValue] = useState("");
  const [batchValue, setBatchValue] = useState("");
  const [productQuantity, setProductQuantity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState();
  const [perQuantity, setPerQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState("");
  const { ideaFarm, setIdeaFarm } = useContext(IdeaContext);
  const [showProduct,setShowProduct] = useState(false)

  // useEffect(() => {
  //   getIdeaFarm();
  // }, []);
  useEffect(() => {
    if(ideaValue) {
    handleSatelliteFarm();
    }
  }, [ideaValue]);

  useEffect(() => {
    if(satelliteValue) {

    
    handleBatches();
    }
  }, [satelliteValue]);

  useEffect(() => {
    if(batchValue) {
      handleProduct();
    }
  }, [batchValue]);

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
  // const getIdeaFarm = async () => {
  //   const res = await axios.get(`${url}/show-idea-farms`);
  //   setIdeaFarm(res.data.data);
  // };

  const handleSatelliteFarm = async () => {
    let value = ideaValue.value;
    const res = await axios.get(`${url}/show-satellite-farms?id='${value}'`);
    setSatelliteFarm(res.data.data);
  };

  const handleBatches = async (e) => {
    let value = satelliteValue.value;
    const res = await axios.get(
      `${url}/show-batches?satellite_farm_id=${value}`
    );
    console.log(res.data.data);
    setBatch(res.data.data);
  };

  const handleProduct = async () => {
    let value = batchValue.value;
    const res = await axios.get(
      `${url}/get-product-quantity?batch_id=${value}`
    );
    console.log("product details",res.data.data);
    setProductQuantity(res.data.data[0]);
    setShowProduct(true)
  };

  console.log(productQuantity);

  const handleTotalPrice = (e) => {
    setPerQuantity(e.target.value);
    let total = Number(quantity) * Number(e.target.value);
    console.log(total);
    setTotalPrice(total);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
    let total = Number(e.target.value) * Number(perQuantity);
    console.log(total);
    setTotalPrice(total);
  };

  const saleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {};
    for (let i = 0; i < e.target.length; i++) {
      data[e.target[i].name] = e.target[i].value;
    }
    data.product_id = productQuantity.id;
    data.batch_id = batchValue.value;
    data.sale_date = new Date().toLocaleDateString();
    const res = await axios.post(`${url}/create-sale`, data);
    if(res.data.status == true) {
      setLoading(false);
      console.log(res.data.data);
      swal(`Sale added successfully`, "", "success", {
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
      <form className="create-sales" onSubmit={saleFormSubmit}>
        <div>
          <span>Sales</span>
          <div className="create-sales-flex">
            <div className="single-inp">
              <img src={idea_farm} alt="" className="react-select-img" />
              <span className="vertical-line select"></span>
              <Select
                name="idea_farm_id"
                options={ideaFarm}
                className="idea_farm_select"
                isSearchable
                // isMulti
                onChange={setIdeaValue}
                placeholder="Select Idea Farm"
                styles={style}
              />
            </div>
            <div className="single-inp">
              <img src={satellite_farm} alt="" className="react-select-img" />
              <span className="vertical-line select"></span>
              <Select
                name="satellite_farm_id"
                options={satelliteFarm}
                className="idea_farm_select"
                isSearchable
                // isMulti
                onChange={setSatelliteValue}
                placeholder="Select Satellite Farm"
                styles={style}
              />
            </div>
            <div className="single-inp">
              <img src={batch_icon} alt="" className="react-select-img" />
              <span className="vertical-line select"></span>
              <Select
                name="idea_farm_id"
                options={batch}
                className="idea_farm_select"
                isSearchable
                // isMulti
                onChange={setBatchValue}
                placeholder="Select Batch"
                styles={style}
              />
            </div>
            <div className="single-inp">
              {/* <img src={search} alt="" className="react-select-img" /> */}
              {/* <span className="vertical-line select"></span> */}
              <input
                type="text"
                name="so_number"
                className="input-no-img"
                placeholder="Enter SO number"
                required
              />
            </div>
          </div>
         
            
          <div className="product-details">
            <p className="sub-heading">Product Price Details</p>
            <p className="horizontal-line"></p>
            {
            showProduct && (
            <div className="product-sales-grid">
              <div className="product-image">
                <img src = "https://www.aqai.in/product-images/400x400.jpg/430722000003742408/1100x1100" alt="" />
              </div>
              <div className="product-input-details">
                <div className="single-inp half">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input-no-img"
                    value={productQuantity.product_sub_category}
                    readOnly
                  />
                </div>
                <div className="single-inp half">
                  <input
                    type="text"
                    placeholder="Stock Quantity"
                    className="input-no-img"
                    value={
                      productQuantity
                        ? productQuantity.current_quantity
                        : "null"
                    }
                    readOnly
                  />
                </div>
                <div className="single-inp ">
                  <input
                    type="number"
                    placeholder="Selling Quantity Price"
                    className="input-no-img"
                    name="sale_price"
                    min ="1"
                    onChange={(e) => handleQuantity(e)}
                    required
                  />
                </div>
                <div className="single-inp">
                  <input
                    type="number"
                    placeholder="Per Quantity Price"
                    className="input-no-img"
                    name="sale_quantity"
                    min ="1"
                    onChange={(e) => handleTotalPrice(e)}
                    required
                  />
                </div>
                <div className="single-inp">
                  <input
                    type="number"
                    placeholder="Total Price"
                    className="input-no-img"
                    name="total_price"
                    value={totalPrice ? totalPrice : ""}
                    readOnly
                    required
                  />
                </div>
              </div>
            </div>
            )
          }
            <div className="sale-btn">
              <button>Submit</button>
            </div>
          </div>
        </div>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default CreateSales;
