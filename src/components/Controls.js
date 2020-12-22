import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import observer from '../js/observer'

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

  const [open, setOpen] = useState(false)
  const toggleControls = () => {
    setOpen(!open)
  }
  useEffect(() => observer.publish(`controls:${open ? 'open' : 'close'}`), [open])

  return (
    <div css={ controlStyles } className={ open ? '' : 'closed'}>
      <div className="control-toggle" onClick={toggleControls}>Controller</div>
      <div className="controls">
        <div className="control-density">Size</div>
        <div className="control-radius">Spread</div>
      </div>
    </div>
  )
}

export default Controls