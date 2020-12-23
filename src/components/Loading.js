import React, { useState, useEffect } from "react";
import LoadingBunny from '../graphics/loading-bunny.svg'
import { css } from '@emotion/react'
import observer from "../js/observer"

const loadingStyles = css`
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 6;
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


const Loading = () => {

  const [sketchLoaded, setSketchLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bunnyInt, setBunnyInt] = useState();
  let paths

  observer.subscribe("sketchLoaded:true", () => {
    setTimeout(() => {
      setSketchLoaded(true)
    }, 1500)
  })
  observer.subscribe("bgLoaded:true", () => {
    setTimeout(() => {
      setBgLoaded(true)
    }, 1500)
  })

  useEffect(() => {

    paths = document.querySelectorAll('svg#loading-bunny g path');

    if(bgLoaded && sketchLoaded) {
      clearInterval(bunnyInt);
    } else {
      const bunnyCycle = setInterval(() => {
        paths.forEach((path) => {
          const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16)
          path.style.fill = randomColor;
        })
        setBunnyInt(bunnyCycle);
      }, 300)
    }
  }, [bunnyInt]);

  return (
    <div css={ loadingStyles } className={(bgLoaded && sketchLoaded ? 'loaded' : '')} >
      <LoadingBunny />
    </div>
  )
}

export default Loading