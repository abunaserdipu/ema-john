import React from 'react';
import { useContext, useState } from "react";
import { userContext } from "../../App";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import './header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt="Logo"/>
            <nav><Link to="/shop">Shop</Link><Link to="/review">Order Review</Link><Link to="/management">Management Inventory</Link>
            <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;