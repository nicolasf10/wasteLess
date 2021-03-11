import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import { covidObjOne } from './CovidGuidelinesData';

function CovidGuidelines() {
    return (
        <div>
            <HeroSection {...covidObjOne} />
        </div>
    )
}

export default CovidGuidelines
