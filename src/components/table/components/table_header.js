


import React from 'react'
import "./table_header.css"
const TableHeader = ({rows}) => {
  return (
    <div className='table_header'>
       {rows.map(row => {
          row.styles["width"] = row.styles["width"] ? row.styles["width"] : `${100/+rows.length}%`
          return <div style={row.header_styles}>{row.heading}</div>
       }
       )} 
       
    </div>
  )
}

export default TableHeader