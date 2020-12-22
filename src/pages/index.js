import React, { useState, useEffect } from "react";

import SEO from "../components/Seo"
import Backdrop from "../components/Backdrop"
import Content from "../components/Content"
import Loading from "../components/Loading"
import Controls from "../components/Controls"
import observer from "../js/observer"

const IndexPage = ({data}) => {

  const [sketchLoaded, setSketchLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

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

  observer.subscribe("sketchLoaded:true", () => {
    setSketchLoaded(true)
  })
  observer.subscribe("bgLoaded:true", () => {
    setBgLoaded(true)
  })

  useEffect(() => {
    if(bgLoaded && sketchLoaded) {
      // console.log(allLoaded)
    }
  })

  return (
    <>
      <SEO title="Paper Crane Factory" />
      <Loading />
      <Controls />
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