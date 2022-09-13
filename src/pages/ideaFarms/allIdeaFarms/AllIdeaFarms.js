import React, { useEffect } from "react";
import "./AllIdeaFarms.css";
import { useState } from "react";
import AllIdeaFarmsHead from "./components/AllIdeaFarmsHead";
import Table from "../../../components/table/table";
import axios from "axios";
import config from "../../../config.json";

const AllIdeaFarms = () => {
  const [status, setStatus] = useState(0);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const getData = async () => {
    let url = `${config.server_url}/get-idea-farms`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    if (result) {
      setTableData(result.data.data.idea_farms);
      setTotalPages(result.data.data.totalPages);
      setTotalEntries(result.data.data.totalEntries);
    }
  };

  let rows = [
    {
      heading: "Farm Id",
      field: "id",
      type: "text",
      styles: { color: "#46BC5C", fontSize: "1rem", width : "15%",paddingLeft : "5%", fontWeight : 700 },
      header_styles : { color: "white", fontSize: "0.8rem", width : "15%",paddingLeft : "5%"  }
    },
    {
      heading: "Idea Farm Name",
      field: "idea_farm_name",
      type: "text",
      styles: { color: "#000000", fontSize: "1rem", width : "15%",fontWeight : 500 },
      header_styles : { color: "white", fontSize: "0.8rem", width : "15%" }
    },
    {
      heading: "Phone",
      field: "phone",
      type: "text",
      styles: { color: "#6B13FF", fontSize: "1rem", width : "15%",fontWeight : 600  },
      header_styles : { color: "white", fontSize: "0.8rem", width : "15%" }
    },
    {
      heading: "Address",
      field: "address",
      type: "text",
      styles: { color: "black", fontSize: "1rem", width : "30%"  },
      header_styles : { color: "white", fontSize: "0.8rem", width : "30%" }
    },
    {
      heading: "Pincode",
      field: "pincode",
      type: "text",
      styles: { color: "brown", fontSize: "1rem", width : "10%",fontWeight : 500  },
      header_styles : { color: "white", fontSize: "0.8rem", width : "10%" }
    },
    {
      heading: "Satellite Farms",
      field: "satellite_farms_count",
      type: "text",
      styles: { color: "#46BC5C", fontSize: "1rem", width : "15%",fontWeight : 700,paddingLeft : "3%", textShadow : "2px 2px 2px lightgray",justifyContent : "center"},
      header_styles : { color: "white", fontSize: "0.8rem", width : "15%",textAlign : "center"  }
    },
  ];

  useEffect(() => {
    getData();
  }, [pageNumber,pageSize]);

  return (
    <div className="all_idea_farms">
      <AllIdeaFarmsHead />
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

export default AllIdeaFarms;
