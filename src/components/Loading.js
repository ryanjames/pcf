import React, { useState, useEffect } from "react";
import LoadingBunny from '../graphics/loading-bunny.svg'
import { css } from '@emotion/react'
import observer from "../js/observer"

const loadingStyles = css`
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  opacity: 1;
  &.loaded {
    opacity: 0;
    z-index: 0;
  }
  svg {
    position: absolute;
    top: 43px;
    left: 30px;
    @media (min-width: 460px) {
      top: 71px;
      left: 58px;
    }
    @media (min-width: 768px) {
      top: 101px;
      left: 88px;
    }
    @media (min-width: 960px) {
      top: 131px;
      left: 118px;
    }
  }
`;

let cycle;
const animateBunny = () => {
  const paths = document.querySelectorAll('svg#loading-bunny g path');
  paths.forEach((path) => {
    const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16)
    path.style.fill = randomColor;
  });
  cycle = setTimeout(() => animateBunny(), 200)
}

const Loading = () => {

  const [sketchLoaded, setSketchLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  observer.subscribe("sketchLoaded:true", () => {
    setSketchLoaded(true)
  })
  observer.subscribe("bgLoaded:true", () => {
    setBgLoaded(true)
  })

  useEffect(() => {
    if(bgLoaded && sketchLoaded) {
      // console.log(allLoaded)
      clearTimeout(cycle)
    } else {
      animateBunny()
    }
  });

  return (
    <div css={ loadingStyles } className={(bgLoaded && sketchLoaded ? 'loaded' : '')} >
      <LoadingBunny />
    </div>
  )
}

export default Loading