import React, { useState } from "react"
import { css } from "@emotion/react"

import Welcome from "./Welcome"
import Logo from "./Logo"
import { Link } from "gatsby"

const Content = ({ data }) => {
  const [welcomeState, setWelcomeState] = useState(false)

  const containerStyles = css`
    position: absolute;
    z-index: 3;
    top: 32px;
    left: 32px;
    bottom: 32px;
    right: 32px;

    .navigation {
      display: flex;
      flex-direction: column;
      @media (min-width: 768px) {
        flex-direction: row;
      }
    }

    @media (min-width: 460px) {
      top: 60px;
      bottom: 60px;
      left: 60px;
      right: 60px;
    }
    @media (min-width: 768px) {
      top: 90px;
      bottom: 90px;
      left: 90px;
      right: 90px;
    }
    @media (min-width: 960px) {
      top: 120px;
      bottom: 120px;
      left: 120px;
      right: 120px;
    }
  `

  const headingStyles = css`
    display: block;
    position: absolute;
    font-family: "YWFTBlackSlabbath";
    bottom: 0;
    left: 0;
    max-width: 340px;
    line-height: 1em;
    margin-bottom: 0;
    font-size: 2rem;
    text-decoration: none;
    color: ${data.headlineColor};
    transition: all 0.2s ease-in-out;
    &:hover {
      text-shadow: -10px 10px ${data.headlineDropShadowColor};
    }
    @media (min-width: 640px) {
      font-size: 3rem;
      max-width: 480px;
    }
    @media (min-width: 1024px) {
      max-width: 800px;
      font-size: 4.5rem;
    }
  `

  const menuItemStyles = css`
    width: 56px;
    height: 56px;
    font-size: 1.2rem;
    text-transform: uppercase;
    background-color: transparent;
    perspective: 1000px;
    outline: none;
    color: #000;
    .flip-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.5s;
      transform-style: preserve-3d;
    }
    &:hover {
      cursor: pointer;
      .flip-inner {
        transform: rotateY(180deg);
      }
    }
    &.jobs-link {
      font-size: 0.6rem;
      margin-top: 24px;
      @media (min-width: 768px) {
        margin-left: 24px;
        margin-top: 0;
      }
      .flip-back {
        font-size: 2rem;
        span {
          margin-top: -4px;
        }
      }
    }
    .flip-front,
    .flip-back {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
      border-radius: 50%;
      background-color: #fff;
    }
    .flip-back {
      transform: rotateY(180deg);
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  `
  const handleWelcomeClick = () => {
    setWelcomeState(!welcomeState)
  }

  return (
    <>
      <Welcome
        data={data.welcome}
        open={welcomeState}
        handleWelcomeClick={handleWelcomeClick}
      />
      <div css={containerStyles}>
        <nav className="navigation">
          <div
            role="button"
            onClick={handleWelcomeClick}
            onKeyDown={handleWelcomeClick}
            tabIndex="0"
            css={menuItemStyles}
          >
            <div className="flip-inner">
              <div className="flip-front">
                <Logo />
              </div>
              <div className="flip-back">?</div>
            </div>
          </div>
          <Link
            role="button"
            to="https://medium.com/paper-crane-factory"
            className="jobs-link"
            css={menuItemStyles}
          >
            <div className="flip-inner">
              <div className="flip-front">Work</div>
              <div className="flip-back">
                <span>★</span>
              </div>
            </div>
          </Link>
        </nav>
        <a href={data.headlineLink} css={headingStyles}>
          {data.headline}
        </a>
      </div>
    </>
  )
}

export default Content
