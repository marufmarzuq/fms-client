import React from "react";
import "./App.css";
import LineChart from "./components/LineChart";
import Label from "./components/AxisLabel";
import ChartTitle from "./components/ChartTitle";

const data = [
  { label: "D-1", x: 0, y: 6 },
  { label: "D-2", x: 1, y: 4 },
  { label: "D-3", x: 2, y: 3 },
  { label: "D-4", x: 3, y: 1 },
  { label: "D-5", x: 4, y: 4 },
  { label: "D-6", x: 5, y: 5 },
  { label: "D-7", x: 6, y: 4 }
];

const styles = {
  chartComponentsContainer: {
    display: 'grid', gridTemplateColumns: 'max-content 700px', alignItems: 'center'
  },
  chartWrapper: { maxWidth: 700, alignSelf: 'flex-start' }
}
const LineGraph = () => {
  return (
    <div style={styles.chartComponentsContainer}>
      <div />
      <ChartTitle text="Mortality Trend" />
      <Label text="Mortality" rotate />
      <div style={styles.chartWrapper}>
        <LineChart
          width={500}
          height={300}
          data={data}
          horizontalGuides={2}
          precision={2}
          verticalGuides={data.length - 1}
          baseValue={5}
        />
      </div>
      <div />
      <Label text="Day Into the Batch" />
    </div>
  );
};

export default LineGraph;
