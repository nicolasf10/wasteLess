import React from 'react';
import './HeroSection.css';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function HeroSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  buttonLink,
  list,
  img,
  alt,
  imgStart
}) {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  {description}
                </p>
                <ul className='home__hero-ul'>
                  {list.map(item => (
                    <li>{item}</li>
                  ))}
                </ul>
                {!isAuthenticated ?
                <Button buttonSize='btn--wide' buttonColor='primary'>
                    {buttonLabel}
                </Button> :
                <Link to={buttonLink}>
                <Button buttonSize='btn--wide' buttonColor='primary'>
                  {buttonLabel}
                </Button>
                </Link>
                }
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                {img}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;