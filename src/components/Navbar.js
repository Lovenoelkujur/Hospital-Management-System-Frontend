import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context }  from "../index";
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

    // States 
    const [show, setShow] = useState(false);
    const {isAuthenticated} = useContext(Context);

    // Handle Logout
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:9000/api/v1/user/patient/logout", {
                withCredentials : true,
            }).then(res => {
                toast.success(res.data.message);
            })
        } 
        catch (error) {
            
        }
    };

    // Handle goto Login
    const gotoLogin = async () => {}
    
    return (
    <nav className='container'>

        <div className='logo'>ZeeCare</div>

        <div className={show ? "navLinks showmenu" : "navLinks"}>
            <Link to={"/"}>HOME</Link>
            <Link to={"/appointment"}>APPOINTMENT</Link>
            <Link to={"/about"}>ABOUT US</Link>
        </div>
        {
            isAuthenticated ? (
                <button className='logoutBtn btn' onClick={handleLogout}>
                    LOGOUT
                </button>
            ) : (
                <button className='logoutBtn btn' onClick={gotoLogin}>
                    LOGIN
                </button>
            )
        }


    </nav>
  )
}

export default Navbar;