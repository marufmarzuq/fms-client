
import React from 'react'
import "./AllSatelliteFarmsHead.css"

const AllSatelliteFarmsHead = () => {

  return (
    <div className="all_batches_header">
        <h3 className="all_batches_title" >All Satellite Farms</h3>
        <div className="state_dropdown_batches">
          <label>Select Region </label>
          <select className="region_select_batches">
            <option value="all">All</option>
          </select>
        </div>
      </div>
  )
}

export default AllSatelliteFarmsHead