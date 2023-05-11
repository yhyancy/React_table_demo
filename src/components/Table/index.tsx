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

const Table: React.FC<TableProps> = ({ columns, data, pageSize = 5 }) => {
  const [sortColumn, setSortColumn] = useState<TableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASCENDING);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
        const aValue = a[sortColumn.accessor];
        const bValue = b[sortColumn.accessor];
        if (aValue === bValue) return 0;
        const result = aValue < bValue ? -1 : 1;
        return sortOrder === SortOrder.ASCENDING ? result : -result;
      })
    : data;
  const pageCount = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sortedData.length);
  const pageData = sortedData.slice(startIndex, endIndex);

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
              {sortColumn === column &&
                (sortOrder === SortOrder.ASCENDING ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {pageData.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const renderPagination = () => {
    if (pageCount <= 1) return null;
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
    return (
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : undefined}
            onClick={() => setCurrentPage(pageNumber)}
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

  return (
    <div className="table-container">
      {/* Render the table UI */}
      <table border={2}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {/* Render the pagination UI */}
      {renderPagination()}
    </div>
  );
};

export default Table;
