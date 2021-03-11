import React, { useEffect } from 'react';
import CommunitiesFeed from '../components/Communities/CommunitiesFeed';
import { useAuth0 } from '@auth0/auth0-react';
import '../components/Communities/CommunitiesFeed.css'


function CommunitiesPosts({ match }) {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
      if (!isAuthenticated) {
        loginWithRedirect()
      }
    })

    console.log(match)

    return (
        <div className='posts-page'>
            {<CommunitiesFeed community_id={match.params.community_id} />}
        </div>
    )
}

export default CommunitiesPosts
