import React from "react"

import { Global, css } from '@emotion/react'
import SEO from "../components/Seo"
import { Link } from "gatsby"

const containerStyles = css`
  color: #ffffff;
  line-height: 170%;
  font-size: 1.3em;
  padding-top: 80px;
  @media (max-width: 768px) {
    font-size: 1em;
    line-height: 140%;
    padding-top: 0;
  }
  .menu {
    padding-top: 32px;
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
    @media (max-width: 768px) {
      padding: 0 32px;
    }
  }
  .body {
    padding-bottom: 60px;
    @media (max-width: 768px) {
      padding-top: 40px;
      padding-bottom: 0;
    }
  }
  h2 {
    margin: 64px 0;
    font-size: 1.3em;
    @media (max-width: 768px) {
      font-size: 1em;
    }
  }
  h3 {
    font-family: "YWFTBlackSlabbath";
    font-size: 4.5rem;
    color: #d2ff00;
    line-height: 90%;
    span {
      display: block;
      color: #ff00f3;
    }
    @media (max-width: 768px) {
      font-size: 2.5rem;
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
    color: #120030; }
  .career {
    padding-bottom: 64px;
  }
`

const Apply = ({ subject }) => <a className="button" href={`mailto:careers@papercranefactory.com?subject=${subject}`}>Apply</a>

const CareersPage = ({data}) => {
  const careers = data.allContentfulCareers.edges
  console.log(careers)
  return (
    <>
    <SEO title="Paper Crane Factory" />
      <div css={ containerStyles } >
        <Global
          styles={css`
            body {
              overflow: visible;
              background-color: #120030;
            }
          `}
        />
        <div className="heading">
          <div className="container">
            <nav className="menu">
              <div>
                <Link to="/">HOME</Link>&nbsp;/&nbsp;Careers
              </div>
            </nav>
          </div>
        </div>
        <div className="container body">
          <h2>
          We’re always looking for creative people. These just happen to be the roles we’re looking for, like, yesterday. The first set: Paper Crane Factory. The second: Our incubator Creativity Solves Everything. CSE takes concepts into viable products (or pretty damn close) and those listed here are ready to be run by someone better than us.</h2>
          <h3><span>Careers:</span>Paper Crane Factory</h3>
          {careers
            .filter(career => career.node.category === "Paper Crane Factory")
            .sort((a, b) => (a.node.position > b.node.position) ? 1 : -1)
            .map(career => (
              <div key={career.node.id} className="career">
                <h4>{career.node.position}</h4>
                <p>{career.node.description.description}</p>
                <Apply subject={`Career Inquiry: ${career.node.position}`} />
              </div>
            ))
          }

          <br />
          <br />
          <h3><span>Careers:</span>Creativity Solves Everything.</h3>
          {careers
            .filter(career => career.node.category === "Creativity Solves Everything")
            .sort((a, b) => (a.node.position > b.node.position) ? 1 : -1)
            .map(career => (
              <div key={career.node.id} className="career">
                <h4>{career.node.position}</h4>
                <p>{career.node.description.description}</p>
                <Apply subject={`Career Inquiry: ${career.node.position}`} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query CareersQuery {
    allContentfulCareers {
      edges {
        node {
          id
          position
          description {
            description
          }
          category
        }
      }
    }
  }
`

export default CareersPage
