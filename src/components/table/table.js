import React, { useState } from "react";
import TableHeader from "./components/table_header";
import "./table.css";
// import table_data from "./sample_batch_data.json";
import TableRow from "./components/table_row";
import TableFooter from "./components/table_footer";
const Table = ({
  table_data,
  status,
  region,
  setStatus,
  setRegion,
  pageSize,
  setPageSize,
  pageNumber,
  totalPages,
  setPageNumber,
  setTotalPages,
  rows,
  getData,
  totalEntries
}) => {

console.log(rows)
  return (
    <div className="table_container">
      <TableHeader rows = {rows}/>
      <div className="table_body">
        {table_data.length ? table_data.map((ele) => (
          <TableRow content={ele} rows = {rows} />
        )) : 
        <div style={{display : "flex" , height :"4vh" , justifyContent : "center", alignItems : "center" , fontWeight : 700, fontSize : "1rem"}}>No data to display</div>
        }
      </div>
      <TableFooter
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        rows = {rows}
        getData = {getData}
        totalEntries = {totalEntries}
      />
    </div>
  );
};

export default Table;
