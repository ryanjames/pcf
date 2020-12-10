import React from 'react'
import { css } from '@emotion/react'

import SEO from "../components/Seo"
import Background from "../components/Background"
import Body from "../components/Body"

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
        <Background />
        <Body/>
      </div>
    </>
  )

}

export default IndexPage