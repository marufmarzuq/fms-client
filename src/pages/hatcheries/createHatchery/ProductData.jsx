import React,{useState} from "react";
import { MdDelete } from "react-icons/md";
import addIcon from '../../../assets/addIcon.svg';

const ProductData = ({
  products,
  id,
  items,
  setItems,
  setSelected,
  setQuantity,
  error,
  key,
  setProductDetail,
  selected,
  productDetail,
  setError,
  quantity,
  setAddBtn,
}) => {

  let last = items[items.length - 1]

  const handleMultipleProducts = (e) => {
    e.preventDefault();
    if (selected && quantity) {
      setError("");
      setItems([...items, items.length]);
      setSelected("");
      setQuantity("");
    } else if (selected && !quantity) {
      setQuantity("");
      setError("Please select the quantity");
    } else if (quantity && !selected) {
      setSelected("");
      setError("Please select the product");
    } else {
      setError("Please select the product");
    }
  };

  const itemRemoverHandler = (e, id) => {
    e.preventDefault();
    console.log(id)
    const index = items.indexOf(id);
    items.splice(index, 1);
    setItems([...items]);
  
    setQuantity("something");
    setSelected("something");
  };

  const handleProducts = (e) => {
    const { name, value,selectedIndex } = e.target;
    setSelected(e.target.value);
   
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
   
  };

  return (
    <>
      <div className="product-grid-container" key={key}>
        <div className="single-inp">
          <select name="product" className="input-no-img" onChange={(e) => handleProducts(e)}>
            <option value="" selected disabled>Select Product</option>
            {products.map((elem) => (
              <>
                <option name={elem} value={elem}>
                  {elem}
                </option>
              </>
            ))}
          </select>
        </div>
        <div className="single-inp">
          <input
            type="number"
            placeholder="Capacity"
            className="input-no-img"
            onChange={(e) => handleQuantity(e)}
            id="capacity"
            name="capacity"
            required
          />
        </div>
     {
       id == last ? (
        <div className="addIcon">
                  <img src={addIcon} onClick={handleMultipleProducts} alt="" />
                </div>
       ):(
         <div> </div>
       )
     }
     {
       id == 0 ? (
<div></div>
       ):(
        <div onClick={(e) =>itemRemoverHandler(e,id)} className="delete-icon">
          <MdDelete />
        </div>
       )
     }
       
      </div>
    </>
  );
};

export default ProductData;
