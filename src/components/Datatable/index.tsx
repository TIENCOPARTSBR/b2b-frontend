import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Td, FormControl, CardBody, Card, CardHead, Thead, Tbody, PageCount, CardFooter, ButtonPagination, Table, IconSearch } from "./style";
import 'bootstrap/dist/css/bootstrap.min.css';

interface DataTableProps {
  columns: any[];
  data: any[];
}

function DataTable({ columns, data }: DataTableProps): JSX.Element {
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    state,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize },
    },
    useGlobalFilter,
    usePagination
  );

  // @ts-ignore
  const { globalFilter, pageIndex } = state;

  // Use useEffect to observe changes in pageSize and force table update
  useEffect(() => {
    const updateTable = () => {
      setPageSize(pageSize);
      setGlobalFilter(globalFilter || '');
    };
    
    updateTable();
  }, [pageSize, setPageSize, globalFilter, setGlobalFilter]);

  return (
    <Card>
      <CardBody>
        <CardHead>
          <div className="form-group position-relative">
            <IconSearch></IconSearch>
            <FormControl
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
              />
          </div>
        </CardHead>

        <Table {...getTableProps()} className="table caption-top">
          <Thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Td {...column.getHeaderProps()} style={{ width: column.width }}>
                    {column.render('Header')}
                  </Td>
                ))}
              </tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <Td {...cell.getCellProps()} style={{ width: cell.width }}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </tr>
              );
            })}
          </Tbody>
        </Table>

        <CardFooter className="d-flex justify-content-between">
          <PageCount>
            Page{' '}
            {pageIndex + 1} de {Math.ceil(data.length / pageSize)}{' '}
          </PageCount>

          <div className="pagination">
            <ButtonPagination onClick={() => previousPage()} disabled={!canPreviousPage} className="fw-bold">
              {'<'}
            </ButtonPagination>
            {pageOptions.map((page: any, index: any) => (
              <ButtonPagination
                key={index}
                onClick={() => gotoPage(index)}
                className={pageIndex === index ? 'active' : ''}
              >
                {index + 1}
              </ButtonPagination>
            ))}
            <ButtonPagination onClick={() => nextPage()} disabled={!canNextPage} className="fw-bold">
              {'>'}
            </ButtonPagination>
          </div>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

export default DataTable;