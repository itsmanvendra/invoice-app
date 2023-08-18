import React, {useRef, useState} from "react";
import SimpleHeader from "../components/SimpleHeader";
import ItemDescription from "../components/ItemDescription";
import HorizontalDivider from "../components/HorizontalDivider";
import Footer from "../components/Footer";
import SummaryElement from "../components/SummaryElement";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useListData } from "../ContextApi";

export default function CreateInvoice() {
    let {id, setId, listData, setListData} = useListData()
    const [total, setTotal] = useState(0);
    const [invoice_id, setInvoice_id] = useState("");
    const [status, setStatus] = useState("paid");
    const [created_on, setCreated_on] = useState("");
    const [due_on, setDue_on] = useState("");
    const [address_from, setAddress_from] = useState("");
    const [address_to, setAddress_to] = useState("");
    const [notes, setNotes] = useState("");
    const [subtotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState("");
    const [discount, setDiscount] = useState("");
    const [taxes, setTaxes] = useState("");
    const [items, setItems] = useState([
        {
            description: "",
            title: "", quantity: "", price: "", total: ""
        }]);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { value } = e.target;
        setInvoice_id(value);
    };

    const addItem = () => {
        console.log(items);
        setItems([...items, { description: "", title: "", quantity: "", price: "", total: "" }]);
    }
    
    const removeItem = (index) => {
        console.log(index);
        const newInputValues = [...items];
        newInputValues.splice(index, 1);
        const initialTotal = 0;
        const subtotalX = newInputValues.reduce((acc, item) => acc + Number(item.total), initialTotal)
        const finalAmount = Number(subtotalX) + Number(shipping) + Number(taxes) - Number(discount);

        console.log(newInputValues);
        setSubTotal(subtotalX)
        setTotal(finalAmount)
        setItems(newInputValues);
    }

    const setShippingValue = (e) => {
        setShipping(e.target.value);
        setTotal(Number(subtotal) + Number(e.target.value) + Number(taxes) - Number(discount))
    }

    const setDiscountValue = (e) => {
        setDiscount(e.target.value);
        setTotal(Number(subtotal) + Number(shipping) + Number(taxes) - Number(e.target.value))
    }

    const setTaxesValue = (e) => {
        setTaxes(e.target.value);
        setTotal(Number(subtotal) + Number(shipping) + Number(e.target.value) - Number(discount))
    }
    

    const handleItemInputChange = (index, event) => {
        const newInputValues = [...items];
        if (event.target.name === "quantity" || event.target.name === "price") {
            if (event.target.name === "quantity") {
                newInputValues[index]["quantity"] = event.target.value;
                newInputValues[index]["total"] = Number(newInputValues[index]["quantity"]) * Number(newInputValues[index]["price"]);
            }
            else if (event.target.name === "price") {
                newInputValues[index]["price"] = event.target.value;
                newInputValues[index]["total"] = Number(newInputValues[index]["quantity"]) * Number(newInputValues[index]["price"]);
            }
        }
        else {
            newInputValues[index][event.target.name] = event.target.value;
        }
        const initialTotal = 0;
        const subtotalX = newInputValues.reduce((acc, item) => acc + Number(item.total), initialTotal)
        const finalAmount = Number(subtotalX) + Number(shipping) + Number(taxes) - Number(discount);

        console.log(newInputValues);
        setSubTotal(subtotalX)
        setTotal(finalAmount)
        setItems(newInputValues);
    };
    
    const handleDiscard = () => {
        setAddress_from("");
        setAddress_to("");
        setCreated_on("");
        setDue_on("");
        setInvoice_id("");
        setStatus("");
        setItems([{
            description: "",
            title: "", quantity: "", price: "", total: ""
        }]);
        setNotes("");
        setShipping("");
        setTaxes("");
        setDiscount("");
        setTotal("");
        setSubTotal("");
        navigate("/");

    }
    const handleSave = () => {
        
        if (due_on === "" || created_on === "" || invoice_id === "" || status === "" || address_from === "" ||items.length === 0) {
            enqueueSnackbar("Please fill all the fields", {
                variant: "error",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                autoHideDuration: 1500,
            });
            return;
        }
        let data = 
            {
        "id": id,
        "name": "David Wilson",
        "created_on": created_on,
        "due_on": due_on,
        "amount": total,
        "status": status,
        "invoice_id": invoice_id,
        "note": notes,
        "address_from": address_from,
        "address_to": address_to,
        "items": items,
        "totalPrice": total,
        "shipping": shipping,
        "discount": discount,
        "taxes": taxes,
        "subtotal": subtotal
        }
        const newListData = [...listData, data];
        setListData(newListData);
        setId(id + 1);
        enqueueSnackbar("Invoice Generated",  {
            variant: "success",
            anchorOrigin: {
            vertical: "top",
            horizontal: "right",
            },
            autoHideDuration: 1500,
        })
        navigate("/");
        
    }

    return <div>
        <SimpleHeader title="Create Invoice" />
        <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen">
            <div className="mx-auto  max-w-6xl p-4 sm:px-6 lg:px-8 ">
                <div className=" rounded-lg p-4  bg-gray-800">
                    <div className="grid grid-cols-2 gap-2 justify-center items-center px-2 ">
                        <div className="flex flex-col justify-center items-center ">
                            <label className="text-gray-300  text-2xl  font-bold mb-2 px-2">Invoice From </label>
                            <textarea className="rounded-lg w-11/12 h-32 p-2 bg-zinc-700 text-white" placeholder="Enter Your address here" value={address_from}
                                onChange={(e) => setAddress_from(e.target.value)} />
                        </div>
                        <div className="flex flex-col justify-center items-center ">
                            <label className="text-gray-300 text-2xl font-bold mb-2 px-2">Invoice To </label>
                            <textarea className=" rounded-lg w-11/12 h-32 p-2 bg-zinc-700 text-white" placeholder="Enter Customer address here" value={address_to}
                                onChange={(e) => setAddress_to(e.target.value)} />
                        </div>
                    </div>
                    <HorizontalDivider />
                    <div className="grid grid-cols-4 gap-2 justify-center items-center rounded-lg">
                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Invoice ID :</label>
                            <input type="text" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" value={invoice_id}
                            onChange={handleInputChange}
                            placeholder="INV-0009" />
                        </div>

                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Invoice Status :</label>
                            <select className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" value={status} onChange={(e) => { setStatus(e.target.value) }} placeholder="Select Status">
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                            </select>
                        </div>

                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Created On :</label>
                            <input type="date" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" value={created_on} onChange={(e) => setCreated_on(e.target.value)} />
                            
                        </div>

                        <div className="flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Due Date :</label>
                            <input type="date" className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" value={due_on} onChange={(e) => setDue_on(e.target.value)} />
                        </div>
                    </div>
                    <HorizontalDivider />

                    
                    <div className="text-gray-300 text-2xl font-bold mb-2 px-2 mt-2">Details</div>
                    <div>
                        {items.map((value, index) => {
                            return <ItemDescription key={index} index={index} value={value} onInputChange={handleItemInputChange} removeItem={removeItem} />
                        })}
                    </div>
                    
                    <button onClick={addItem} className="p-2 mx-4 my-2 bg-blue-500 text-gray-100 rounded-lg">Add Item</button>

                    <HorizontalDivider />
                    
                    <div className="grid grid-cols-3 gap-2 justify-center items-center rounded-lg">
                        <div className="col-span-2 flex flex-col justify-stretch items-start">
                            <label className="text-gray-300 text-md px-2 pb-1">Notes :</label>
                            <textarea className="bg-zinc-800 text-white p-2 rounded-lg w-11/12" placeholder="Enter Notes here" value={notes} onChange={(e) => setNotes(e.target.value) } />
                        </div>
                        <div className="flex flex-col justify-stretch items-start">
                            <SummaryElement title="Subtotal" value={subtotal} />
                            <Footer title="Shipping" value={shipping} setValue={setShippingValue} />
                            <Footer title="Discount" value={discount} setValue={setDiscountValue} />
                            <Footer title="Taxes" value={taxes} setValue={setTaxesValue} />
                            <SummaryElement title="Total" value={total} />
                        </div>
                    </div>

                    <HorizontalDivider />
                    



                </div>
                <div className="flex justify-end items-end rounded-lg">
                        <button onClick={handleDiscard} className="p-2  bg-red-700 text-gray-100 rounded-lg">Discard</button>
                        <button onClick={handleSave} className="p-2 bg-green-500 text-gray-100 rounded-lg">Save</button>
                </div>
            </div>
        </div>
    </div>;
}
