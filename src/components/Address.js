import React from "react";

export default function Address({ title, address}) {
    return (
        <div className="flex flex-col justify-center items-center ">
            <label className="text-gray-300 text-2xl font-bold mb-2 px-2">{title} </label>
            <textarea className=" rounded-lg w-11/12 h-32 p-2 bg-zinc-700 text-white" placeholder="Enter Customer address here" value={address} readOnly />
        </div>
    )

}