import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='content'>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout