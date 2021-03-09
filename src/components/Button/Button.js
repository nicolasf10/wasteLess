import React from 'react';
import './Button.css';
import { useAuth0 } from '@auth0/auth0-react';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide'];

const COLOR = ['primary', 'secondary', 'light'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor
}) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : null;

  if (isAuthenticated) {
    return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    ); } else {
      return (
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
          onClick={() => loginWithRedirect()}
          type={type}
        >
          {children}
        </button>
      )
    }
};