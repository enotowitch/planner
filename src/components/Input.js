import React, { PureComponent } from "react"
import InputState from "./InputState"
import { Context } from "../context"
import sort from "../functions/sort"
import save from "../functions/save"


export default class Input extends PureComponent {

	static contextType = Context

	onChange = (setValue, e) => {
		// handle input onChange
		setValue(e)

		// save to localStorage & state
		const { name, id, value, type } = e.target
		const { colors } = this.context
		const { color, colorName } = this.props

		// ! text
		if (type === "text") {
			const withoutDeletedColor = colors.filter(colorObj => colorObj.colorName !== name && colorObj.colorName) // delete prev colorName and void colorName
			const newColors = [...withoutDeletedColor, { id: Number(id), colorName: value, color: color }]
			sort(newColors)
			save("colors", newColors, this.context.setAppState)
		}
		// ? text
		// ! color
		if (type === "color") {
			const newColors = colors.map(colorObj => colorObj.colorName === colorName ? { ...colorObj, "color": value } : colorObj)
			save("colors", newColors, this.context.setAppState)
		}
		// ? color
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