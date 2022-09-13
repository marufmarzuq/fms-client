import React from "react";
import "./table_footer.css";

const TableFooter = ({
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
  totalPages,
  setTotalPages,
  getData,
  totalEntries
}) => {

  const firstPageHandler = () => {
       setPageNumber(1)
       getData()
  }
  const previousPageHandler = () => {
    
     pageNumber >1 &&  setPageNumber(+pageNumber - 1)
     getData()
  }
  const nextPageHandler = () => {

      pageNumber<totalPages && setPageNumber(+pageNumber + 1)
      getData()
  }
  const lastPageHandler = () => {
    setPageNumber(totalPages)
    getData()
  }
  
  const pageRecordSetter = (e) => {
    pageSize = e.target.value
    setPageSize(pageSize)
    getData()
  }

  const pageNumberHandler = (e) => {
    pageNumber = e.target.value
    setPageNumber(pageNumber)
    getData()
  }

  return (
    <div className="table_footer">
      <div className="page_details">
        <div>
          Records <span>{+pageNumber*+pageSize + 1 - +pageSize}</span> to <span>{totalEntries > +pageNumber*+pageSize ? +pageNumber*+pageSize : totalEntries }</span> of <span>{totalEntries}</span> entries
        </div>
        <label htmlFor="pageSize">Records Per Page</label>
        <select name="pageSize" onChange={pageRecordSetter}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="page_controller">
        <div onClick={firstPageHandler}>{`<<`}</div>
        <div onClick={previousPageHandler}>{`<`}</div>
        <input type="number" value={pageNumber} onChange ={pageNumberHandler}/>
        <div onClick={nextPageHandler}>{`>`}</div>
        <div onClick={lastPageHandler}>{`>>`}</div>
      </div>
    </div>
  );
};

export default TableFooter;
