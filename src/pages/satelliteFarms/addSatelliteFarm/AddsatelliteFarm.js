


import React from 'react'
import "./add_satellite_farm.css"
import AddSatelliteFarmRight from './components/add_satellite_farm_right'
import AddSatelliteFormLeft from './components/add_satellite_form_left'
const AddSatelliteFarm = () => {
  return (
    <div className='add_satellite_farm_container'>
      <h3 className = "add_satellite_farm_title">Onbaord Satellite Farm</h3>
        <AddSatelliteFormLeft/>
        <AddSatelliteFarmRight/>
    </div>
  )
}

export default AddSatelliteFarm