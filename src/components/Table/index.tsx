import React, { useState } from "react";

interface TableColumn {
  header: string;
  accessor: string;
  sortable?: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  pageSize?: number;
  leftFixedColumns?: number;
  rightFixedColumns?: number;
}

enum SortOrder {
  ASCENDING = "ASC",
  DESCENDING = "DESC",
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASCENDING);

  const sortedData = sortColumn
  ? [...data].sort((a, b) => {
      const aValue = a[sortColumn.accessor];
      console.log('aValue',aValue);
      const bValue = b[sortColumn.accessor];
      console.log('bValue',bValue);
      if (aValue === bValue) return 0;
      const result = aValue < bValue ? -1 : 1;
      return sortOrder === SortOrder.ASCENDING ? result : -result;
    })
  : data;

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessor}
              className={column.sortable ? "sortable" : undefined}
              onClick={() => handleSort(column)}
            >
              {column.header}
              {sortColumn === column && (sortOrder === SortOrder.ASCENDING ? ' ▲' : ' ▼')}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const handleSort = (column: TableColumn) => {
    if (!column.sortable) return;
    if (sortColumn === column) {
      setSortOrder(
        sortOrder === SortOrder.ASCENDING
          ? SortOrder.DESCENDING
          : SortOrder.ASCENDING
      );
    } else {
      setSortColumn(column);
      setSortOrder(SortOrder.ASCENDING);
    }
    // setCurrentPage(1);
  };

  return (
    <div className="table-container">
      {/* Render the table UI */}
      <table border={2}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {/* Render the pagination UI */}
    </div>
  );
};

export default Table;
