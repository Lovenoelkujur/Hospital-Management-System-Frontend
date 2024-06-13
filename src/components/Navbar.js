import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context }  from "../index";
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

    // States 
    const [show, setShow] = useState(false);
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    

    // Handle Logout
    const handleLogout = async () => {

        await axios.get("http://localhost:9000/api/v1/user/patient/logout", {
            withCredentials : true,
        }).then(res => {
            toast.success(res.data.message);
            setIsAuthenticated(false);
        }).catch(err => {
            toast.error(err.response.data.message);
        });
        
    };

    const navigateTo = useNavigate();

    // Handle goto-Login
    const gotoLogin = () => {
        navigateTo("/login");
    }
    
    return (
    <nav className='container'>

        <div className='logo'>ZeeCare</div>

        <div className={show ? "navLinks showmenu" : "navLinks"}>

            <div className='links'>
                <Link to={"/"}>HOME</Link>
                <Link to={"/appointment"}>APPOINTMENT</Link>
                <Link to={"/about"}>ABOUT US</Link>
            </div>

            {isAuthenticated ? (
                    <button className='logoutBtn btn' onClick={handleLogout}>
                        LOGOUT
                    </button>
                ) : (
                    <button className='logoutBtn btn' onClick={gotoLogin}>
                        LOGIN
                    </button>
                )
            }
        </div>

    </nav>
  );
};

export default Navbar;