import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import { resourcesObjOne } from './ResourcesData';

function Resources() {
  return (
    <div>
      <HeroSection {...resourcesObjOne} />
    </div>
  );
}

export default Resources;
