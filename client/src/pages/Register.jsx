import React, { useEffect } from 'react'
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    // form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Accessing values manually
        const formData = new FormData(event.target);
        const values = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("repeat-password"),
            terms: formData.get("terms")
        };
        const { password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", {
                position: "top-center"
            });
            return;
        }
        try {
            await axios.post('/users/register', values, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // toast.success('Registration Successful 📝', {
            //     position: "top-center",
            // });
            // setTimeout(() => {
            //     navigate('/login');
            // }, 2000);
            alert("Registratin successfull")
            navigate('/login');
        } catch (error) {
            toast.error("Error!!. Please try again.", {
                position: "top-center"
            });
            console.log("Registration error =>", error);
        }
        console.log("Form values:", values);
    };

    // prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <ToastContainer />
            <form className="registration-page max-w-sm mx-auto" onSubmit={handleSubmit}>
                <h1 className='text-center'>Registration Form</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Full Name</label>
                    <input type="text" id="name" name='name' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Full Name" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                    <input type="email" id="email" name='email' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Enter Your Unique Email Id" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
                    <input type="password" id="password" name='password' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder='Enter you password' required />
                </div>
                <div className="mb-5">
                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm password</label>
                    <input type="password" id="repeat-password" name='repeat-password' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder='Re-enter you password' required />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-purple-500">I agree with the <Link to="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link></label>
                </div>
                <div className='flex register-page-btns'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                    <Link to='/login'><button type="button" className="text-white bg-red-100 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-red-800">Login Here</button></Link>
                </div>
            </form>
        </>
    )
}

export default Register