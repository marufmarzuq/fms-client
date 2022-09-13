import React from "react";
import "./BatchMortalityTrend.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    red: 14,
    yellow: 30,
    blue: 27,
  },
  {
    red: 31,
    yellow: 27,
    blue: 32,
  },
  {
    red: 26,
    yellow: 2,
    blue: 31,
  },
  {
    red: 11,
    yellow: 12,
    blue: 5,
  },
  {
    red: 31,
    yellow: 19,
    blue: 6,
  },
  {
    red: 3,
    yellow: 6,
    blue: 7,
  },
  {
    red: 35,
    yellow: 4,
    blue: 21,
  },
  {
    red: 17,
    yellow: 23,
    blue: 10,
  },
  {
    red: 30,
    yellow: 5,
    blue: 32,
  },
  {
    red: 8,
    yellow: 12,
    blue: 22,
  },
  {
    red: 30,
    yellow: 16,
    blue: 26,
  },
  {
    red: 19,
    yellow: 26,
    blue: 27,
  },
  {
    red: 20,
    yellow: 18,
    blue: 5,
  },
  {
    red: 32,
    yellow: 21,
    blue: 31,
  },
];

const BatchMortalityTrend = () => {
  return (
    <div className="batch-mortality-trend">
      <div className="batch-graph-title">Mortality Trend</div>
      <div className="batch-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: -30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{ fontSize: "14px" }}
              cursor={{ fill: "#ededed" }}
            />
            <Legend />
            <Bar barSize={45} dataKey="yellow" stackId="a" fill="#FEC623" />
            <Bar dataKey="red" stackId="a" fill="#FF5B55" />
            <Bar dataKey="blue" stackId="a" fill="#68C9D2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatchMortalityTrend;
