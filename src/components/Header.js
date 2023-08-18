import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <header className="bg-gray-900 py-4  flex justify-between items-center">
                <div className="ml-6">
                    <h1 className="text-white text-3xl font-bold">Invoice App</h1>
                </div>
                <div className="mr-6">
                    <Link to={"/createInvoice"} className="bg-green-500 hover:bg-green-600 font-semibold text-white py-2 px-4 rounded-xl shadow">
                    Create Invoice
                    </Link>
                </div>
            </header>
        </>
    )
}