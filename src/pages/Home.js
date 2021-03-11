import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import Profile from '../components/Profile';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour, homeObjFive } from './HomeData';

function Home() {
  return (
    <div className="App">
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjFour} />
      <HeroSection {...homeObjFive} />
    </div>
  );
}

export default Home;
