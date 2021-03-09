import React, { useEffect } from 'react';
import CommunitiesList from '../components/Communities/CommunitiesList';
import { useAuth0 } from '@auth0/auth0-react';

const Communities = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
          loginWithRedirect()
        }
      })

    return (
        <div>
            <CommunitiesList/>
        </div>
    )
}

export default Communities
