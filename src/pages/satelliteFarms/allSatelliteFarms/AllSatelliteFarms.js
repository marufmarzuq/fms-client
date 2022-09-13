import React, { useEffect } from "react";
import "./AllSatelliteFarms.css";
import { useState } from "react";
import Table from "../../../components/table/table";
import axios from "axios";
import config from "../../../config.json";
import AllSatelliteFarmsHead from "./components/AllSatelliteFarmsHead";

const AllSatelliteFarms = () => {
  const [status, setStatus] = useState(0);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const getData = async () => {
    let url = `${config.server_url}/get-satellite-farms`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    if (result) {
      setTableData(result.data.data.satellite_farms);
      setTotalPages(result.data.data.totalPages);
      setTotalEntries(result.data.data.totalEntries);
    }
  };

  let rows = [
    {
      heading: "Farm Id",
      field: "id",
      type: "text",
      styles: {
        color: "#6B13FF",
        fontSize: "1rem",
        width: "10%",
        fontWeight: 600,
      },
      header_styles: { color: "white", fontSize: "0.8rem", width: "10%" },
    },
    {
      heading: "Farm Name",
      field: "farm_name",
      type: "text",
      styles: {
        color: "#46BC5C",
        fontSize: "1rem",
        width: "20%",
        fontWeight: 600,
      },
      header_styles: { color: "white", fontSize: "0.8rem", width: "20%" },
    },
    {
      heading: "Farm Address",
      field: "address",
      type: "text",
      styles: {
        color: "black",
        fontSize: "1rem",
        width: "25%",
      },
      header_styles: { color: "white", fontSize: "0.8rem", width: "25%" },
    },
    {
      heading: "Phone No",
      field: "phone",
      type: "text",
      styles: {
        color: "black",
        fontSize: "1rem",
        width: "15%",
        fontWeight: 600,
      },
      header_styles: { color: "white", fontSize: "0.8rem", width: "15%" },
    },
    {
      heading: "Total batches",
      field: "total_batches",
      type: "text",
      styles: {
        color: "#EB008D",
        fontSize: "1rem",
        width: "15%",
        fontWeight: 600,
        justifyContent : "center"
      },
      header_styles: { color: "white", fontSize: "0.8rem", width: "15%",textAlign : "center" },
    },
    {
      heading: "Farm Score",
      field: "score",
      type: "text",
      styles: {
        color: "black",
        fontSize: "1rem",
        width: "15%",
        fontWeight: 600,
        justifyContent : "center"
      },
      header_styles: { color: "white", fontSize: "0.8rem", width: "15%",textAlign : "center"  },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="all_satellite_farms">
      <AllSatelliteFarmsHead />
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

export default AllSatelliteFarms;
