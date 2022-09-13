import React, { useState } from "react";
import TableHeader from "./components/table_header";
import "./basicTable.css";
// import table_data from "./sample_batch_data.json";
import TableRow from "./components/table_row";



const BasicTable = ({
  table_data,
  rows,
  table_heading
}) => {
  return (
    <>
    {table_heading && <h2 style = {{...table_heading.styles}}>{table_heading.title}</h2>}
    <div className="table_container">
      <TableHeader rows = {rows}/>
      <div className="table_body">
        {table_data.length ? table_data.map((ele) => (
          <TableRow content={ele} rows = {rows} />
        )) : 
        <div style={{display : "flex" , height :"4vh" , justifyContent : "center", alignItems : "center" , fontWeight : 700, fontSize : "1rem"}}>No data to display</div>
        }
      </div>
    </div>
    </>
  );
};

export default BasicTable;
