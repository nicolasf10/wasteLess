import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import { resourcesObjOne } from './ResourcesData';
import { useAuth0 } from '@auth0/auth0-react';

function Resources() {

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect()
    }
  })

  return (
    <div>
      <HeroSection {...resourcesObjOne} />
    </div>
  );
}

export default Resources;
