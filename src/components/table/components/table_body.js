import React from "react";
import TableRow from '../components/table_row'

const TableBody = ({table_data}) => {
  table_data = [{ batch_id: 3, farm_name: "AVR farm", farm_owner: "Bhuvana" }];
  return (
    <div className="table_body">
      {table_data.map((ele) => (
        <TableRow content={ele} />
      ))}
    </div>
  );
};

export default TableBody;
