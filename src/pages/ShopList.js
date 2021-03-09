import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import './ShopList.css'
import List from '../components/List/List';

function Resources() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect()
    } else {
      console.log("Changed!")
    }
  })

  return (
    <div className='lists'>
        <div className='list'>
            <List className='shopping-list' refresh={() => setRefresh(!refresh)} type='list' title='Shopping List' />
        </div>
        <div className='list'>
            <List className='food-inventory' refresh={refresh} type='inventory' title='Food Inventory' />
        </div>
    </div>
  );
}

export default Resources;