import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setPageIndex,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 100,
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        className="justify-center min-w-full divide-y divide-gray-200"
        {...getTableProps()}
      >
        <thead className="text-lg mx-auto bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  scope="col"
                  className="px-6 py-3 text-md font-medium text-gray-500 uppercase tracking-wider"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="bg-gray-50" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="px-6 py-4 whitespace-nowrap text-md font-medium text-base-content"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className="pagination text-md text-base-content flex flex-col mx-auto justify-center">
        <div className="flex mx-auto">
          {/*<div>Showing the first results of {rows.length} rows</div>*/}
        </div>
        <div className="flex mx-auto space-x-2">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions?.length}
            </strong>{" "}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(15);
            }}
          >
            {/*{[15, 30, 45, 60, 75, 90, 105, 120, 135, 150].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}*/}
          </select>
        </div>
      </div>
    </>
  );
}

function App(data) {
  const newData = data.data;

  const columns = React.useMemo(
    () => [
      {
        Header: "List of Configurations",
        columns: [
          {
            Header: "Created",
            accessor: "1",
          },
          {
            Header: "Domain",
            accessor: "2",
          },
          {
            Header: "Email",
            accessor: "3",
          },
          {
            Header: "Configuration",
            accessor: "4",
          },
        ],
      },
    ],
    []
  );

  //console.log("columns", columns);
  //console.log("data", newData);

  return (
    <div>
      <Table columns={columns} data={newData} />
    </div>
  );
}

export default App;
