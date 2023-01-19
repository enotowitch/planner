import React, { Component } from "react"
import InputsAndColors from "./InputsAndColors"
import { Context } from "../context"
import Icon from "./Icon"
import save from "../functions/save"
import OnOff from "./OnOff"
import TasksAndSubTasks from "./TasksAndSubTasks"
import MarksAndColors from "./MarksAndColors"

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
							<TasksAndSubTasks />

							<MarksAndColors />
						</div>

						<Icon src="add" onClick={addColor} className="c mt" />
					</>
				}

			</>
		)
	}
}