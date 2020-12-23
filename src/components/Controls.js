import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider';
import DownChevron from '../graphics/down-chevron.svg'
import 'rc-slider/assets/index.css';
import { css } from '@emotion/react'

const controlStyles = css`
  position: absolute;
  z-index: 5;
  right: 0px;
  @media (min-width: 640px) {
    right: 80px;
  }
  top: 0;
  width: 230px;
  @media (min-width: 640px) {
    width: 280px;
  }
  color: #fff;
  .control-toggle {
    position: relative;
    cursor: pointer;
    z-index: 2;
    text-transform: uppercase;
    background: #120030;
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      width: 20px;
      height: 40px;
      background-color: #FF00F5;
      margin-right: 12px;
    } 
    svg {
      transition: all 0.2s ease-in-out;
    }
  }
  &.open .control-toggle {
    border-bottom: 1px solid #999999;
  }
  &.open .control-toggle svg {
    transform: rotate(180deg);
  }
  .controls {
    transition: z-index 0.2s step-start, transform 0.2s ease-in-out;
    position: relative;
    z-index: 1;
    transform: translateY(-100%);
    background: #120030;
  }
  &.open .controls {
    transition: z-index 0.2s step-end, transform 0.2s ease-in-out;
    transform: translateY(0);
    z-index: 3;
  }
  .control {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #999999;
    .label {
      transition: all 0.3s ease-in-out;
      background-color: #7a7a7a;
      font-size: 10px;
      width: 20px;
      height: 70px;
      position: relative;
      span {
        display: block;
        transform: rotate(-90deg);
        width: 60px;
        margin-left: -20px;
        margin-top: 28px;
        text-transform: uppercase;
        height: 14px;
        text-align: center;
        position: absolute;
      }
    }
    .label::before, .label::after {
      content: '';
      position: absolute;
      z-index: 20;
      transition: all 0.2s ease-in-out;
    }
    .label::after {
      left: 0;
      height: 0;
    }
    &:hover .label {
      background-color: #FF00F5;
      transform: translate(-6px, -6px);
      &::after {
        width: 100%;
        height: 6px;
        left: 3px;
        bottom: 0;
        transform: translatey(100%) skewx(45deg);
        background-color: #751271;
      }
      &::before {
        width: 6px;
        height: 100%;
        right: 0;
        transform: translatex(100%) skewy(45deg);
        top: 3px;
        background-color: #fa85ff;
      }
    }
    .slider {
      flex: 1;
      padding: 16px 0 0 12px;
    }
    .scale {
      width: 30px;
      font-size: 10px;
      text-align: center;
      margin-top: 5px;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .scale-grid {
      border: 1px solid #999999;
      width: 8px;
      height: 40px;
      margin-top: 2px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      position: relative;
      span {
        display: block;
        position: relative;
        z-index: 2;
        border-bottom: 1px solid #999999;
      }
      .scale-track {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 50%;
        background-color: #751271
      }
    }
    .rc-slider-track {
      background-color: #FF00F5
    }
    .rc-slider-rail {
      background-color: #751271
    }
    .rc-slider-handle {
      position: absolute;
      width: 8px;
      height: 24px;
      cursor: pointer;
      cursor: -webkit-grab;
      margin-top: -10px;
      cursor: grab;
      border-radius: 0%;
      border: transparent;
      background-color: #fff;
      touch-action: pan-x;
    }
  }
`;

const Scale = ({value, min, max}) => {
  const calcPercent = Math.round(((value - min) / (max - min)) * 100)
  return (
    <div className="scale">
      {calcPercent}%
      <div className="scale-grid">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="scale-track" style={{height: `${calcPercent}%`}} />
      </div>
    </div>
  )
}

const Control = ({label, value, min, max, set, steps}) => {

  const calculateStep = (min, max, steps) => {
    return (max - min) / steps
  }

  return (
    <div className="control">
      <div className="label"><span>{label}</span></div>
      <div className="slider">
        {label}<br />
        <Slider 
          min={min} 
          max={max} 
          step={calculateStep(min, max, steps)}
          value={value}
          onChange={(value) => set(value)}
        />
      </div>
      <Scale value={value} min={min} max={max} />
    </div>
  )
}

const Controls = ({faceSize, setFaceSize, faceTravel, setFaceTravel, mouseRadius, setMouseRadius}) => {

  const [open, setOpen] = useState(false)

  const steps = 40

  const minFaceSize = 0.03
  const maxFaceSize = 0.275

  const minRadius = 0.1
  const maxRadius = 0.6

  const minTravel = 0.1
  const maxTravel = 0.8

  const toggleControls = () => {
    setOpen(!open)
  }

  const calculateStep = (min, max, steps) => {
    return (max - min) / steps
  }

  return (
    <div css={ controlStyles } className={`controls-container ${open ? 'open' : ''}`}>
      <div className="control-toggle" onClick={toggleControls}>
        <div><DownChevron /></div>
        Controller
      </div>
      <div className="controls">
        <Control label="Size" value={faceSize} min={minFaceSize} max={maxFaceSize} set={setFaceSize} steps={steps} />
        <Control label="Radius" value={mouseRadius} min={minRadius} max={maxRadius} set={setMouseRadius} steps={steps} />
        <Control label="Travel" value={faceTravel} min={minTravel} max={maxTravel} set={setFaceTravel} steps={steps} />
      </div>
    </div>
  )
}

export default Controls