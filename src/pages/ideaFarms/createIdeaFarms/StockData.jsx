import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import config from "../../../config.json";
import { useLocation } from "react-router";
import addIcon from "../../../assets/addIcon.svg";

const StockData = ({
  items,
  setItems,
  id,
  allStocks,
  productId,
  setStockId,
  allProducts,
  setProductId,
  stockId,
  stockSubCategory,
  setStockSubCategory
}) => {

let response;

  let url = config.server_url;
  const { pathname } = useLocation();
  const firstPath = pathname.split("/")[1];
  let last = items[items.length - 1];
const [stockItems,setStockItems] = useState([])
let [stockid,setstockid] = useState("")
  // const [otherStockId,setOtherStockId] = useState([])

  const handleMultipleProducts = (e) => {
    e.preventDefault();
    setItems([...items, items.length]);
  };
  const handleCategory = async (e) => {
    let value = e.target.value;
    console.log(value);
    const res = await axios.get(
      `${url}/get-stock-sub-category?category=${value}&product_id=${productId}`
    );
    console.log(res.data.data)
    setStockItems(res.data.data);
  };

  const handleProduct = (e) => {
    console.log(e.target.value);
    setProductId(e.target.value);
  };

  const handleSubCategory = (e) => {
    let val = e.target.value;
    let filter = stockSubCategory.filter((ele) => ele.sub_category == val);
    let id = filter[0].id;
    console.log(id)
    setStockId([...stockId, id]);
  };
const handleCoalCategory = async (e) => {
  let val = e.target.value
  console.log(val)
  const res = await axios.get(
    `${url}/get-stock-sub-category?category=${val}&product_id=${productId}`
  );
let id = res.data.data[0].id
console.log("id",id)
setstockid(id)
  setStockId([...stockId,id])
}
  const itemRemoverHandler = (e, id) => {
    e.preventDefault();
    const index = items.indexOf(id);
    items.splice(index, 1);
    setItems([...items]);
  };
  return (
    <div
      className={firstPath == "batches" ? "batch-data-grid" : "stock-data-grid"}
    >
      {firstPath == "idea-farm" && (
        <div className="single-inp">
          <select
            className="input-no-img"
            name="product"
            onChange={handleProduct}
            required
          >
            <option className="no-option" value="">
              Select Product
            </option>
            {allProducts.map((elem) => (
              <option value={elem.id}>{elem.product_sub_category}</option>
            ))}
          </select>
        </div>
      )}
      {firstPath != "batches" ? (
        <div className="single-inp">
          <select
            className="input-no-img"
            name="category"
            onChange={handleCategory}
            required
          >
            <option className="no-option" value="">
              Select Category
            </option>
            <option value="feed_bag">Feed Bag</option>
            <option value="Coal">Coal</option>
            <option value="Others">Others</option>
          </select>
        </div>
      ) : (
        <div className="single-inp">
          <select
            className="input-no-img"
            name="category"
            onChange={handleCoalCategory}
            required
          >
            <option className="no-option" value="">
              Select Category
            </option>
            <option value="Coal">Coal</option>
            <option value="Others">Others</option>
          </select>
        </div>
      )}
    

      {firstPath != "batches" && (
        <div className="single-inp">
          <select
            className="input-no-img"
            onChange={handleSubCategory}
            name="stock_sub_category"
            required
          >
            <option className="no-option" value="">
              Select sub Category
            </option>
            {stockItems.map((ele) => (
              <option value={ele.sub_category}>{ele.sub_category}</option>
            ))}
          </select>
        </div>
      )}
      {
        firstPath == "batches" && (
          <input type = "text" name = "stock_id" value = {stockid?stockid:"null"} hidden />
        )
      }

      <div className="quantity-flex">
        <div className="single-inp">
          <input
            className="input-no-img no-gap"
            name="stock_quantity"
            placeholder="Quantity"
            required
          />
        </div>
        <div className="single-inp-no-gap">
          <select className="input-no-img unit-gap" name="stock_unit" required>
            <option>Kg</option>
            <option>Box</option>
            <option>Nos</option>
          </select>
        </div>
      </div>
      {firstPath == "batches" && (
        <div className="single-inp">
          <input
            className="input-no-img"
            type="text"
            name="stock_cost"
            placeholder="Cost"
            required
          />
        </div>
      )}
      {id == last ? (
        <div className="addIcon" key={id}>
          <img src={addIcon} onClick={handleMultipleProducts} alt="" />
        </div>
      ) : (
        <div></div>
      )}
      {
        id == 0 ? (
          <div> </div>
        ):(
          <div onClick={(e) => itemRemoverHandler(e, id)} className="delete-icon">
        <MdDelete />
      </div>
        )
      }
      
    </div>
  );
};

export default StockData;
