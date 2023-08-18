import React, { useState } from "react";

export default function ItemDescriptionView({ index, value }) {
    
    return (
        <div className="flex flex-row justify-center items-center rounded-lg bg-gray-700 p-4 mt-2 border-2 border-gray-500">
            <div className="grid grid-cols-2 gap-4 justify-stretch items-start">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col justify-stretch items-start">
                        <label className="text-gray-300 text-md px-2 pb-1">Title</label>
                        <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12"
                            placeholder="Enter Item Title here"
                            name="title"
                            value={value.title}
                            readOnly  />
                    </div>
                    <div className="flex flex-col justify-stretch items-start">
                        <label className="text-gray-300 text-md px-2 pb-1">Description</label>
                        <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12"
                            placeholder="Enter Item Description here" 
                            name="description"
                            value={value.description}
                            readOnly 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col justify-stretch items-start">
                        <label className="text-gray-300 text-md px-2 pb-1">Quantity</label>
                        <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12"
                            placeholder="5"
                            name="quantity"
                            value={value.quantity}
                            readOnly 
                        />
                    </div>
                    <div className="flex flex-col justify-stretch items-start">
                        <label className="text-gray-300 text-md px-2 pb-1">Price</label>
                        <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12"
                            placeholder="99.99"
                            name="price"

                            value={value.price}
                            readOnly
                            
                        />
                    </div>
                    <div className="flex flex-col justify-stretch items-start">
                        <label className="text-gray-300 text-md px-2 pb-1">Total</label>
                        <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12"
                            placeholder="499.95"
                            name="total"
                            value={value.total}
                            readOnly />
                    </div>
                </div>
            </div>
        </div>
    )
}