'use client';

import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import Image from "next/image";

interface DataTableProps {
    columns: any[];
    data: any[];
}

function DataTable({ columns, data }: DataTableProps): JSX.Element {
    const [pageSize, setPageSize] = useState<number>(10);
    const [form, setForm] = useState(0);
    const [edit, setEdit] = useState(null);

    const handleClickEdit = (e: number) => {
        setEdit(null);
    }

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
        <div className="w-screen rounded-12px border-0.5 mx-45px border-grey_one">
            <div className="w-auto p-25px">
                <div className="form-group position-relative">
                    <div></div>
                    <input
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Pesquisar..."
                        className="flex w-280px py-3 px-6 rounded-8px focus:outline-none text-13px text-black border-grey_one border-1"
                    />
                </div>
            </div>

            <table {...getTableProps()} className="table w-100% caption-top">
                <thead className="px-3 bg-grey_three h-50px border-t-1 border-b-1">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <td {...column.getHeaderProps()} style={{ width: column.width }} className="font-semibold text-13px font-inter text-black first:pl-25px">
                                    {column.render('Header')}
                                </td>
                            ))}
                            <td align="right" className="font-semibold text-13px font-inter text-black pr-25px">
                                ACTIONS
                            </td>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="bg-white h-50px border-b-1">
                                {row.cells.map((cell: any) => {
                                    console.log(cell);

                                    return (
                                        <td {...cell.getCellProps()} style={{ width: cell.width }}
                                            className={`font-normal text-13px font-inter text-black first:pl-25px`}>
                                            <input type="text" value={cell.value} className={`${edit === row.index ? 'border-1 px-4 py-2.5 my-3 rounded-8px' : ''}`}/>
                                        </td>
                                    );
                                })}
                                <td className="text-black" width="25%">
                                    <div className="flex items-center w-auto justify-end pr-20px">
                                        <button
                                            onClick={() => {handleClickEdit(row.index)}}
                                            className="w-25px h-25px flex items-center justify-centers">
                                            <Image
                                                src="/icon/icon-edit.svg"
                                                width="18"
                                                height="18"
                                                alt="icon edit" />
                                        </button>

                                        <button
                                            onClick={() => {}}
                                            className="w-25px h-25px flex items-center justify-centers">
                                            <Image
                                                src="/icon/icon-trash.svg"
                                                width="18"
                                                height="18"
                                                alt="icon edit" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="flex items-center justify-between p-25px">
                <div className="text-grey_for">
                    Página{' '}
                    {pageIndex + 1} de {Math.ceil(data.length / pageSize)}{' '}
                </div>

                <div className="flex items-center justify-center">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="fw-bold w-30px h-30px rounded-8px border-gray flex items-center justify-center border-1 text-black">
                        {'<'}
                    </button>
                    {pageOptions.map((page: any, index: any) => (
                        <button
                            key={index}
                            onClick={() => gotoPage(index)}
                            className={`fw-bold w-30px h-30px rounded-8px border-gray border-1 mx-2 text-black flex items-center justify-center $(pageIndex === index ? 'active' : '')`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="fw-bold w-30px h-30px rounded-8px border-1 border-gray text-black flex items-center justify-center">
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DataTable;