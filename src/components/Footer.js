import React from "react";

export default function Footer({ title, value, setValue }) {
    return (
        <div className="flex flex-row gap-2 items-center justify-center">
            <label className="text-gray-300 text-md font-semibold px-2 pb-1">{ title}</label>
                <input type="text" className="bg-zinc-800 text-white p-2 mb-1 rounded-lg w-1/2"
                        placeholder="Subtotal" value={value} onChange={(e) => setValue(e)}  />
        </div>
    )
}