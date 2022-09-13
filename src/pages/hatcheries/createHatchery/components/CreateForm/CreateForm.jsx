import React, { useState } from "react";
import "./CreateForm.css";
import GoogleMaps from "../../../../components/map/GoogleMaps";
import ProductData from "./ProductData";
import hatchery from "../CreateForm/assets/hatchery.svg";
import addIcon from "../CreateForm/assets/addIcon.svg";
import HatcheryFarmHeader from "./HatcheryFarmHeader";

const CreateForm = () => {
  const [Landmark, setLandmark] = useState("");
  const [userCoordinates, setUserCoordinates] = useState({
    lat: "",
    lng: "",
  });

  const [addBtn, setAddBtn] = useState(false);
  const [products, setProducts] = useState(["Quails", "kadaknath", "Aseel"]);
  const [items, setItems] = useState([0]);
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState([]);
  const [videos, setVideos] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [files, setFiles] = useState({
    image: [],
    video: [],
  });

  const handleMultipleProducts = (e) => {
    e.preventDefault();
    console.log(selected,quantity)
    if(selected && quantity){
      setError("")
    setAddBtn(true);
    setItems([...items, items.length]);
    setSelected("")
    setQuantity("")
    }else if(selected && !quantity) {
      setQuantity("")
   setError("Please select the quantity")
    }else if(quantity && !selected){
     setSelected("")
      setError("Please select the product")
    }else {
      setError("Please select the product")
    }
  }; 


  const handleImage = (e) => {
    // setFile([...e.target.files[0]])
    setFiles({ ...files, image: [...e.target.files] });
  };
  // console.log(files.image[0].name)
  const handleVideos = (e) => {
    setFiles({ ...files, video: [...e.target.files] });
  };

  const hatcheryFormSubmit = (e) => {
    e.preventDefault();
    let obj = {};
    for (let i = 0; i < e.target.length - 1; i++) {
      obj[e.target[i].name] = e.target[i].value;
    }
    let available_products = { ...productDetail };
    let data = {};
    data.obj = obj;
    data.available_products = available_products;
    data.files = files;
    console.log(data);
  };

  return (
    <div className="hatchery-form">
      <div className="create-form">
        <form onSubmit={hatcheryFormSubmit}>
        <div className="hatchery-header">
        <h3>Onboard Hatchery</h3>
        <p className="title">Address Detail</p>
        </div>
          <div className="hatchery-detail">
            <HatcheryFarmHeader
              Landmark={Landmark}
              userCoordinates={userCoordinates}
            />
            <div>
              <div className="map-container">
                <div>
                  <p>UPLOAD IMAGE AND VIDEO</p>
                  <p className="horizontal-line"></p>
                  <div className="address-grid-container">
                    <div className="single-inp">
                      <div className="hatchery-img">
                        {file.length == 0 ? (
                          <>
                            <img src="" alt="" />
                            <p>Choose Images</p>
                          </>
                        ) : (
                          <>
                            <p className="file-name">{file} &nbsp;</p>
                          </>
                        )}

                        <input
                          type="file"
                          name="file"
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
                            <img src="" alt="" />
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <p className="add-product">ADD PRODUCT</p>
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
                  <div className="addIcon">
                    <img
                      src={addIcon}
                      onClick={handleMultipleProducts}
                      alt=""
                    />
                  </div>

                  <div className="hatchery-btn">
                    <button type="submit">Submit</button>
                  </div>
                </div>
                <div>
                  <GoogleMaps
                    setLandmark={setLandmark}
                    setUserCoordinates={setUserCoordinates}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
