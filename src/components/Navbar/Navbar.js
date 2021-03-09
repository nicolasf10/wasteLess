import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';
import LogButton from '../LogButton/LogButton';
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

function Navbar () {
    const [clicked, setClicked] = useState(false);

    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return(
        <nav className="NavbarItems">
            <Link onClick={() => setClicked(false)} to="/" style={{'textDecoration' : 'none'}}>
                <h1 className="navbar-logo">WasteLess</h1>
            </Link>
            <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    if (isAuthenticated) {
                        return (
                            <li key={index}>
                                <Link onClick={() => setClicked(false)} to={item.url} className={item.className}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <span style={{'cursor': 'pointer'}} onClick={() => loginWithRedirect()} className={item.className}>
                                    {item.title}
                                </span>
                            </li>
                        )
                    }
                })}
            </ul>
            <LogButton classNames={clicked ? 'logButton active' : 'logButton'} />
        </nav>
    )
}

export default Navbar