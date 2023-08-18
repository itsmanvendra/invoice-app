import React from 'react';
import Header from '../components/Header';
import Analysis from '../components/Analysis';
import { useListData } from '../ContextApi';
import Table from '../components/Table';


export default function List() {
    const { listData } = useListData();
    const calculatePercentage = (status) => {
        let count = 0;
        listData.forEach((item) => {
            if (item.status === status) {
                count++;
            }
        })
        return (count / listData.length) * 100;
    }
    const calculateLength = (status) => {
        let count = 0;
        listData.forEach((item) => {
            if (item.status === status) {
                count++;
            }
        })
        return count;
    }

    
    return (
        <div className='bg-gradient-to-r from-[#0F172A] to-[#193051] min-h-screen'>
            <Header />
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-row justify-center items-center m-4 rounded-md  border-solid bottom-1 divide-dashed divide-x divide-slate-500'>
                <Analysis percentage={100} name="Total" icon="faFile" color="#71717a" numInvoices={listData.length} />
                <Analysis percentage={calculatePercentage('paid')} name="Paid" icon="faFileCircleCheck" color="#16a34a" numInvoices={calculateLength('paid')} />
                <Analysis percentage={calculatePercentage('pending')} name="Pending" icon="faHourglassStart"  color="#facc15" numInvoices={calculateLength('pending')} />
                <Analysis percentage={calculatePercentage('overdue')} name="Overdue" icon="faBell" color="#c2410c" numInvoices={calculateLength('overdue')} />
                </div>
            </div>
            <Table data={listData} />
            
        </div>
    );
}