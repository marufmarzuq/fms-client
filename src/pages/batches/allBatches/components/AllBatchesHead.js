


import React from 'react'
import "./AllBatchesHead.css"

const AllBatchesHead = ({headerToggle,setHeaderToggle}) => {
    const handleHeaderToggle = (type) => {
        console.log(type);
      };
      const handleTotalFarmsToggle = (type) => {
        console.log(type);
      };
  return (
    <div className="all_batches_header">
        <h3 className="all_batches_title" >All Batches</h3>

        {/* toggle code startes here  //////////////////////////////////////*/}
        <div className="sty-toggle-container">
          <div
            className="sty-toggle"
            onClick={() => {
              headerToggle && handleHeaderToggle("ongoing");
              setHeaderToggle(false);
            }}
          >
            Ongoing
          </div>
          <div
            className="sty-toggle"
            onClick={() => {
              !headerToggle && handleHeaderToggle("complete");
              setHeaderToggle(true);
            }}
          >
            Completed
          </div>
          <div className={`sty-toggle-bg ${headerToggle}`}></div>
        </div>
        {/* toggler code ends here ////////////////////////////////////////////////////// */}
        <div className="state_dropdown_batches">
          <label>Select Region </label>
          <select className="region_select_batches">
            <option value="all">All</option>
          </select>
        </div>
      </div>
  )
}

export default AllBatchesHead