import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import observer from '../js/observer'
import Sketch from "../js/Sketch";

const BackdropComponent = ({ className, data }) => {

	const [sketchLoaded, setSketchLoaded] = useState(false)
	const [bgLoaded, setBgLoaded] = useState(false)

	const sketch = new Sketch()
	const background = new Image()

	const loadBackground = (image) => {
		background.src = image
		background.onload = () => {
			document.getElementById('backdrop').appendChild(background);
		}
	}

  useEffect(() => {
		observer.publish(`sketchLoaded:${sketchLoaded? true : false}`)
		observer.publish(`bgLoaded:${bgLoaded? true : false}`)

		if(!bgLoaded) {
			setBgLoaded(true)
			loadBackground(data.background)
		} 

		sketch.init(document.getElementById('sketch'), data.foreground, 0.09, 0.3, setSketchLoaded)

		// sketch.faceSize = 0.19
		// sketch.mouseRadius = 0.1

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