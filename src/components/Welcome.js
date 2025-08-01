import React from 'react'
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import Close from '../graphics/close.svg'

const Welcome = ({ data, open, handleWelcomeClick }) => {

  const welcomeStyles = css`
    position: absolute;
    transition: transform 0.25s ease-in-out;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    width: 100%;
    background-color: #120030;
    z-index: 5;
    color: #ffffff;
    box-sizing: border-box;
    padding: 80px 32px 32px;
    line-height: 150%;
    font-size: 1rem;
    @media (min-width: 360px) {
      padding: 32px 92px 32px 32px;
    }
    @media (min-width: 360px) {
      padding: 48px 92px 48px 48px;
    }
    @media (min-width: 768px) {
      padding: 64px 92px 64px 64px;
      font-size: 1.25rem;
    }
    @media (min-width: 960px) {
      line-height: 130%;
      font-size: 1.75rem;
      padding: 60px 120px;
    }
    p {
      margin: 0;
    }
    a {
      color: #EA33EC;
      outline: none;
    }
    &.open {
      transform: translateY(0);
    }
  `;
  
  const closeStyles = css`
    position: absolute;
    top: 32px;
    right: 32px;
    opacity: 0.8;
    &:hover {
      cursor: pointer;
    }
  `;

  return (
    <div css={ welcomeStyles } className={open ? 'open' : ''}>
      <p dangerouslySetInnerHTML={{ __html: data.welcome }} />
      <Close css={ closeStyles } onClick={handleWelcomeClick} />
    </div>
  )
}

Welcome.propTypes = {
  open: PropTypes.bool,
}

Welcome.defaultProps = {
  open: false,
}

export default Welcome