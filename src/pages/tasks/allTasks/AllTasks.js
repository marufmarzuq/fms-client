import React, { useEffect } from "react";
import "./AllTasks.css";
import { useState } from "react";
import Table from "../../../components/table/table";
import axios from "axios";
import config from "../../../config.json";
import AllTasksHead from "./components/AllTasksHead";

const AllTasks = () => {
  const [status, setStatus] = useState(0);
  const [headerToggle, setHeaderToggle] = useState(false);
  const [region, setRegion] = useState("all");
  const [filters, setFilters] = useState({ task_status: status });
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [tableData, setTableData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const getData = async () => {
    let url = `${config.server_url}/get-tasks`;
    let params = {
      page_size: pageSize,
      page_number: pageNumber,
      filters: filters,
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
    console.log(result.data);
    setTableData(result.data.data.tasks);
    setTotalPages(result.data.data.totalPages);
    setTotalEntries(result.data.data.totalEntries);
  };

  let rows = [
    {
      heading: "Task Id",
      field: "id",
      type: "text",
      styles: {
        color: "#6BC5ED",
        width: "10%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Supervisor",
      field: "supervisor_name",
      type: "text",
      styles: {
        color: "#E6269C",
        width: "10%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Supervisor Phone",
      field: "supervisor_phone",
      type: "text",
      styles: {
        color: "#E6269C",
        width: "8%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Farm Name",
      field: "satellite_farm_name",
      type: "text",
      styles: {
        color: "#6BC5ED",
        width: "10%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Farmer",
      field: "farmer_name",
      type: "text",
      styles: {
        color: "black",
        width: "10%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Farmer Phone",
      field: "farmer_phone",
      type: "text",
      styles: {
        color: "black",
        width: "8%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "8%" },
    },
    {
      heading: "Details",
      field: "task_description",
      type: "text",
      styles: {
        color: "#51BF66",
        width: "12%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "12%" },
    },
    {
      heading: "Assigned By",
      field: "assignee_name",
      type: "text",
      styles: {
        color: "#FA0000",
        width: "10%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "10%" },
    },
    {
      heading: "Due Date",
      field: "due_by",
      type: "text",
      styles: {
        color: "black",
        width: "12%",
        fontSize: "0.75rem",
        fontWeight: 600,
      },
      header_styles: { color: "white", width: "12%" },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="all_tasks">
      <AllTasksHead
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

export default AllTasks;
