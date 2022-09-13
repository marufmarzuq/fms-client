import React, { useEffect } from "react";
import "./AllFarmers.css";
import { useState } from "react";
import Table from "../../../components/table/table";
import axios from "axios";
import config from "../../../config.json";
import AllFarmersHead from "./components/AllFarmersHead";

const AllFarmers = () => {
  const [status, setStatus] = useState(0);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const getData = async () => {
    let url = `${config.server_url}/get-all-farmers`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    if (result) {
      setTableData(result.data.data.farmers);
      setTotalPages(result.data.data.totalPages);
      setTotalEntries(result.data.data.totalEntries);
    }
  };

  let rows = [
    {
      heading: "Farmer Name",
      field: "name",
      type: "text",
      styles: { color: "#6B13FF", width: "15%", fontSize: "0.9rem", fontWeight : 600 },
      header_styles: { color: "white", width: "15%",fontSize: "0.8rem",paddingLeft : "18px"},
    },
    {
      heading: "Farm Name",
      color: "black",
      field: "farm_name",
      type: "text",
      styles: { color: "#5CE476", width: "15%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "15%",fontSize: "0.8rem",paddingLeft : "18px"  },
    },
    {
      heading: "Phone No",
      color: "black",
      field: "phone",
      type: "text",
      styles: { color: "#5CE476", width: "10%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "10%",fontSize: "0.8rem",paddingLeft : "18px"  },
    },
    {
      heading: "Farm Address",
      color: "#6B13FF",
      field: "address",
      type: "text",
      styles: { color: "#5CE476", width: "20%", fontSize: "0.9rem" },
      header_styles: { color: "white", width: "20%", fontSize: "0.8rem",paddingLeft : "18px"   },
    },
    {
      heading: "Total Batches",
      color: "#EB008D",
      field: "batch_count",
      type: "text",
      styles: { color: "#5CE476", width: "8%", fontSize: "0.9rem",justifyContent : "center" },
      header_styles: { color: "white", width: "8%", fontSize: "0.8rem",textAlign : "center"  },
    },
    {
      heading: "Completed Batches",
      color: "black",
      field: "completed_batch_count",
      type: "text",
      styles: { color: "#5CE476", width: "8%", fontSize: "0.9rem",justifyContent : "center"  },
      header_styles: { color: "white", width: "8%", fontSize: "0.8rem" ,textAlign : "center"   },
    },
    {
      heading: "Score",
      color: "black",
      field: "completed_batch_score",
      type: "text",
      styles: { color: "#5CE476", width: "8%", fontSize: "0.9rem",justifyContent : "center"  },
      header_styles: { color: "white", width: "8%", fontSize: "0.8rem" ,textAlign : "center"   },
    },
    {
      heading: "Ongoing Batches",
      color: "black",
      field: "ongoing_batch_count",
      type: "text",
      styles: { color: "#5CE476", width: "8%", fontSize: "0.9rem",justifyContent : "center"  },
      header_styles: { color: "white", width: "8%", fontSize: "0.8rem",textAlign : "center"    },
    },
    {
      heading: "Score",
      color: "black",
      field: "ongoing_batch_score",
      type: "text",
      styles: { color: "#5CE476", width: "8%", fontSize: "0.9rem",justifyContent : "center"  },
      header_styles: { color: "white", width: "8%", fontSize: "0.8rem",textAlign : "center"    },
    },
  ];

  useEffect(() => {
    getData();
  }, [pageSize,pageNumber]);

  return (
    <div className="all_farmers">
      <AllFarmersHead />
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

export default AllFarmers;
