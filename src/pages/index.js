import React from 'react'
import { css } from '@emotion/react'

import SEO from "../components/Seo"
import Background from "../components/Background"
import Body from "../components/Body"

const IndexPage = ({data}) => {

  const content = data.allContentfulLandingPage.edges[0].node;
  const bodyContent = {
    headline: content.headline,
    headlineLink: content.headlineLink,
    welcome: content.welcome.welcome
  }
  const backgroundContent = {
    background: content.backgroundImage.file.url,
    foreground: content.foregroundImage.file.url
  }

  const loadedStyles = css`
    transition: all 1s ease-in-out;
    opacity: 0;
    body.loaded & {
      opacity: 1;
    }
  `;

  return (
    <>
      <SEO title="Paper Crane Factory" />
      <div css={ loadedStyles } >
        <Background content={backgroundContent} />
        <Body content={bodyContent} />
      </div>
    </>
  )

}

export const query = graphql`
  query PCFQuery {
    allContentfulLandingPage {
      edges {
        node {
          headline
          headlineLink
          foregroundImage {
            file {
              url
            }
          }
          backgroundImage {
            file {
              url
            }
          }
          welcome {
            welcome
          }
        }
      }
    }
  }
`

export default IndexPage