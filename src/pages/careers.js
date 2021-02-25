import React from "react"

import { css } from '@emotion/react'
import SEO from "../components/Seo"
import { Link } from "gatsby"

const containerStyles = css`
  height: 100vh;
  background-color: #120030;
  color: #ffffff;
  line-height: 170%;
  font-size: 1.3em;
  padding-top: 160px;
  overflow: scroll;
  .menu {
    padding-top: 130px;
    div {
      border-bottom: 1px solid #979797;
      padding-bottom: 8px;
    }
    a {
      color: #ff00f3;
      text-decoration: none;
    }
  }
  .heading {
    position: fixed;
    background-color: #120030;
    width: 100%;
    top: 0;
  }
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 120px;
  }
  h2 {
    margin: 64px 0;
    font-size: 1.3em;
  }
  h3 {
    font-family: "YWFTBlackSlabbath";
    font-size: 4.5rem;
    color: #d2ff00;
    span {
      display: block;
      color: #ff00f3;
    }
  }
  h4, p {
    margin: 0;
  }
  h4 {
    color: #d2ff00
  }
  p {
    margin-bottom: 1.3em;
  }
  .button {
    font-size: 0.8em;
    text-transform: uppercase;
    border-radius: 32px;
    padding: 16px 32px;
    background-color: #fff;
    text-decoration: none;
    color: #120030;
  }
  .career {
    padding-bottom: 64px;
  }
`

const CareersPage = () => (
  <div css={ containerStyles } >
    <div className="heading">
      <div className="container">
        <nav className="menu">
          <div>
            <Link to="/">HOME</Link>&nbsp;/&nbsp;Careers
          </div>
        </nav>
      </div>
    </div>
    <div className="container">
      <h2>We are a team of humans that push harder than actual logic. It’s like trying to imagine something cuter than an internet kitten. It’s like trying to imagine something cuter than an internet kitten.</h2>
      <h3><span>Careers:</span>Paper Crane Factory</h3>
      <div className="career">
        <h4>Career: Account Director</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="button" href="">Apply</a>
      </div>
      <div className="career">
        <h4>Career: Account Director</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="button" href="">Apply</a>
      </div>
      <div className="career">
        <h4>Career: Account Director</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="button" href="">Apply</a>
      </div>
      <div className="career">
        <h4>Career: Account Director</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="button" href="">Apply</a>
      </div>
      <br />
      <br />
      <h3><span>Careers:</span>Creativity Solves Everything</h3>
      <div className="career">
        <h4>Career: Account Director</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="button" href="">Apply</a>
      </div>
      <div className="career">
        <h4>Career: Account Director</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <a className="button" href="">Apply</a>
      </div>
    </div>
  </div>
)

export default CareersPage
