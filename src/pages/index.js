import React from 'react'
import { css } from '@emotion/react'

import SEO from "../components/Seo"
import Backdrop from "../components/Backdrop"
import Content from "../components/Content"
import Loading from "../components/Loading"

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

  return (
    <>
      <SEO title="Paper Crane Factory" />
      <Loading />
      <Backdrop data={backdropData} />
      <Content data={contentData} />
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