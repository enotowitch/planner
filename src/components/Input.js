import React, { PureComponent } from "react"
import InputState from "./InputState"
import { Context } from "../context"
import sort from "../functions/sort"
import save from "../functions/save"
import getDay from "../functions/getDay"


export default class Input extends PureComponent {

	static contextType = Context

	onChange = (setValue, e) => {
		// handle input onChange
		setValue(e)

		// save to localStorage & state
		const { name, id, value, type, role } = e.target
		const { colors } = this.context
		const { color, colorName, day, subTaskName } = this.props

		// ! ROLE COLOR
		// ! type text
		if (type === "text" && role === "color") {
			const withoutDeletedColor = colors.filter(colorObj => colorObj.colorName !== name && colorObj.colorName) // delete prev colorName and void colorName
			const newColors = [...withoutDeletedColor, { id: Number(id), colorName: value, color: color }]
			sort(newColors)
			save("colors", newColors, this.context.setAppState)
		}
		// ? type text
		// ! type color
		if (type === "color" && role === "color") {
			const newColors = colors.map(colorObj => colorObj.colorName === colorName ? { ...colorObj, "color": value } : colorObj)
			save("colors", newColors, this.context.setAppState)
		}
		// ? type color
		// ? ROLE COLOR

		// ! ROLE SUBTASK
		if (type === "text" && role === "subTask") {
			const oldDay = getDay(day) // e.g { "day": "Jan 12", "exersize": "#ffd561" }
			save(day, { ...oldDay, day, [subTaskName]: value })
		}
		// ? ROLE SUBTASK
	}


	render() {

		const { type, className, colorName, color, disabled, id, role, subTaskValue } = this.props

		return (
			<InputState>
				{({ value, setValue }) => (
					<input
						type={type || "text"}
						className={className || "Input"}
						value={type === "text" && colorName || type === "color" && color || value || subTaskValue}
						onChange={(e) => this.onChange(setValue, e)}
						disabled={disabled}
						name={colorName || color}
						id={id}
						role={role}
					/>
				)}
			</InputState>
		)
	}
}