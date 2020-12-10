import React from 'react'
import { css } from '@emotion/react'

import SEO from "../components/SEO"
import Background from "../components/Background"
import Content from "../components/Content"
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
        <Content />
      </div>
    </>
  )

}

export default IndexPage