import React from "react"
import { css } from '@emotion/react';

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

const Controls = () => {

  return (
    <div css={ controlStyles }>
      <div className="control-toggle">Controller</div>
      <div className="controls">
        <div className="control-density">Size</div>
        <div className="control-radius">Spread</div>
      </div>
    </div>
  )
}

export default Controls
