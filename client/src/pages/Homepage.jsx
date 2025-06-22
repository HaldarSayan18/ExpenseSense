import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

const Homepage = () => {
    const [showModal, setShowModal] = useState(false);
    const [allTransactions, setAllTransactions] = useState([]);
    const [frequency, setFrequency] = useState("select");
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, seType] = useState("all");
    // submit new transaction details
    const handleModalSubmit = async (event) => {
        event.preventDefault();
        const modalData = new FormData(event.target);
        const values = {
            amount: modalData.get("amount"),
            reference: modalData.get("reference"),
            description: modalData.get("description"),
            type: modalData.get("type"),
            date: modalData.get("date"),
            category: modalData.get("category")
        };
        console.log("Modal values:", values);
        setShowModal(false);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user._id) {
                toast.error("User not found. Please login again.");
                return;
            }
            await axios.post('/transactions/add-transaction', { ...values, userid: user._id });
            toast.success("Transaction Added..");
        } catch (error) {
            toast.error("Failed to add!");
            console.log("Failed to add! ==> ", error);
        }
    };
    // table data
    // const columns = [
    //     {
    //         title: 'Amount',
    //         dateIndex: 'amount'
    //     },
    //     {
    //         title: 'Reference',
    //         dateIndex: 'reference'
    //     },
    //     {
    //         title: 'Description',
    //         dateIndex: 'description'
    //     },
    //     {
    //         title: 'Type',
    //         dateIndex: 'type'
    //     },
    //     {
    //         title: 'Category',
    //         dateIndex: 'category'
    //     },
    //     {
    //         title: 'Date',
    //         dateIndex: 'date'
    //     },
    //     {
    //         title: 'Actions',
    //         dateIndex: 'date'
    //     },
    // ]
    // get all transactions
    const getAllTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await axios.post('/transactions/get-transaction', {
                userid: user._id,
                frequency,
                selectedDate,
            });
            setAllTransactions(res.data);
            console.log(res.data);
        } catch (error) {
            toast.error("Failed to fetch all transaction data");
            console.log("Error in getting all transactions ==> ", error);
        }
    };
    // useEffect hook
    useEffect(() => {
        getAllTransactions();
    }, [frequency, selectedDate]);

    return (
        <Layout>
            <ToastContainer />
            <div className='filters flex items-center justify-center'>
                <div className='flex items-center justify-end gap-5'>
                    <select id="frequency" className="bg-white-100 border border-blue-500 p-2 text-gray-900 text-sm rounded-lg" name='frequency' value={frequency} onClick={(values) => setFrequency(values)}>
                        <option value="select">Select Frequency</option>
                        <option value="7">Last 1 Week</option>
                        <option value="30">Last 1 Month</option>
                        <option value="365">Last 1 Year</option>
                        <option value="custom">Custom</option>
                    </select>
                    {/* <div className="mb-5 flex-col items-start  justify-center">
                        <label htmlFor="from-date" className="block mb-2 text-sm font-medium">From</label>
                        <input type="date" id="from-date" className="bg-white-100 border border-blue-500 p-2 text-gray-900 text-sm rounded-lg" name='date' required />
                    </div>
                    <div className="mb-5 flex flex-col items-start  justify-center">
                        <label htmlFor="to-date" className="block mb-2 text-sm font-medium">To</label>
                        <input type="date" id="to-date" className="bg-white-100 border border-blue-500 p-2 text-gray-900 text-sm rounded-lg" name='date' required />
                    </div> */}

                    {frequency === "custom" && (
                        <div id="date-range-picker" date-rangepicker className="flex items-center" value={selectedDate} onChange={(values) => setSelectedDate(values)}>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-range-start" name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                            </div>
                            <span className="mx-4 text-gray-500">to</span>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input id="datepicker-range-end" name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-center text-white bg-purple-600 p-2 rounded" onClick={() => setShowModal(true)}>
                        Add New
                    </button>
                </div>
            </div>
            {/* Main modal */}
            {
                showModal && (
                    <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center flex bg-black bg-opacity-20 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add New Entry
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" onClick={() => setShowModal(false)}>
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                {/* Modal body */}
                                <form className="p-2 md:p-3 space-y-1 max-w-sm mx-auto" onSubmit={handleModalSubmit}>
                                    {/* section 1 */}
                                    <div className='grid md:grid-cols-2 md:gap-3'>
                                        {/* amount */}
                                        <div className="mb-5">
                                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Amount</label>
                                            <input type="text" id="amount" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="0.00" name='amount' required />
                                        </div>
                                        {/* reference */}
                                        <div className="mb-5">
                                            <label htmlFor="reference" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reference</label>
                                            <input type="text" id="reference" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder='reference' name='reference' required />
                                        </div>
                                    </div>
                                    {/* section 2 */}
                                    <div className='grid md:grid-cols-2 md:gap-3'>
                                        {/* description */}
                                        <div className="mb-5">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <input type="text" id="description" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder='description' name='description' required />
                                        </div>
                                        {/* date */}
                                        <div className="mb-5">
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                            <input type="date" id="date" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" name='date' required />
                                        </div>
                                    </div>
                                    {/* section 3 */}
                                    <div className='grid md:grid-cols-2 md:gap-3'>
                                        {/* types */}
                                        <div className="mb-5">
                                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select type</label>
                                            <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='type'>
                                                <option>select</option>
                                                <option>Income</option>
                                                <option>Expenses</option>
                                            </select>
                                        </div>
                                        {/* categories */}
                                        <div className="mb-5">
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='category'>
                                                <option>select</option>
                                                <option>Salary</option>
                                                <option>Tip</option>
                                                <option>Project</option>
                                                <option>Foods</option>
                                                <option>Movies</option>
                                                <option>Bills</option>
                                                <option>Medical</option>
                                                <option>Fees</option>
                                                <option>Taxes</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* Modal footer */}
                                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button data-modal-hide="static-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="content">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3" render={(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>}>Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Reference</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTransactions?.map((id, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{id.amount}</td>
                                <td className="px-6 py-4">{id.reference}</td>
                                <td className="px-6 py-4">{id.category}</td>
                                <td className="px-6 py-4">{id.type}</td>
                                <td className="px-6 py-4">{id.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout >
    )
}

export default Homepage