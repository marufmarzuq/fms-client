
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import config from "../../../../config.json";
import addIcon from "../../../../assets/addIcon.svg";

const FeedBag = ({
  setFeedBagItem,
  feedBagItem,
  id,
  allStocks,
  productId,
  setStockId,
  allProducts,
  setProductId,
  stockId,
  stockSubCategory,
  setFeedBagProduct,
  feedBagProduct,
  setFeedBagError,
  feedbag,
  setStockSubCategory,
  feedId,
  setFeedId
}) => {

  const [feedid,setFeedid] = useState("")

  const handleMultipleFeedBag = (e) => {
    e.preventDefault();
    if(feedBagItem.length < feedbag){
    setFeedBagItem([...feedBagItem, feedBagItem.length]);
    setFeedBagError("")
    }else {
      setFeedBagError(`Only ${feedbag} feedbag allowed`)
    }
  };


  let url = config.server_url;
let last = feedBagItem[feedBagItem.length-1]

  const itemRemoverHandler = (e, id) => {
      e.preventDefault();
      const index = feedBagItem.indexOf(id);
      feedBagItem.splice(index, 1);
      setFeedBagItem([...feedBagItem]);
    setFeedBagError("")
  };


  const handleSubCategory = (e) => {
    let val = e.target.value;
    console.log(val)
    let filter = stockSubCategory.filter((ele) => ele.sub_category == val);
    let id = filter[0].id;
    setFeedid(id)
    setFeedId([...feedId,id]);
  };

  return (
    <div className="feed-data-grid">
      <div className="single-inp">
        <input type="text" value="Feed Bag" className="input-no-img" readOnly />
      </div>
      <div className="single-inp">
        <select
          className="input-no-img"
          onChange={handleSubCategory}
          name="feed_sub_category"
          required
        >
          <option className="no-option" value="">
            Select sub Category
          </option>
          {stockSubCategory.map((ele) => (
          <option value={ele.sub_category}>{ele.sub_category}</option>
        ))}
        </select>
      </div>

      <input type = "text" value = {feedid ? feedid : null} name = "feed_id" hidden />

      <div className="quantity-flex">
        <div className="single-inp">
          <input
            className="input-no-img no-gap"
            name="feed_quantity"
            placeholder="Quantity"

            required

          />
        </div>
        <div className="single-inp-no-gap">
          <select className="input-no-img unit-gap" name="feed_unit" required>
            <option>Kg</option>
            <option>Box</option>
            <option>Nos</option>
          </select>
        </div>
      </div>



      <div className="single-inp">
        <input
          className="input-no-img"
          type="text"
          name="feed_cost"
          placeholder="Cost"
          required
        />
      </div>
{
  id == last ? (
    <div className="addIcon">
                    <img src={addIcon} onClick={handleMultipleFeedBag} alt="" />
                  </div>
  ):(
    <div> </div>
  )
}
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

export default FeedBag;

