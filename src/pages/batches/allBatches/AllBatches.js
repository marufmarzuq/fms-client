import React, { useEffect } from "react";
import "./AllBatches.css";
import { useState } from "react";
import AllBatchesHead from "./components/AllBatchesHead";
import Table from "../../../components/table/table";
import axios from "axios";
import config from "../../../config.json";

const AllBatches = () => {
  const [status, setStatus] = useState(0);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({ status: status });
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const getData = async () => {
    let url = `${config.server_url}/get-batches`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    console.log(result.data);
    setTableData(result.data.data.batches);
    setTotalPages(result.data.data.totalPages);
    setTotalEntries(result.data.data.totalEntries);
  };

  let rows = [
    {
      heading: "Batch Id",
      field: "id",
      type: "text",
      styles: { color: "#6BC5ED", width: "6%", fontSize: "0.9rem"},
      header_styles: { color: "white", width: "6%", textAlign : "center"  },
    },
    {
      heading: "Farm Name",
      field: "farm_name",
      type: "text",
      styles: { color: "#51BF66", width: "12%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "12%" },
    },
    {
      heading: "Farmer Name",
      field: "farm_owner",
      type: "text",
      styles: { color: "#6BC5ED", width: "8%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Product",
      color: "black",
      field: "product",
      type: "text",
      styles: { color: "black", width: "8%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Issued",
      color: "black",
      field: "inbound_quantity",
      type: "text",
      styles: { color: "black", width: "6%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "6%" },
    },
    {
      heading: "Current Stock",
      color: "#E6269C",
      field: "current_quantity",
      type: "text",
      styles: { color: "#E6269C", width: "6%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "6%" },
    },
    {
      heading: "Mortality",
      color: "#FA0000",
      field: "mortality",
      type: "text",
      styles: { color: "#FA0000", width: "6%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "6%" },
    },
    {
      heading: "Harvest By",
      color: "black",
      field: "harvest_by",
      type: "text",
      styles: { color: "black", width: "12%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "12%" },
    },
    {
      heading: "Mort.Trend",
      field: "mortality_trend",
      type: "trendline",
      styles: {width: "8%", fontSize: "0.9rem",justifySelf : "center" },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Feed Trend",
      field: "feed_trend",
      type: "trendline",
      styles: { width: "8%", fontSize: "0.9rem",justifySelf : "center" },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Status",
      field: "status",
      type: "text",
      styles: { color: "#6BC5ED", width: "10%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Score",
      color: "#6BC5ED",
      field: "score",
      type: "text",
      styles: { color: "#6BC5ED", width: "10%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "10%" },
    },
  ];

  useEffect(() => {
    getData();
  }, [pageSize,pageNumber]);

  return (
    <div className="all_batches">
      <AllBatchesHead
        headerToggle={headerToggle}
        setHeaderToggle={setHeaderToggle}
      />
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
        totalEntries={totalEntries}
      />
    </div>
  );
};

export default AllBatches;
