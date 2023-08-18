import React from "react";


export default function SimpleHeader({title}) {
    return (
        <>
            <header className="bg-gray-900 py-4  flex justify-center items-center">
                <div className="ml-6">
                    <h1 className="text-white text-3xl font-bold">{title}</h1>
                </div>
                
            </header>
        </>
    )
}