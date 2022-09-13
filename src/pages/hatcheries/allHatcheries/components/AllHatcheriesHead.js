
import React from 'react'
import "./AllHatcheriesHead.css"

const AllHatcheriesHead = () => {

  return (
    <div className="all_batches_header">
        <h3 className="all_batches_title" >All Hatcheries</h3>
        <div className="state_dropdown_batches">
          <label>Select Region </label>
          <select className="region_select_batches">
            <option value="all">All</option>
          </select>
        </div>
      </div>
  )
}

export default AllHatcheriesHead