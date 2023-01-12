import React, { PureComponent } from "react"
import InputsAndColors from "./InputsAndColors"
import { Context } from "../context"
import Icon from "./Icon"

export default class Menu extends PureComponent {

	static contextType = Context

	addColor = () => {
		const { colors, setStateColors } = this.context

		const lastId = Number(colors[colors.length - 1].id)

		localStorage.setItem("colors", JSON.stringify([...colors, { id: lastId + 1, colorName: "", color: "#ffffff" }]))
		setStateColors([...colors, { id: lastId + 1, colorName: "", color: "#ffffff" }])
	}

	render() {

		const { menuOn } = this.context

		return (
			<>
				{menuOn &&
					<>
						<div className="Menu">
							<InputsAndColors />
						</div>

						<Icon src="add" onClick={this.addColor} className="c mt" />
					</>
				}

			</>
		)
	}
}