import React, { useEffect, useState } from "react";
import "./CreateBatch.css";
import idea_farm from "../../../assets/assets/idea_farm.svg";
import satellite_farm from "../../../assets/assets/satellite_farm.svg";
import hatchery from "../../../assets/assets/hatchery.svg";
import config from "../../../config.json";
import axios from "axios";
import StockData from "../../ideaFarms/createIdeaFarms/StockData";
import addIcon from "../../../assets/addIcon.svg";
import Select from "react-select";
import { useLocation } from "react-router";
import userIcon from "../../../assets/userIcon.svg";
import swal from "sweetalert";
import search from "../../../assets/search.svg";
import Loading from "../../../components/loading/Loading";
import FeedBag from "./components/FeedBag";

const CreateBatch = () => {
  const [ideaFarm, setIdeaFarm] = useState([]);
  const [satelliteFarm, setSatelliteFarm] = useState([]);
  const [items, setItems] = useState([0]);
  const [feedBagItem, setFeedBagItem] = useState([0]);
  const [ideaFarmId, setIdeaFarmId] = useState("");
  const [hatcheries, setHatcheries] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [productId, setProductId] = useState("");
  const [poNumber, setPONumber] = useState();
  const [vendorDetail, setVendorDetail] = useState({});
  const [billNumber, setBillNumber] = useState();
  const [transportDetail, setTransportDetail] = useState({});
  const [ideaValue, setIdeaValue] = useState({});
  const [satelliteValue, setSatelliteValue] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockId, setStockId] = useState([]);
  const [product, setProduct] = useState([]);
  const [stockSubCategory, setStockSubCategory] = useState([]);
  const [feedBagProduct, setFeedBagProduct] = useState([]);
  const [feedBagError, setFeedBagError] = useState("");
  let [feedbag, setFeedBag] = useState();
  const [billError, setBillError] = useState("");
  const [poError, setPoError] = useState("");
  const [feedId, setFeedId] = useState([]);
  const [category,setCategory] = useState("feed_bag")
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


  useEffect(() => {
    getIdeaFarm();
    getAllProducts();
    getAllStocks();
  }, []);

  useEffect(() => {
    if (Object.keys(ideaValue).length !== 0) {
      handleSatelliteFarm();
      handleSupervisor();
    }
  }, [ideaValue]);

  const url = config.server_url;
  const getIdeaFarm = async () => {
    const res = await axios.get(`${url}/show-idea-farms`);
    setIdeaFarm(res.data.data);
  };

  const getAllProducts = async () => {
    const res = await axios.get(`${url}/get-all-products`);
    setAllProducts(res.data.data);
  };

  const getAllStocks = async () => {
    const res = await axios.get(`${url}/get-stock-category`);
    setAllStocks(res.data.data);
  };

  const handleProduct = async (e) => {
    let value = e.target.value;
    setProductId(value);
    let feed = "feed_bag"
    const res = await axios.get(
      `${url}/get-stock-sub-category?category=${feed}&product_id=${value}`
    );
    console.log(res.data.data);
    // setFeedBagError("")
    setStockSubCategory(res.data.data);
    setFeedBag(res.data.data.length);
    setFeedBagError("")
  };

  // Get Satellite When idea farm is selected
  const handleSatelliteFarm = async () => {
    let value = ideaValue.value;
    const res = await axios.get(`${url}/show-satellite-farms?id='${value}'`);
    setSatelliteFarm(res.data.data);

    // Get Hatcheries when idea farm is selected
    const response = await axios.get(
      `${url}/show-hatcheries?idea_farm_id='${value}'`
    );
    console.log(response.data.data);
    setHatcheries(response.data.data);
  };
  // Get Supervisor when idea farm is selected

  const handleSupervisor = async () => {
    let value = ideaValue.value;
    const res = await axios.get(`${url}/search-supervisor?id='${value}'`);
    setSupervisor(res.data.data);
  };

  const handleMultipleProducts = (e) => {
    e.preventDefault();
    setItems([...items, items.length]);
  };

  const handlePONumber = (e) => {
    setPONumber(e.target.value);
  };

  const addPONumber = async () => {
    if (poNumber) {
      setLoading(true);
      const res = await axios.get(
        `${url}/get-po-detail?po_number=${poNumber} `
      );
      setLoading(false);
      console.log(res.data);
      setVendorDetail(res.data);
      setPoError("");
    } else {
      setPoError("Please enter the PO number");
    }
  };

  const addBillNumber = async () => {
    if (billNumber) {
      setLoading(true);
      const res = await axios.get(
        `${url}/get-po-detail?bill_number=${billNumber} `
      );
      setLoading(false);
      console.log(res.data);
      setTransportDetail(res.data);
      setBillError("");
    } else {
      setBillError("Please enter the Transport Bill Number");
    }
  };

  const batchFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {};
    let formData = new FormData();
    for (let i = 0; i < e.target.length; i++) {
      let name = e.target[i].name;
      let value = e.target[i].value;
      formData.append(`${name}`, value);
      data[e.target[i].name] = e.target[i].value;
    }
    data.transport_date = new Date().toLocaleDateString();
    data.stock_id = stockId;
    formData.append("transport_date", new Date().toLocaleDateString());

    const res = await axios.post(`${url}/add-batch`, formData);
    if(res.data.status === true){
      setLoading(false);

      swal(`Batch added successfully`, "", "success", {
        closeOnClickOutside: false,
        className: "warning-swal",
      }).then((value) => {
        if (value) {
          window.location.reload();
        } else return;
      });
    }else {
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
      <form onSubmit={batchFormSubmit}>
        <div className="create-batch-page">
          <p id="batch-heading">Create Batch</p>
          <div className="create-batchForm">
            <div>
              <p className="sub-heading">Farm Details</p>
              <p className="horizontal-line"></p>
              <div className="batch-grid-flex">
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
                    required
                    styles={style}
                  />
                </div>
                <div className="single-inp">
                  <img
                    src={satellite_farm}
                    alt=""
                    className="react-select-img"
                  />
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
                    required
                  />
                </div>
                <div className="single-inp batch">
                  <img src={userIcon} alt="" className="react-select-img" />
                  <span className="vertical-line batch"></span>
                  <select name="supervisor_id" id="batch-supervisor" required>
                    <option value="">Select Supervisor</option>
                    {supervisor.length > 0 ? (
                      supervisor.map((elem) =>
                        elem[0] ? (
                          <>
                            <option value={elem[0].id}>{elem[0].name}</option>
                          </>
                        ) : (
                          <option></option>
                        )
                      )
                    ) : (
                      <option></option>
                    )}
                  </select>
                  {/* <Select
                  name="supervisor_id"
                  options={supervisor.map((ele) =>ele[0].label)}
                  className="idea_farm_select"
                  isSearchable
                  onChange={setSupervisorValue}
                  placeholder="Select Supervisor"
                  styles = {style}
                /> */}
                </div>
              </div>
              <div>
                <p className="sub-heading">Product Details</p>
                <p className="horizontal-line"></p>
                <div className="product-batch-flex">
                  <div className="single-inp">
                    <select
                      className="input-no-img"
                      required
                      name="product_id"
                      onChange={handleProduct}
                    >
                      <option>Select Category</option>
                      {allProducts.map((elem) => (
                        <option key={elem.id} value={elem.id}>
                          {elem.product_sub_category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="single-inp">
                    <input
                      className="input-no-img"
                      type="text"
                      name="product_quantity"
                      placeholder="Quantity No's"
                      required
                    />
                  </div>
                  <div className="single-inp">
                    <input
                      className="input-no-img"
                      type="text"
                      name="product_cost"
                      placeholder="Cost"
                      required
                    />
                  </div>
                </div>
                <div className="product-batch-flex-second">
                  <div className="single-inp">
                    <select
                      className="input-no-img"
                      required
                      name="hatchery_id"
                    >
                      <option>Select Hatchery Name</option>
                      {hatcheries.map((elem) => (
                        <option key={elem.id} value={elem.id}>
                          {elem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="single-inp ">
                    <input
                      className="input-no-img"
                      type="text"
                      name="po_number"
                      placeholder="Enter PO number"
                      required
                      onChange={(e) => handlePONumber(e)}
                    />
                    <img
                      onClick={addPONumber}
                      src={search}
                      alt=""
                      className="po-search"
                    />
                    {poError && <p className="error">{poError}</p>}
                  </div>
                  {/* <div className="hatchery-btn" >
                  <button>Submit</button>
                </div> */}
                  {/* <div className="single-check">
                    <input className="input-checkbox" type="checkbox" />
                    <label>Partial</label>
                  </div> */}
                </div>
                <div className="product-batch-flex">
                  <div className="single-inp">
                    <img src={hatchery} alt="" />
                    <span className="vertical-line"></span>
                    <input
                      type="text"
                      placeholder="Hatchery Name(PO)"
                      name="po_name"
                      value={vendorDetail.vendor_name}
                      readOnly
                      required
                    />
                  </div>
                  <div className="single-inp">
                    <input
                      className="input-no-img"
                      type="text"
                      name="po_description"
                      placeholder="Description"
                      value={vendorDetail.description}
                      readOnly
                      required
                    />
                  </div>
                  <div className="single-inp">
                    <input
                      className="input-no-img"
                      type="text"
                      name="po_cost"
                      placeholder="Cost"
                      value={vendorDetail.cost}
                      readOnly
                      required
                    />
                  </div>
                </div>
                <div>
                  <p className="sub-heading">Transport Details</p>
                  <p className="horizontal-line"></p>
                  <div className="product-batch-flex-second">
                    <div className="single-inp">
                      <input
                        className="input-no-img"
                        type="text"
                        name="bill_number"
                        placeholder="Enter Bill Number"
                        onChange={(e) => setBillNumber(e.target.value)}
                        required
                      />
                      <img
                        onClick={addBillNumber}
                        className="po-search"
                        src={search}
                        alt=""
                      />
                      {billError && <p className="error">{billError}</p>}
                    </div>
                    {/* <div className="single-check">
                      <input className="input-checkbox" type="checkbox" />
                      <label>Partial</label>
                    </div> */}
                  </div>
                  <div className="product-batch-flex-second transport">
                    <div className="single-inp">
                      <input
                        className="input-no-img"
                        type="text"
                        name="transport_name"
                        placeholder="Transport Name"
                        value={transportDetail.vendor_name}
                        readOnly
                        required
                      />
                    </div>
                    <div className="single-inp">
                      <input
                        className="input-no-img"
                        type="text"
                        name="transport_description"
                        placeholder="Description"
                        value={transportDetail.description}
                        readOnly
                        required
                      />
                    </div>
                    <div className="single-inp">
                      <input
                        className="input-no-img"
                        type="text"
                        name="transport_cost"
                        placeholder="Cost"
                        value={transportDetail.cost}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="sub-heading">Input Materials</p>
                  <p className="horizontal-line"></p>
                  <>
                    {items.map((elem) => (
                      <StockData
                        items={items}
                        id={elem}
                        key={elem}
                        allStocks={allStocks}
                        setItems={setItems}
                        productId={productId}
                        setStockId={setStockId}
                        stockId={stockId}
                        setStockSubCategory={setStockSubCategory}
                        stockSubCategory={stockSubCategory}
                      />
                    ))}
                  </>
                </div>
                <div>
                  <p className="sub-heading">Feedbag</p>
                  <p className="horizontal-line"></p>
                  <>
                    {feedBagItem.map((elem) => (
                      <FeedBag
                        feedBagItem={feedBagItem}
                        id={elem}
                        allStocks={allStocks}
                        setFeedBagItem={setFeedBagItem}
                        productId={productId}
                        setStockId={setStockId}
                        stockId={stockId}
                        stockSubCategory={stockSubCategory}
                        setFeedBagProduct={setFeedBagProduct}
                        feedBagProduct={feedBagProduct}
                        setFeedBagError={setFeedBagError}
                        feedbag={feedbag}
                        setStockSubCategory={setStockSubCategory}
                        feedId={feedId}
                        setFeedId={setFeedId}
                      />
                    ))}
                  </>
                  <div>
                    {feedBagError && <p className="error">{feedBagError}</p>}
                  </div>
                  {/* <div className="addIcon">
                    <img src={addIcon} onClick={handleMultipleFeedBag} alt="" />
                  </div> */}
                </div>
                <div className="idea-btn">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default CreateBatch;
