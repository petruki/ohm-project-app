import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../images/logo.png';

import './navbar.css';

const NavbarComponent = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div id="ohm-nav" className="navbar-nav">
                    <Link to="/ohm-project-app"><img src={logoImg} alt="Ohm Studio"></img></Link>
                </div>
            </nav>
        </div>
    );
}

export default NavbarComponent;