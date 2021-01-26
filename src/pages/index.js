import React, { useState } from "react";

import SEO from "../components/Seo"
import Backdrop from "../components/Backdrop"
import Content from "../components/Content"
import Loading from "../components/Loading"
import Controls from "../components/Controls"

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

  const initImage = backdropData.foreground.substring(backdropData.foreground.lastIndexOf('/') + 1)

	const [faceSize, setFaceSize] = useState(0.14)
  const [faceTravel, setFaceTravel] = useState(0.38)
  const [mouseRadius, setMouseRadius] = useState(0.3)
  const [imageData, setImageData] = useState()

  return (
    <>
      <SEO title="Paper Crane Factory" />
      <Loading />
      <Controls faceSize={faceSize} initImage={initImage} setImageData={setImageData} setFaceSize={setFaceSize} faceTravel={faceTravel} setFaceTravel={setFaceTravel} mouseRadius={mouseRadius} setMouseRadius={setMouseRadius} />
      <Backdrop imageData={imageData} data={backdropData} faceSize={faceSize} faceTravel={faceTravel} mouseRadius={mouseRadius} />
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