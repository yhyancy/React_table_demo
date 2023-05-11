import React, { useState } from "react";
import "./index.css";

interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  pageSize?: number;
  fixedColumns?: number;
}

enum SortOrder {
  ASCENDING = "ASC",
  DESCENDING = "DESC",
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  pageSize = 5,
  fixedColumns = 0,
}) => {
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASCENDING);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        const aValue = a[sortColumn.key];
        const bValue = b[sortColumn.key];
        if (aValue === bValue) return 0;
        const result = aValue < bValue ? -1 : 1;
        return sortOrder === SortOrder.ASCENDING ? result : -result;
      })
    : data;
  const pageCount = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sortedData.length);
  const pageData = sortedData.slice(startIndex, endIndex);
  const fixedColumnsData = pageData.slice(0, fixedColumns);
  // console.log("fixedColumnsData", fixedColumnsData);
  const scrollableColumnsData = pageData.slice(fixedColumns);
  // console.log("scrollableColumnsData", scrollableColumnsData);

  const renderTableHeader = () => (
    <thead>
      <tr>
        {/* left fixed columns */}
        {columns.slice(0, fixedColumns).map((column) => (
          <th key={column.key}>{column.title}</th>
        ))}
        {/* scrollable columns */}
        {columns.slice(fixedColumns).map((column) => (
          <th
            key={column.key}
            className={column.sortable ? "sortable" : undefined}
            onClick={() => handleSort(column)}
          >
            {column.title}
            {sortColumn === column &&
              (sortOrder === SortOrder.ASCENDING ? " ▲" : " ▼")}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {pageData.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <td key={column.key}>{row[column.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  const renderPagination = () => {
    if (pageCount <= 1) return null;
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
    return (
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : undefined}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
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
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      {/* Render the table UI */}
      <table border={1}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {/* Render the pagination UI */}
      {renderPagination()}
    </div>
  );
};

export default Table;
