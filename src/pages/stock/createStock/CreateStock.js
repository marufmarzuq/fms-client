import React, { useEffect, useContext } from "react";
import "./CreateStock.css";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useState } from "react";
import search from "../../../assets/search.svg";
import axios from "axios";
import config from "../../../config.json";
import idea_farm from "../../../assets/assets/idea_farm.svg";
import satellite_farm from "../../../assets/assets/satellite_farm.svg";
import userIcon from "../../../assets/assets/userIcon.svg";
import Loading from "../../../components/loading/Loading";
import swal from "sweetalert";

const CreateStock = () => {
  const [outboundToggle, setOutboundToggle] = useState(false);
  const [ideaValue, setIdeaValue] = useState("");
  const [satelliteFarm, setSatelliteFarm] = useState([]);
  const [batch,setBatch] = useState([])
  const [batchValue,setBatchValue] = useState("")
  const [satelliteValue, setSatelliteValue] = useState("");
  const [category, setCategory] = useState([]);
  const [vendorDetail, setVendorDetail] = useState({});
  const [billNumber, setBillNumber] = useState();
  const [transportDetail, setTransportDetail] = useState({});
  const [poNumber, setPONumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockSubCategory, setStockSubCategory] = useState([]);
  const [productId,setProductId] = useState("")
  const [stockType,setStockType] = useState("OUTBOUND")
  const [allproduct,setAllProducts] = useState([])


  let [idea_farms, setIdeaFarm] = useState([]);
  useEffect(() => {
    getIdeaFarm();
    getAllProducts()
  }, []);

  useEffect(() => {
    if(ideaValue){
    getSatelliteFarm();
    }
  }, [ideaValue]);

  useEffect(() => {
    if(satelliteValue){
   getBatch()
    }
  },[satelliteValue])

  useEffect(() => {
    if(batchValue){
    getProduct()
    }
  },[batchValue])

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
  const getIdeaFarm = async () => {
    const res = await axios.get(`${url}/show-idea-farms`);
    setIdeaFarm(res.data.data);
  };

 
  const getSatelliteFarm = async () => {
    let value = ideaValue.value;
    const res = await axios.get(`${url}/show-satellite-farms?id='${value}'`);
    setSatelliteFarm(res.data.data);
  };

  const getAllProducts = async () => {
    const res = await axios.get(`${url}/get-all-products`);
    console.log(res.data.data)
    setAllProducts(res.data.data);
  };

  const getBatch = async (e) => {
    let value = satelliteValue.value;
    const res = await axios.get(
      `${url}/show-batches?satellite_farm_id=${value}`
    );
    console.log(res.data.data);
    setBatch(res.data.data);
  };

  const getProduct = async (e) => {
    let value = batchValue.product_id
    setProductId(value)
    // const res = await axios.get(
    //   `${url}/show-batches?satellite_farm_id=${value}`
    // );
    // console.log(res.data.data);
    // setBatch(res.data.data);
  }
  console.log(stockType)


  const handleoutboundToggle = (type) => {
    console.log("hii")
    if(type == "ongoing"){
      setStockType("OUTBOUND")
    }else {
      setStockType("INBOUND")
    }
  };

  const addPONumber = async () => {
    if(poNumber) {
    setLoading(true);
    const res = await axios.get(`${url}/get-po-detail?po_number=${poNumber} `);
    setLoading(false);
    console.log(res.data);
    setVendorDetail(res.data);
    }
  };

  const addBillNumber = async () => {
    if(billNumber) {
    setLoading(true);

    const res = await axios.get(
      `${url}/get-po-detail?bill_number=${billNumber} `
    );
    setLoading(false);
    console.log(res.data);
    setTransportDetail(res.data);
    }
  };

 
  const handleCategory = async (e) => {
    let value = e.target.value
    const res = await axios.get(
      `${url}/get-stock-sub-category?category=${value}&product_id=${productId}`
    );
    console.log("sub_category",res.data.data)
    setStockSubCategory(res.data.data);
  };
console.log(ideaValue,satelliteValue)
  const stockSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true)
    let data = {};
    for (let i = 0; i < e.target.length; i++) {
      data[e.target[i].name] = e.target[i].value;
    }
    data.transport_date = new Date().toLocaleDateString()
    data.stock_type = stockType
    if(stockType == "OUTBOUND"){
      data.from_name = ideaValue.value
      data.to_name = satelliteValue.value
    }else {
      data.to_name = ideaValue.value
    }
   
    console.log(data)
    const res = await axios.post(`${url}/add-stock`,data)
    if(res.data.status === true){
       setLoading(false)
       swal(`Stock data added successfully`, "", "success", {
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
      <form onSubmit={stockSubmitForm}>
        <div className="create_stock">
          <div className="create_stock_header">
          <div className="stock-title">
            <span>Create Stock</span>
          </div>

            <div className="sty-toggle-container">
              <div
                className="sty-toggle"
                onClick={() => {
                  outboundToggle && handleoutboundToggle("ongoing");
                  setOutboundToggle(false);
                }}
              >
                Outbound
              </div>
              <div
                className="sty-toggle"
                onClick={() => {
                  !outboundToggle && handleoutboundToggle("complete");
                  setOutboundToggle(true);
                }}
              >
                Inbound
              </div>
              <div className={`sty-toggle-bg ${outboundToggle}`}></div>
            </div>
            {/* <div></div> */}
          </div>
          <div className="labelled_inputs">
            <label htmlFor="idea_farms">From</label>
            {!outboundToggle ? (
              <div className="single-inp">
                <img src={idea_farm} alt="" className="react-select-img" />
                <span className="vertical-line select"></span>

                <Select
                  // defaultValue={hatcheries[0]}
                  name="idea_farms"
                  options={idea_farms}
                  className="idea_farm_select"
                  isSearchable
                  // isMulti
                  onChange={setIdeaValue}
                  placeholder="Select Idea Farm"
                  styles={style}
                />
              </div>
            ) : (
              <div className="single-inp">
                <img src={userIcon} alt="" className="input-vendor-img" />
                <span className="vertical-line vendor"></span>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Enter Vendor Name"
                  className="vendor_input"
                />
              </div>
            )}
          </div>
          <div className="labelled_inputs">
            <label htmlFor="satellite_farms">To</label>

            {!outboundToggle ? (
              <div className="single-inp">
                <img src={satellite_farm} alt="" className="react-select-img" />
                <span className="vertical-line select"></span>
                <Select
                  name="satellite_farms"
                  options={satelliteFarm}
                  isSearchable
                  onChange = {setSatelliteValue}
                  // isMulti
                  className="idea_farm_select"
                  placeholder="Select Satellite Farm"
                  styles={style}
                />
              </div>
            ) : (
              <div className="single-inp">
                <img src={idea_farm} alt="" className="react-select-img" />
                <span className="vertical-line select"></span>
                <Select
                  // defaultValue={hatcheries[0]}
                  name="idea_farms"
                  options={idea_farms}
                  className="idea_farm_select"
                  cacheOptions
                  isSearchable
                  // isMulti
                  defaultOptions
                  placeholder="Choose Idea Farm"
                  onChange={setIdeaValue}
                  styles={style}
                />
              </div>
            )}
          </div>
          {!outboundToggle ? (
            <div className="labelled_inputs batch">
            <div className="single-inp">
                <img src={idea_farm} alt="" className="react-select-img" />
                <span className="vertical-line select"></span>
                <Select
                  // defaultValue={hatcheries[0]}
                  name="batch"
                  options={batch}
                  className="idea_farm_select"
                  isSearchable
                  // isMulti
                  placeholder="Choose Batch"
                  onChange={setBatchValue}
                  styles={style}
                />
              </div>
            </div>
          ):(
            <div className="labelled_inputs batch">
            <div className="single-inp">
                <img src={idea_farm} alt="" className="react-select-img" />
                <span className="vertical-line select"></span>
                <select   className="vendor_input_select" name = "" onChange={(e) => setProductId(e.target.value)} required>
                  <option>Select Product</option>
                  {
                    allproduct.map((ele) => (
                      <option value = {ele.id}>{ele.product_sub_category}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          )
          }
          <h4 className="batch-subheading">Product Details</h4>
          {/* <Select
                // defaultValue={hatcheries[0]}
                name="idea_farms"
                options={idea_farms}
                className="stock_category"
                cacheOptions
                isSearchable
                // isMulti
                defaultOptions
                placeholder="Choose Idea Farm"
                onChange={setIdeaValue}
                styles = {style}
              /> */}
        <div className="product_details_stock">
          <select name="category" className="stock_category" onChange={handleCategory} required>
          <option value="">Select Category</option>
            <option value="feed_bag">Feed bag</option>
            <option value="Coal">Coal</option>
            <option value="Others">Others</option>
          </select>
          <select name="stock_id" name = "stock_id" className="stock_sub_category" required>
          <option value="">Select sub Category</option>
           {
            stockSubCategory.map((ele) => (
              <option value={ele.id}>{ele.sub_category}</option>
            ))
           }
          </select>
          <div className="quantity_box_with_unit">
            <input
              type="number"
              name="feed_quantity"
              id="quantity_box_with_unit_quant"
              placeholder="Quantity"
              required
            />
            <select
              list="units"
              name="feed_unit"
              className="quantity_box_with_unit_unit"
              placeholder="Kg"
              required
            >
              <option>Kg</option>
              <option>Box</option>
              <option>No</option>
            </select>
          </div>
          <input
            type="number"
            name="stock_cost"
            placeholder="cost"
            className="stock_product_cost"
            required
          />
          </div>
           {/* <select name="category" className="stock_category" onChange={handleCategory}>
          <option value="">Select Category</option>
            
            <option value="others">Others</option>
          </select> */}
          {/* <input type = "text" value = "Feed Bag" className="stock_category" readOnly />
          <select name="stock_id" name = "stock_id" className="stock_sub_category">
          <option value="">Select sub Category</option>
           {
            stockSubCategory.map((ele) => (
              <option value={ele.id}>{ele.sub_category}</option>
            ))
           }
          </select>
          <div className="quantity_box_with_unit">
            <input
              type="number"
              name="feed_quantity"
              id="quantity_box_with_unit_quant"
              placeholder="Quantity"
              required
            />
            <select
              list="units"
              name="feed_unit"
              className="quantity_box_with_unit_unit"
              placeholder="Kg"
              required
            >
              <option>Kg</option>
              <option>Box</option>
              <option>No</option>
            </select>
          </div>
          <input
            type="number"
            name="stock_cost"
            placeholder="cost"
            className="stock_product_cost"
            required
          /> */}
          <div className="po_datalist_container search">
            <img src={search} alt="" onClick={addPONumber} />
            <input
              placeholder="Search PO Number"
              className="po_datalist"
              name="po_number"
              onChange={(e) => setPONumber(e.target.value)}
              required
            />
          </div>
          <input
            className="po_towards_name"
            name="po_name"
            placeholder="Vendor Name"
            value={vendorDetail.vendor_name}
            type="text"
            required
            readOnly
          />
          <input
            className="po_towards_details"
            name="po_description"
            placeholder="Description"
            type="text"
            value={vendorDetail.description}
            required
            readOnly
          />
          <input
            className="po_towards_cost"
            name="po_cost"
            placeholder="Cost"
            type="number"
            value={vendorDetail.cost}
            required
            readOnly
          />
      
          <h4 className="transport-container">Transport Details</h4>
          <div className="po_datalist_container search">
            <img src={search} alt="" onClick={addBillNumber} />
            <input
              placeholder="Search Bill Number"
              className="po_datalist"
              name="transport_bill_number"
              onChange={(e) => setBillNumber(e.target.value)}
              required
            />
          </div>
          <input
            className="po_towards_name"
            name="transport_name"
            placeholder="Vendor Name"
            type="text"
            value={transportDetail.vendor_name}
            required
            readOnly
          />
          <input
            className="po_towards_details"
            name="transport_description"
            placeholder="Description"
            type="text"
            value={transportDetail.description}
            required
            readOnly
          />
          <input
            className="po_towards_cost"
            name="transport_cost"
            placeholder="Cost"
            type="number"
            value={transportDetail.cost}
            required
            readOnly
          />
          <div className="btn_wrapper">
            <button type="submit" className="create_stock_submit_btn">
              Submit
            </button>
          </div>
        </div>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default CreateStock;
