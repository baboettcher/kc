import React from 'react';
import TableBody from "./_tableBody"
import TableHeader from "./_tableHeader"

const Table = (props) => {
  const { columns, onSort, sortColumn, dataToDisplay, data } = props
  return (<div>
    <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
    <TableBody data={data} columns={columns} dataToDisplay={dataToDisplay} />
  </div>);
}

export default Table;