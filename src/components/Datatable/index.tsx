'use client';
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter, useColumnOrder } from "react-table";
import LinkSmall from "@/src/components/LinkSmall";

interface DataTableProps {
    columns: any[];
    data: any;
    buttons?: React.ReactNode;
    page_size?: any;
}

function DataTable({ columns, data, buttons, page_size }: DataTableProps): JSX.Element {
    const [pageSize, setPageSize] = useState<number>(page_size);

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
        <div className="w-auto rounded-12px border-0.5 mt-5 md:mt-10 border-grey_one box-border overflow-hidden">
            <div>
                <div className="p-25px flex items-start md:items-center flex-col md:flex-row md:justify-between">
                    <div className="form-group position-relative md:w-auto w-100%">
                        <div></div>
                        <input
                            type="text"
                            value={globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="flex w-100% md:w-280px py-2.5 md:py-3 px-6 rounded-8px focus:outline-none font-normal text-13px text-black border-grey_one border-1"
                        />
                    </div>
                    {buttons && (
                        <div className="mt-5 md:mt-0">
                            {buttons && buttons}
                        </div>
                    )}
                </div>

                <div className="overflow-x-scroll xl:overflow-hidden">
                    <table {...getTableProps()} className="table caption-top w-screen xl:w-100%">
                        <thead className="px-3 bg-grey_three h-50px border-t-1 border-b-1">
                        {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="h-50px">
                            {headerGroup.headers.map((column: any) => (
                                <td {...column.getHeaderProps()} style={{ width: column.width }} className="will-change-auto font-bold text-12px font-inter text-black first:pl-25px whitespace-nowrap px-25px xl:px-0 last:text-right last:pr-25px">
                                    {column.render('Header')}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="bg-white h-50px border-b-1">
                                {row.cells.map((cell: any) => {
                                    return (
                                        <td {...cell.getCellProps()} style={{ width: cell.width }} className="font-normal text-13px font-inter text-black first:pl-25px whitespace-nowrap px-25px xl:px-0 last:flex last:items-center last:justify-end last:h-50px last:pr-4">
                                            { cell.render('Cell') }
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>

                <div className="flex items-center justify-between p-25px">
                    <div className="text-grey_for text-13px font-inter font-normal">
                        Page{' '}
                        {pageIndex + 1} de {Math.ceil(data.length/ pageSize)}{' '}
                    </div>

                    <div className="flex items-center justify-center">
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="fw-bold w-30px h-30px rounded-8px border-gray flex items-center justify-center border-1 text-black mr-0 pb-1">
                            {'<'}
                        </button>
                            <button onClick={() => nextPage()} disabled={!canNextPage} className="fw-bold w-30px h-30px rounded-8px border-1 border-gray text-black flex items-center justify-center ml-1 pb-1">
                            {'>'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataTable;