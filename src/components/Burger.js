import React, { Component } from "react"
import Toggler from "./Toggler"

export default class Burger extends Component {

	render() {
		return (
			<Toggler defaultState={false}>
				{(on, toggle) => (
					<div className={`icon burger-icon ${on ? "open" : ""}`} onClick={toggle} >
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div >
				)}
			</Toggler>
		)
	}
}