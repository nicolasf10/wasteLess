import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LogButton.css';

const LogButton = (props) =>  {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    if (!isAuthenticated) {
        return (
            <button className={props.classNames} onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    } else {
        return (
        <button className={props.classNames} onClick={() => logout()}>
            Log Out
        </button>
    )
    }
}

export default LogButton