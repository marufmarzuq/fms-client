import React, { useEffect } from "react";
import "./BatchesOverview.css";
import { useState } from "react";
import axios from "axios";
import BatchFeed from "./batchFeed/BatchFeed";
import BatchFilter from "./batchFilter/BatchFilter";
import BatchHeader from "./batchHeader/BatchHeader";
import BatchInputCost from "./batchInputCost/BatchInputCost";
import BatchMortalityTrend from "./batchMortalityTrend/BatchMortalityTrend";
import BatchProfile from "./batchProfile/BatchProfile";
import BatchSales from "./batchSales/BatchSales";
import BatchStock from "./batchStock/BatchStock";
import FeedBagUsage from "./feedBagUsage/FeedBagUsage";
import config from "../../../config.json";
import BasicTable from "../../../components/plainTable/basicTable";
const BatchesOverview = () => {
  const [batchId,setBatchId] = useState(62)
  const [dailyData, setdailyData] = useState([])
  const [productData,setProductData] = useState({})
  const [batchData,setBatchData] = useState({})
  const getData = async () => {
    let url = `${config.server_url}/batch-overview`;
    let params = {
      batch_id : batchId
    };
    let result = await axios
      .get(url, { params })
      .catch((err) => console.log(err));
      setBatchData(result.data.data)
      setdailyData(result.data.data.daily_data)
      setProductData(result.data.data.product_data)
  };


  useEffect(() => {
    getData()
  },[])
  const handleHeaderToggle = () => {};

  let rows = [
    {
      heading: "Day",
      field: "day",
      type: "text",
      styles: { color: "#1B00CC", width: "8%", fontSize: "0.8rem",fontWeight : 400, justifyContent : "center"},
      header_styles: { color: "white", width: "8%",paddingLeft : "2.3%",justifyContent: "center"  },
    },
    {
      heading: "Date",
      field: "date",
      type: "text",
      styles: { color: "#7F839A", width: "10%", fontSize: "0.8rem",fontWeight : 400  },
      header_styles: { color: "white", width: "10%",justifyContent: "center"  },
    },
    {
      heading: "Mortality",
      field: "mortality",
      type: "text",
      styles: { color: "#FF0000", width: "8%", fontSize: "0.8rem",fontWeight : 400,justifyContent : "center"  },
      header_styles: { color: "white", width: "8%",justifyContent: "center"  },
    },
    {
      heading: "Feed",
      field: "feed_used",
      type: "text",
      styles: { color: "#7F839A", width: "8%", fontSize: "0.8rem",fontWeight : 400 ,justifyContent : "center"},
      header_styles: { color: "white", width: "8%",justifyContent: "center"   },
    },
    {
      heading: "Weight",
      field: "satellite_farm_name",
      type: "text",
      styles: { color: "#1B00CC", width: "8%", fontSize: "0.8rem",fontWeight : 400,justifyContent : "center"  },
      header_styles: { color: "white", width: "8%",justifyContent: "center"   },
    },
    {
      heading: "Vaccination Planned",
      field: "satellite_farm_name",
      type: "text",
      styles: { color: "#BB6B00", width: "10%", fontSize: "0.8rem",fontWeight : 500,justifyContent : "center"   },
      header_styles: { color: "white", width: "10%",justifyContent: "center"  },
    },
    {
      heading: "Vaccine Administered",
      field: "vaccine",
      type: "text",
      styles: { color: "#EB008D", width: "10%", fontSize: "0.8rem",fontWeight : 500,justifyContent : "center"   },
      header_styles: { color: "white", width: "10%",justifyContent: "center"  },
    },
    {
      heading: "Farm Visit",
      field: "supervisor_visit",
      type: "text",
      styles: { color: "#000000", width: "10%", fontSize: "0.8rem",fontWeight :500,justifyContent : "center"   },
      header_styles: { color: "white", width: "10%",justifyContent: "center"  },
    },
    {
      heading: "Supervisor Comments",
      field: "supervisor_comments",
      type: "text",
      styles: { color: "#AE00E3", width: "15%", fontSize: "0.8rem",fontWeight : 400  },
      header_styles: { color: "white", width: "15%"  },
    },
    {
      heading: "Batch Score",
      field: "batch_score",
      type: "text",
      styles: { color: "#EB008D", width: "10%", fontSize: "0.8rem",fontWeight : 400,justifyContent : "center"   },
      header_styles: { color: "white", width: "10%",justifyContent: "center" },
    },
  ];
  let table_heading = {title : "Daily Details",styles : {color : "#46BC5C"}}
  return (
    <div className="container">
      <div className="batch-overview">
        <BatchHeader handleHeaderToggle={handleHeaderToggle} />
        <BatchFilter />
        <BatchProfile dailyData = {dailyData} productData ={productData} batchData={batchData}/>
        <BatchStock batchData={batchData}/>
        <BatchFeed />
        <FeedBagUsage dailyData ={dailyData}/>
        <BatchMortalityTrend />
        {/* <BatchInputCost />
        <BatchSales /> */}
        <BasicTable table_data={dailyData}  rows={rows} table_heading = {table_heading} />
      </div>
    </div>
  );
};

export default BatchesOverview;
