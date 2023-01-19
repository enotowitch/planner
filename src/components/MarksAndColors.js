import React, { Component } from "react"
import InputsAndColors from "./InputsAndColors"
import OnOff from "./OnOff"

export default class MarksAndColors extends Component {
	render() {
		return (
			<>
				<OnOff text="COLOR MEMO" />

				<InputsAndColors />
			</>
		)
	}
}