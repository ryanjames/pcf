import React, { useState, useEffect } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { css } from '@emotion/react'

const controlStyles = css`
  position: absolute;
  z-index: 5;
  right: 80px;
  top: 0;
  width: 280px;
  height: 240px;
  background: #120030;
  color: #fff;
  .control-toggle {
    text-transform: uppercase;
  }
`;

const Controls = ({faceSize, setFaceSize, mouseRadius, setMouseRadius}) => {

  const [open, setOpen] = useState(false)

  const toggleControls = () => {
    setOpen(!open)
  }

  return (
    <div css={ controlStyles } className={ open ? '' : 'closed'}>
      <div className="control-toggle" onClick={toggleControls}>Controller</div>
      <div className="controls">
        <div className="control-density">
          <Slider 
            min={0} 
            max={100} 
            value={faceSize}
            onChange={(value) => setFaceSize(value)}
            onAfterChange={(value) => console.log(value)}
          />
        </div>
        <div className="control-radius">
          <Slider 
            min={0} 
            max={100} 
            value={mouseRadius}
            onChange={(value) => setMouseRadius(value)}
            onAfterChange={(value) => console.log(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default Controls