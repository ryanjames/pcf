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
    color: #120030;
  }
  .career {
    padding-bottom: 64px;
  }
`

const Apply = ({ subject }) => <a className="button" href={`mailto:careers@papercranefactory.com?subject=${subject}`}>Apply</a>

const CareersPage = () => (
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
      <div className="career">
        <h4>Brand Marketing Manager</h4>
        <p>We are looking for a Seattle-based brand manager who is part account side, part project manager and moonlights as a producer. As Paper Crane Factory grows into a full-service agency, we need someone partner-facing who will herd all the cats. At the same time, we need someone tirelessly curious, questioning every strategy and bringing new ideas to our incubator. Experience is a completely relative term. If you or someone you know gets excited over frustrated, we need to talk. We are looking for full time applicants but can discuss project work.</p>
        <Apply subject="Career Inquiry: Brand Marketing Manager" />
      </div>
      <div className="career">
        <h4>Art Director</h4>
        <p>Paper Crane Factory is looking for an ambitious and proficient art director who thinks in both 2D and 3D, as this role will involve experiential, digital and artistic engagements. Our projects are primarily brand launches, so everything is in play. We value curiosity more than experience, but always expect both. Conceptual exploration is as important as execution. We appreciate depth in strategic thinking and a thoughtful sense of humor. We are looking for either freelance or full time applicants.</p>
        <Apply subject="Career Inquiry: Art Director" />
      </div>
      <div className="career">
        <h4>Writer</h4>
        <p>We’re looking for a professional chameleon to help bring the voices in our diverse partner portfolio to life. Although this is a wordsmith role, nearly equally important is strength in conceptual explorations to help bring brands to market in unexpected and once-in-a-career ways. We just need it to happen every couple weeks. As stated repeatedly, we value curiosity more than experience, but always expect both. Humor in the quiver a plus. We are looking for either freelance or full time applicants.</p>
        <Apply subject="Career Inquiry: Writer" />
      </div>
      <div className="career">
        <h4>Social Content Creator</h4>
        <p>We need a creative to both develop and round out digital campaigns for our partners on the socials. This is not a community manager role, but rather someone able to respond quickly to current events and brand initiatives across all touchpoints. Strategic thinking and conceptual design go hand in hand with this one, too. We’re looking for either freelance or full time applicants.</p>
        <Apply subject="Career Inquiry: Social Content Creator" />
      </div>
      <br />
      <br />
      <h3><span>Careers:</span>Creativity Solves Everything</h3>
      <div className="career">
        <h4>LOKA</h4>
        <p>Loka is the Thai word for “world.” The brand was inspired by a trip to a filthy, plastic-littered beach in Thailand and a brief conversation with an elephant. In order to be famously successful, our brand needs to be disruptive in the devastatingly boring office supply category. We started with a dry erase marker because when bright minds step up to the whiteboard ready to change the world, we want them  thinking about the planet.</p>
        <p>Role: C-level or co-founder executive to lead final round of product development, help secure fundraising, fulfill pending orders and develop both retail and D to C sales channels.</p>
        <Apply subject="Career Inquiry: LOKA" />
      </div>
      <div className="career">
        <h4>Roanoke</h4>
        <p>Roanoke is about stories unwritten. Romantic tales of independence. Of mystery. Of guts and the proud spot of being first. Roanoke is an entrepreneurial exploration into unknowns. And our favorite part, into stories unsolved. We recently launched a few units of casual and outerwear for this new fashion brand with some exceptional tech and sleek, sophisticated design.</p>
        <p>Role: C-level or co-founder executive to help explore collaborations, marketing, maximizing the IP and sourcing both retail and D to C opportunities.</p>
        <Apply subject="Career Inquiry: Roanoke" />
      </div>
    </div>
  </div>
)

export default CareersPage
