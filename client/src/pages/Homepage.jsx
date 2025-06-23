import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


const Homepage = () => {
    const [showModal, setShowModal] = useState(false);
    const [allTransactions, setAllTransactions] = useState([]);
    const [frequency, setFrequency] = useState("7");
    const [selectedDate, setSelectedDate] = useState(["", ""]);
    const [type, setType] = useState("all");
    // submit new transaction details - modal
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
            const userData = JSON.parse(localStorage.getItem('user'));
            const user = userData.user; // Extract the inner user object
            if (!user || !user._id) {
                toast.error("User not found. Please login again.");
                return;
            }
            await axios.post('/transactions/add-transaction', { ...values, userid: user._id });
            toast.success("Transaction Added..");
            await getAllTransactions();   //fetch the latest
        } catch (error) {
            toast.error("Failed to add!");
            console.log("Failed to add! ==> ", error);
        }
    };
    // get all transactions
    const getAllTransactions = useCallback(async () => {
        try {
            const userID = JSON.parse(localStorage.getItem('user'));
            const user = userID.user;
            console.log('user===', user);

            const res = await axios.post('/transactions/get-transaction', {
                userid: user._id,
                frequency,
                selectedDate,
                type,
            });
            setAllTransactions(res.data);
            console.log('res.data ==> ', res.data);
        } catch (error) {
            toast.error("Failed to fetch all transaction data");
            console.log("Error in getting all transactions ==> ", error);
        }
    }, [frequency, selectedDate, type]);
    // useEffect hook
    useEffect(() => {
        getAllTransactions();
    }, [getAllTransactions]);

    return (
        <Layout>
            <ToastContainer autoClose={3000} closeOnClick pauseOnHover={false} />
            <div className='filters flex items-center justify-center'>
                <div className='flex items-center justify-end gap-5'>
                    <select id="frequency" className="bg-white-100 border border-blue-500 p-2 text-gray-900 text-sm rounded-lg" name='frequency' value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="7">Last 1 Week</option>
                        <option value="30">Last 1 Month</option>
                        <option value="365">Last 1 Year</option>
                        <option value="custom">Custom</option>
                    </select>
                    <select id="type" className="bg-white-100 border border-blue-500 p-2 text-gray-900 text-sm rounded-lg" name='type' value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expenses">Expenses</option>
                    </select>

                    {frequency === "custom" && (
                        <div className="flex gap-2 items-center">
                            <input
                                type="date"
                                value={selectedDate[0]}
                                onChange={(e) => setSelectedDate([e.target.value, selectedDate[1]])}
                                className="border p-2 rounded"
                            />
                            <span>to</span>
                            <input
                                type="date"
                                value={selectedDate[1]}
                                onChange={(e) => setSelectedDate([selectedDate[0], e.target.value])}
                                className="border p-2 rounded"
                            />
                        </div>
                    )}
                </div>
                {/* add-new button */}
                <div>
                    <button data-modal-target="static-modal" data-modal-toggle="static-modal" type="button" className="text-center text-white bg-purple-600 p-2 rounded" onClick={() => setShowModal(true)}>
                        Add New
                    </button>
                </div>
            </div>
            {/* Main modal */}
            {showModal && (
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
                                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type</label>
                                        <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='type'>
                                            <option>select</option>
                                            <option value="income">Income</option>
                                            <option value="expenses">Expenses</option>
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
            )}
            {/* table data */}
            <div className="content">
                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400 border">
                    <thead className="text-xs text-blue-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Reference</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTransactions?.map((id, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-200 dark:border-blue-700 text-black">
                                <td className="px-6 py-4">{moment(id.date).format('YYYY-MM-DD')}</td>
                                <td className="px-6 py-4">{id.amount}</td>
                                <td className="px-6 py-4">{id.reference}</td>
                                <td className="px-6 py-4">{id.category}</td>
                                <td className="px-6 py-4">{id.type}</td>
                                <td className="px-6 py-4 gap-5 flex items-center justify-start">
                                    <button type='button' className="actions">
                                        <FaRegEdit  style={{
                                        height:'20px',
                                        width:'20px'
                                    }}/>
                                    </button>
                                    <button type='button' className="actions">
                                        <MdOutlineDelete  style={{
                                        height:'20px',
                                        width:'20px'
                                    }}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout >
    )
}

export default Homepage