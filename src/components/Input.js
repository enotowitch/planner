import React, { PureComponent } from "react"
import InputState from "./InputState"
import { Context } from "../context"
import sort from "../functions/sort"


export default class Input extends PureComponent {

	static contextType = Context

	onChange = (setValue, e) => {
		// handle input onChange
		setValue(e)

		// save to localStorage & state
		const { name, id, value, type } = e.target
		const { colors } = this.context
		const { color, colorName } = this.props

		function saveChanges(newColors, context) {
			localStorage.setItem("colors", JSON.stringify(newColors))
			context.setStateColors(newColors)
		}

		if (type === "text") {
			const withoutDeletedColor = colors.filter(colorObj => colorObj.colorName !== name)
			const newColors = [...withoutDeletedColor, { id: id, colorName: value, color: color }]
			sort(newColors)
			saveChanges(newColors, this.context)
		}
		if (type === "color") {
			const newColors = colors.map(colorObj => colorObj.colorName === colorName ? { ...colorObj, "color": value } : colorObj)
			saveChanges(newColors, this.context)
		}
	}


	render() {

		const { type, className, colorName, color, disabled, id } = this.props

		return (
			<InputState>
				{({ value, setValue }) => (
					<input
						type={type || "text"}
						className={className || "Input"}
						value={type === "text" && colorName || type === "color" && color || value}
						onChange={(e) => this.onChange(setValue, e)}
						disabled={disabled}
						name={colorName || color}
						id={id}
					/>
				)}
			</InputState>
		)
	}
}