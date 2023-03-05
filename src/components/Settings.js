import React, { Component } from "react"
import OnOff from "./OnOff"

export default class Settings extends Component {
	render() {
		return (
			<>
				<OnOff text="color memo" />
				<OnOff text="day hover" />
			</>
		)
	}
}