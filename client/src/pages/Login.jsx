import React, { useEffect } from 'react'
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    // form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const values = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        try {
            const { data } = await axios.post('/users/login', values);
            toast.success('Logged In Successfully! ✅', {
                // autoClose: 2000,
                position: "top-center",
                onClose: () => navigate('/'),
            });
            localStorage.setItem('user', JSON.stringify({ ...data, password: "" }));
        } catch (error) {
            toast.error("Invalid credentials. Please try again.", {
                position: "top-center"
            });
            console.log("Login error =>", error);
        };
        console.log("Form values in login:", values);
    };

    // prevent for login user & protect the route
    useEffect(() => {
        const users = localStorage.getItem("user");
        console.log('users====>',users);
        if (users) {            
            navigate('/');
        }
    }, [navigate]);


    return (
        <>
            <ToastContainer />
            <form className="login-page max-w-sm mx-auto" onSubmit={handleSubmit}>
                <h1 className='text-center'>Login Form</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <div className='flex login-page-btns'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <Link to='/register'><button type="button" className="text-white bg-red-100 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-red-800">Register Here</button></Link>
                </div>
            </form>
        </>
    )
}

export default Login
