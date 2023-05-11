import React from "react";

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

export default function Table({ columns, data }: TableProps) {
  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.accessor}>{row[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
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
}
