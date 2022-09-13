import React, { useEffect } from "react";
import "./DailyData.css";
import { useState } from "react";
import Table from "../../../components/table/table";
import axios from "axios";
import  config from "../../../config.json";
import DailyDataHead from "./components/DailyDataHead";

const DailyData = () => {
  const [status, setStatus] = useState(0);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const getData = async () => {
    let url = `${config.server_url}/get-daily-data`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    console.log(result.data);
    setTableData(result.data.data.daily_data);
    setTotalPages(result.data.data.totalPages);
    setTotalEntries(result.data.data.totalEntries);
  };

  let rows = [
    {
      heading: "Batch Id",
      field: "id",
      type: "text",
      styles: { color: "#46BC5C", width: "8%", fontSize: "0.9rem",fontWeight : 600 },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Satellite Farm",
      field: "satellite_farm_name",
      type: "text",
      styles: { color: "#EB008D", width: "15%", fontSize: "0.9rem",fontWeight : 600  },
      header_styles: { color: "white", width: "15%" },
    },
    {
      heading: "Farmer name",
      color: "black",
      field: "farmer_name",
      type: "text",
      styles: { color: "#1B00CC", width: "22%", fontSize: "0.9rem",fontWeight : 600  },
      header_styles: { color: "white", width: "22%" },
    },
    {
      heading: "Farm Address",
      color: "black",
      field: "address",
      type: "text",
      styles: { color: "black", width: "20%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "20%" },
    },
    {
      heading: "Farmer Phone",
      field: "farmer_phone",
      type: "text",
      styles: { color: "black", width: "10%", fontSize: "0.9rem",fontWeight : 600  },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Supervisor Name",
      field: "supervisor_name",
      type: "text",
      styles: { color: "#1B00CC", width: "15%", fontSize: "0.9rem",fontWeight : 600  },
      header_styles: { color: "white", width: "15%" },
    },
    {
      heading: "Supervisor Phone",
      field: "supervisor_phone",
      type: "text",
      styles: { color: "black", width: "10%", fontSize: "0.9rem",fontWeight : 600,paddingRight : "2%"  },
      header_styles: { color: "white", width: "10%",paddingRight : "2%" },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="all_daily_data">
      <DailyDataHead
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
        totalEntries = {totalEntries}
      />
    </div>
  );
};

export default DailyData;
