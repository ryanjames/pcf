import React from 'react'
import { css } from '@emotion/react'

import SEO from "../components/seo"
import Background from "../components/background"
import Body from "../components/body"
import foreground from '../images/soup.jpg';
import background from "../images/background.jpg";

const IndexPage = () => {

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
        <Background  foreground={foreground} background={background} />
        <Body/>
      </div>
    </>
  )

}

export default IndexPage