import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import observer from '../js/observer'
import Sketch from "../js/Sketch";

const BackdropComponent = ({ className, data, faceSize, faceTravel, mouseRadius }) => {

	const [sketchLoaded, setSketchLoaded] = useState(false)
	const [bgLoaded, setBgLoaded] = useState(false)

  useEffect(() => {
		observer.publish(`sketchLoaded:${sketchLoaded? true : false}`)
		observer.publish(`bgLoaded:${bgLoaded? true : false}`)

		const background = new Image()
		const loadBackground = (image) => {
			background.src = image
			background.onload = () => {
				document.getElementById('backdrop').appendChild(background);
			}
		}

		if(!bgLoaded) {
			setBgLoaded(true)
			loadBackground(data.background)
		} 

		const sketch = new Sketch()
		sketch.init(document.getElementById('sketch'), data.foreground, 0.09, 0.5, 0.3, setSketchLoaded)

		sketch.faceSize = faceSize
		sketch.mouseRadius = mouseRadius
		sketch.faceTravel = faceTravel

	})

	return (
	<div id="backdrop" className={`${className} ${bgLoaded && sketchLoaded ? 'loaded' : ''}`}>
		<canvas id="sketch" />
	</div>
	)
}

BackdropComponent.propTypes = {
	data: PropTypes.object
}

const Backdrop = styled(BackdropComponent)`
	opacity: 0;
	div, canvas {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	div { z-index: 1; }
	canvas { z-index: 2; }
	img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&.loaded {
		opacity: 1;
	}
`

export default Backdrop