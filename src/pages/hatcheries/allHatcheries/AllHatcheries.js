import React, { useEffect } from "react";
import "./AllHatcheries.css";
import { useState } from "react";
import Table from "../../../components/table/table";
import axios from "axios";
import  config from "../../../config.json";
import AllHatcheriesHead from "./components/AllHatcheriesHead";

const AllHatcheries = () => {
  const [status, setStatus] = useState(0);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const getData = async () => {
    let url = `${config.server_url}/get-hatcheries`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    if (result) {
      setTableData(result.data.data.hatcheries);
      setTotalPages(result.data.data.totalPages);
      setTotalEntries(result.data.data.totalEntries);
    }
  };
  let rows = [
    {
      heading: "Hatchery Id",
      field: "id",
      type: "text",
      styles: { color: "#5CE476", width: "10%", fontSize: "0.9rem",justifyContent : "center" },
      header_styles: { color: "white", width: "10%",textAlign : "center"  },
    },
    {
      heading: "Name",
      field: "name",
      type: "text",
      styles: { color: "black", width: "15%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "15%", fontSize: "0.8rem",paddingLeft : "15px" },
    },
    {
      heading: "Hatchery POC",
      field: "poc",
      type: "text",
      styles: { color: "#6B13FF", width: "15%", fontSize: "0.9rem", fontWeight : 600 },
      header_styles: { color: "white", width: "15%", fontSize: "0.8rem" },
    },
    {
      heading: "Phone No",
      field: "phone",
      type: "text",
      styles: { color: "black", width: "15%", fontSize: "0.9rem", fontWeight : 600 },
      header_styles: { color: "white", width: "15%", fontSize: "0.8rem" },
    },
    {
      heading: "Address",
      field: "address",
      type: "text",
      styles: { color: "#1B00CC", width: "15%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "15%", fontSize: "0.8rem" },
    },
    {
      heading: "Capacity",
      field: "available_products",
      type: "arrayBox",
      styles: {width: "15%", fontSize: "0.9rem"},
      header_styles: { color: "white", width: "15%", fontSize: "0.8rem" },
    },
    {
      heading: "Score",
      field: "score",
      type: "text",
      styles: { color: "green", width: "15%", fontSize: "0.9rem",  justifyContent : "center"},
      header_styles: { color: "white", width: "15%", fontSize: "0.8rem",  textAlign : "center"}
    },
  ];

  useEffect(() => {
    getData();
  }, [pageSize,pageNumber]);

  return (
    <div className="all_hatcheries">
      <AllHatcheriesHead />
      <Table
        table_data={tableData}
        status={status}
        region={region}
        setStatus={setStatus}
        setRegion={setRegion}
        filters={filters}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        setTotalPages={setTotalPages}
        getData={getData}
        rows={rows}
        totalEntries = {totalEntries}
      />
    </div>
  );
};

export default AllHatcheries;
