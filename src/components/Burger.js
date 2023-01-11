import React, { PureComponent } from "react"
import Toggler from "./Toggler"

export default class Burger extends PureComponent {

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