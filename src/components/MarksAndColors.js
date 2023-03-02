import React, { Component } from "react"
import { Context } from "../context"
import save from "../functions/save"
import Icon from "./Icon"
import InputsAndColors from "./InputsAndColors"

export default class MarksAndColors extends Component {

	static contextType = Context

	addColor = () => {
		const { colors, setAppState } = this.context

		const lastId = Number(colors[colors.length - 1].id)

		save("colors", [...colors, { id: lastId + 1, colorName: "", color: "#ffffff" }], setAppState)
	}

	render() {
		return (
			<>
				<InputsAndColors />

				<Icon src="add" onClick={this.addColor} className="c mt" />
			</>
		)
	}
}