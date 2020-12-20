import React, { useEffect } from "react"
import LoadingBunny from '../graphics/loading-bunny.svg'
import { css } from '@emotion/react'

const loadingStyles = css`
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  opacity: 1;
  body.loaded & {
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

  useEffect(() => {
    const observer = new MutationObserver((mutations) => { 
      mutations.forEach((mutation) => {
        const el = mutation.target;
        if ((!mutation.oldValue || !mutation.oldValue.match(/\bloaded\b/)) 
          && mutation.target.classList 
          && mutation.target.classList.contains('loaded')){
          clearTimeout(cycle);
        } else {
          animateBunny();
        }
      });
    });
    observer.observe(document.body, { 
      attributes: true, 
      attributeOldValue: true, 
      attributeFilter: ['class'] 
    });

    animateBunny();

  });

  return (
    <div css={ loadingStyles } >
      <LoadingBunny />
    </div>
  )
}

export default Loading