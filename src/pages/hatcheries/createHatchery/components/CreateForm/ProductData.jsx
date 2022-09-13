import React,{useState} from "react";
import { MdDelete } from "react-icons/md";
import addIcon from '../CreateForm/assets/addIcon.svg';

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
            <option value="">Select Product</option>
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
            type="text"
            placeholder="Capacity"
            className="input-no-img"
            onChange={(e) => handleQuantity(e)}
            id="capacity"
            name="Capacity"
            required
          />
        </div>
     
        <div onClick={(e) =>itemRemoverHandler(e,id)} className="delete-icon">
          <MdDelete />
        </div>
      </div>
      {/* {error && key == { key } && <p className="error">{error}</p>} */}
    </>
  );
};

export default ProductData;
