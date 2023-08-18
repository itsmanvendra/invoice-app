import React, {useState, useContext, createContext} from 'react';
import data from './MockData.json'
const ListData = createContext();
export const useListData = () => useContext(ListData);

export const ListDataProvider = ({ children }) => {
    
    const [listData, setListData] = useState(data);
    const [currentInvoiceID, setCurrentInvoiceID] = useState(12);
    const [id, setId] = useState(100)


    return (
        <ListData.Provider value={{ listData, setListData, currentInvoiceID, setCurrentInvoiceID, id, setId }}>
            {children}
        </ListData.Provider>
    );
}