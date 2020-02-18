import React from 'react';
import TableBody from "./tableBody"
import TableHeader from "./tableHeader"

const Table = (props) => {
  const { columns, onSort, sortColumn, dataToDisplay, data } = props
  return (<>
    <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
    <TableBody data={data} columns={columns} dataToDisplay={dataToDisplay} />
  </>);
}

export default Table;