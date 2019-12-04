import React from 'react'

import logoNavBar from '../assets/LOGO_black.svg';
import userPlaceholder from '../assets/User_placeholder.svg';

function NavBar() {
    const user = JSON.parse(localStorage.getItem('user'));

    function handleLogOut() {
        localStorage.removeItem('user')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a href="/home" className="navbar-brand">
                <img src={logoNavBar} alt="logo" />
            </a>
            <ul className="navbar-nav top-right">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={userPlaceholder} width="30" height="30" className="d-inline-block align-right" alt="" />
                        {user.username}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#" onClick={handleLogOut}>Sign Out</a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;