import React, {useState} from "react";
import SimpleHeader from "../components/SimpleHeader";
import { useListData } from "../ContextApi";
import {useNavigate} from "react-router-dom";
import HorizontalDivider from "../components/HorizontalDivider";
import Address from "../components/Address";
import ItemDescriptionView from "../components/ItemDescriptionView";
import SummaryElement from "../components/SummaryElement";
import Modal from "../components/Modal";

export default function ViewInvoice() {
  const { currentInvoiceID, listData } = useListData();
  const data = listData.find((item) => item.id === currentInvoiceID);
  const { invoice_id, status, created_on, due_on, items, address_from, address_to, taxes, shipping, subtotal, totalPrice, note, discount } = data;
  
  const navigate = useNavigate();

   const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
    return <div>
      <SimpleHeader title="View Invoice" />
      <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen">
            <div className="mx-auto  max-w-6xl p-4 sm:px-6 lg:px-8 ">
                <div className=" rounded-lg p-4  bg-gray-800">
                    <div className="grid grid-cols-2 gap-2 justify-center items-center px-2 ">
                        <Address title="Invoice From" address={address_from} />
                        <Address title="Invoice To" address={address_to} />
                    </div>
                    <HorizontalDivider />
                    <div className="grid grid-cols-4 gap-2 justify-center items-center rounded-lg">
                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Invoice ID :</label>
                            <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" readOnly
                              value={invoice_id}
                              placeholder="INV-0009" />
                        </div>

                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Invoice Status :</label>
                            <select className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" readOnly
                                value={status} >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                            </select>
                        </div>

                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Created On :</label>
                            <input type="date" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" value={created_on} readOnly />
                            
                        </div>

                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Due Date :</label>
                            <input type="date" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" value={due_on} readOnly />
                        </div>
                    </div>
                    <HorizontalDivider />

                    
                    <div className="text-gray-300 text-2xl font-bold mb-2 px-2 mt-2">Details</div>
                    <div>
                        {items.map((value, index) => {
                            return <ItemDescriptionView key={index} index={index} value={value} />
                        })}
                    </div>

                    <HorizontalDivider />
                    
                    <div className="grid grid-cols-3 gap-2 justify-center items-center rounded-lg">
                        <div className="col-span-2 flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Notes :</label>
                            <textarea className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" placeholder="Enter Notes here" value={note} readOnly />
                        </div>
              <div className="flex flex-col justify-stretch items-start">
                <SummaryElement title="Subtotal" value={subtotal} />
                <SummaryElement title="Shipping" value={shipping} />
                <SummaryElement title="Discount" value={discount} />
                <SummaryElement title="Taxes" value={taxes} />
                <SummaryElement title="Total" value={totalPrice} />
              </div>
                    </div>

                    <HorizontalDivider />
                    
                <Modal isOpen={modalIsOpen} onClose={closeModal} />

                <div className="flex gap-1 justify-end items-end rounded-lg">
                        <button onClick={()=>{navigate("/")}} className="p-2  bg-red-700 text-gray-100 rounded-lg">Back</button>
                        <button onClick={openModal} className="p-2 bg-green-500 text-gray-100 rounded-lg">Send</button>
                </div>
                </div>
                
            </div>
        </div>
  </div>;
}




