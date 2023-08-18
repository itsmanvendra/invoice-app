
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
    const Modal = ({ isOpen, onClose }) => {
        const [inputValue, setInputValue] = useState('');
        const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (event) => {
    setInputValue(event.target.value);
    };

        const handleSend = () => {
            if (inputValue === '') {
                enqueueSnackbar('Please enter an email address', {
                    variant: "error",
                    anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                autoHideDuration: 1500,
                });
                return;
            }
            else if (!inputValue.includes('@')) {
                enqueueSnackbar('Please enter a valid email address', {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                    },
                    autoHideDuration: 1500,
                });
                return;
            }

             // Perform send action here (e.g., send inputValue to server)
            console.log('Sending:', inputValue);
            enqueueSnackbar('Email sent successfully', {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                autoHideDuration: 1500,
            });
            onClose();
        };

    return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black opacity-60" onClick={onClose}></div>
        <div className="bg-white p-4 rounded-md shadow-md z-10 w-3/5">
        <h2 className="text-xl font-semibold mb-4">Send Mail via Email</h2>
        <input
            type="text"
            className="border rounded p-2 w-full mb-4"
            placeholder="Enter email address"
            value={inputValue}
            onChange={handleInputChange}
        />
        <div className="flex justify-end">
            <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={onClose}
            >
            Discard
            </button>
            <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSend}
            >
            Send
            </button>
        </div>
        </div>
    </div>
    );
};

export default Modal;
