import React from "react";
import "./FeedBagUsage.css";
import {
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



const FeedBagUsage = ({dailyData}) => {
  // const data = [
  //   {
  //     green: 794,
  //     pink: 504
  //   },
  //   {
  //     green: 831,
  //     pink: 790
  //   },
  //   {
  //     green: 1012,
  //     pink: 608
  //   },
  //   {
  //     green: 992,
  //     pink: 860
  //   },
  //   {
  //     green: 1121,
  //     pink: 948
  //   },
  //   {
  //     green: 1281,
  //     pink: 1012
  //   },
  //   {
  //     green: 996,
  //     pink: 805
  //   },
  //   {
  //     green: 1445,
  //     pink: 1148
  //   },
  //   {
  //     green: 1380,
  //     pink: 1227
  //   },
  //   {
  //     green: 1565,
  //     pink: 1105
  //   },
  //   {
  //     green: 1679,
  //     pink: 1336
  //   },
  //   {
  //     green: 1742,
  //     pink: 1485
  //   },
  //   {
  //     green: 1893,
  //     pink: 1085
  //   },
  //   {
  //     green: 1939,
  //     pink: 1609
  //   },
  // ];
  const data =[]
  dailyData.forEach(element => {
    data.push({feed : element["feed_used"]})
 })
 console.log(data)

  return (
    <div className="feed-bag-usage">
      <div className="batch-graph-title">Mortality Trend</div>
      <div className="batch-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: -20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="1 1" /> */}
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Line
              dataKey="feed"
              stroke="#A4CD3C"
              activeDot={{ r: 6 }}
              strokeWidth={1.5}
            />
            {/* <Line
              dataKey="pink"
              stroke="#EB008A"
              activeDot={{ r: 6 }}
              strokeWidth={1.5}
            /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedBagUsage;
