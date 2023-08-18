import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter, useFilters} from "react-table";
import Filter from "./Filter";
import {useNavigate } from "react-router-dom";
import { useListData } from "../ContextApi";

export default function Table({ data }) {
    const { setCurrentInvoiceID } = useListData();
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('');
    const [filterInput, setFilterInput] = useState('');
    const columns = useMemo(() => [
        {
            Header: 'Invoice ID',
            accessor: 'invoice_id',
            Cell: ({ value }) => {
                return (
                    <div className="text-center font-semibold text-lg">{value}</div>
                )
            }
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Created On',
            accessor: 'created_on',
            Cell : ({value}) => {
                const date = new Date(value);
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                return (
                    <div>
                        <div className="text-lg text-center font-semibold">{formattedDate}</div>
                        
                    </div>
                )
            }
        },
        {
            Header: 'Due On',
            accessor: 'due_on',
            Cell : ({value}) => {
                const date = new Date(value);
                const options = { day: 'numeric', month: 'short', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                return (
                    <div>
                        <div className="text-lg text-center font-semibold">{formattedDate}</div>
                        
                    </div>
                )
            }
        },
        {
            Header: 'Amount',
            accessor: 'totalPrice',
            Cell: ({ value }) => {
                const amount = value;
                const formattedAmount = parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                return (
                    <div className="text-center font-semibold text-lg">$ {formattedAmount}</div>
                )
            }
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell : ({value}) => {
                let color = '';
                if (value === 'paid') {
                    color = 'text-green-500';
                } else if (value === 'pending') {
                    color = 'text-yellow-600';
                } else if (value === 'overdue') {
                    color = 'text-red-500';
                }
                return (
                    
                        <div className={`text-center border capitalize bg-zinc-700 rounded-xl font-semibold text-lg ${color}`}>{value}</div>
                    
                    
                )
            }
        },
        {   
            Header: 'Note',
            accessor: 'note'
        },
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({ value }) => {
                return (
                    <div className="flex justify-center items-center">
                        <button onClick={() => {
                            return (
                                setCurrentInvoiceID(value),
                                navigate('/viewInvoice')
                            )
                        }} className="bg-blue-500  hover:bg-blue-600 text-white px-3 py-1 rounded" >
                        View
                        </button>
                    </div>

                )
                
            }
        }
    ], [])

    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups if your table have groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state,
        setGlobalFilter,
        setFilter,
        } = useTable({
            columns,
            data,

        }, useGlobalFilter, useFilters, usePagination);
        
    const { pageIndex, pageSize } = state;
    
    const handleFilterChange = e => {
        const value = e.target.value;
        setSelectedStatus(value);
        setFilter('status', value);
    };

    const handleSearchChange = e => {
        const value = e.target.value;
        setFilterInput(value);
        setGlobalFilter(value);
    };
    
    return (
        <>
            <Filter filterInput={filterInput} handleFilterChange={handleFilterChange} handleSearchChange={handleSearchChange} selectedStatus={selectedStatus} />
            <table {...getTableProps()} className="table-fixed  w-5/6 mx-auto shadow-md p-2 mb-4">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="border p-2 bg-neutral-600 text-white font-semibold">{column.render("Header")}</th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border bg-neutral-700 text-slate-300">
                            {row.cells.map(cell => {
                                return (
                                <td {...cell.getCellProps()} className="border p-2">
                                    {cell.render('Cell')}
                                </td>
                                    );
                            })}
                            </tr>
                        );
                        })}
                </tbody>
            </table>
            <div className="flex justify-end gap-2 w-5/6 mx-auto pb-5 items-center">
                <select className="bg-neutral-600 p-2 text-white" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="border rounded p-2 focus:outline-none bg-neutral-800 text-white font-semibold">⏮️ Previous</button>

                <div className="text-white font-semibold">{pageIndex + 1} of {pageOptions.length}</div>
                
                <button onClick={() => nextPage()} disabled={!canNextPage} className="border rounded p-2 focus:outline-none bg-neutral-800 text-white font-semibold">Next ⏭️</button>
            </div>

    </>
    );

}



