



import React from 'react'

const Trendline = ({
    data,
    height,
    width,
    precision,
    baseValue,
    lineColor
  }) => {
  
      const STROKE =10
      const FONT_SIZE = width / 50;
      const maximumXFromData = Math.max(...data.map(e => e.x));
      const maximumYFromData = Math.max(...data.map(e => e.y));
    
      const digits =
        parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;
    
      const padding = (FONT_SIZE + digits) * 3;
      const chartWidth = width - padding * 2;
      const chartHeight = height - padding * 2;
    
      const points = data
        .map(element => {
          const x = (element.x / maximumXFromData) * chartWidth + padding;
          const y =
            chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
          return `${x},${y}`;
        })
        .join(" ");
    
      const base = data
      .map(element => {
        const x = (element.x / maximumXFromData) * chartWidth + padding;
        const y =
          chartHeight - (baseValue / maximumYFromData) * chartHeight + padding;
        return `${x},${y}`;
      })
      .join(" ");
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      // style={{ border: "0.5px solid #ccc" }}
    >
      <polyline
        fill="none"
        stroke={lineColor}
        strokeWidth={STROKE}
        points={points}
      />
      <polyline
        fill="dotted"
        stroke="na"
        strokeWidth={STROKE}
        points={base}
      />
    </svg>
  )
}

export default Trendline