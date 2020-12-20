import React from 'react'
import { css } from '@emotion/react'

import SEO from "../components/Seo"
import Backdrop from "../components/Backdrop"
import Content from "../components/Content"

const IndexPage = ({data}) => {

  const _data = data.allContentfulLandingPage.edges[0].node;
  const contentData = {
    headline: _data.headline,
    headlineLink: _data.headlineLink,
    welcome: _data.welcome
  }
  const backdropData = {
    background: _data.backgroundImage.file.url,
    foreground: _data.foregroundImage.file.url
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
        <Backdrop data={backdropData} />
        <Content data={contentData} />
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