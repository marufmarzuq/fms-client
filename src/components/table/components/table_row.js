import React from "react";
import Trendline from "../../charts/line_charts/components/Trendline";
import "./table_row.css";
import ArrayBox from "../../array_box/array_box";
const TableRow = ({content,rows}) => {
  console.log(rows)
  console.log(content)
  let status_data = {
    text: content.status,
    color: content.status,
    bgColor: content.status,
  };
  return (
    <div className="table_row">
      {rows.map((row) => {
        // mapping the data cells . Have to choose the type of  data 
        row.styles["width"] = row.styles["width"] ? row.styles["width"] : `${100/+rows.length}%`


        if (row.type == "text") {
          return (
            <div style={{...row.styles}}>{content[row.field]}</div>
          );
        }
        if (row.type == "trendline") {
        
          row.styles["width"] = row.styles["width"] ? row.styles["width"] : `${100/+rows.length}%`
          return (
            <div style={{...row.styles}}>
              <Trendline
                data={content[row.field]}
                height={400}
                width={600}
                precision={2}
                baseValue={3}
                lineColor={"#FE3C3D"}
              />
            </div>
          );
        }
        if (row.type == "arrayBox") {
          console.log(row)
          row.styles["width"] = row.styles["width"] ? row.styles["width"] : `${100/+rows.length}%`
          return (
            <div style={{...row.styles}}><ArrayBox arr={content[row.field]}/></div>
          )
        }
      })}
     
    </div>
  );
};

export default TableRow;
