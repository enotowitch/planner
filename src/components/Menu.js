import React, { Component } from "react"
import InputsAndColors from "./InputsAndColors"
import { Context } from "../context"
import Icon from "./Icon"
import save from "../functions/save"

export default class Menu extends Component {

	static contextType = Context

	addColor = () => {
		const { colors, setAppState } = this.context

		const lastId = Number(colors[colors.length - 1].id)

		save("colors", [...colors, { id: lastId + 1, colorName: "", color: "#ffffff" }], setAppState)
	}

	render() {

		const { menuOn } = this.context
		const { addColor } = this

		return (
			<>
				{menuOn &&
					<>
						<div className="Menu">
							<InputsAndColors />
						</div>

						<Icon src="add" onClick={addColor} className="c mt" />
					</>
				}

			</>
		)
	}
}