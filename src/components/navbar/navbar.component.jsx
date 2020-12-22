import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

const NavbarComponent = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <Link to="/"><img src="../assets/logo.png" alt="Ohm Studio"></img></Link>
                </div>
            </nav>
        </div>
    );
}

export default NavbarComponent;