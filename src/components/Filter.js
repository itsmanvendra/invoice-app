import React from "react";

export default function Filter({ filterInput, handleFilterChange, selectedStatus, handleSearchChange }) {
    
    return (
        <>
            <div className="flex items-center justify-between w-5/6 mx-auto shadow-md mb-2">
                <div className="flex items-center mr-2">
                        <select
                            value={selectedStatus || ""}
                        onChange={handleFilterChange}
                        placeholder="Filter By Status"
                        className="border rounded p-2 focus:outline-none"
                        >
                        <option value="">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                        </select>
                </div>
                <input
                type="text"
                value={filterInput || ""}
                onChange={handleSearchChange}
                className="border rounded p-2 w-48 focus:outline-none flex-1"
                placeholder="Search..."
            />
            </div>
        </>
    )
}