import React, { PureComponent } from "react"
import Icon from "./Icon"
import Input from "./Input"
import { Context } from "../context"
import save from "../functions/save"

export default class InputAndColor extends PureComponent {

	static contextType = Context

	deleteColor = (e) => {
		const { colors, setAppState } = this.context

		const toDelete = e.target.closest("div").querySelector(`[type="text"]`).value
		const deleted = colors.filter(colorObj => colorObj.colorName !== toDelete)

		save("colors", deleted, setAppState)
	}

	writeDay = () => {
		const { day, colorName, color, setStateDayColor } = this.props
		save(day, { day, colorName, color })
		setStateDayColor(color)
	}

	// ! RENDER
	render() {

		const { id, colorName, color, disabled } = this.props
		const { writeDay } = this

		return (
			// disabled means that it's in "dayOptions", so user wants to color this day
			<div className="f" onClick={disabled && writeDay}>
				<Input type="text" id={id} colorName={colorName} color={color} className="Input" disabled={disabled} />
				<Input type="color" id={id} colorName={colorName} color={color} className="Input_color" disabled={disabled} />
				{/* can delete only in Menu */}
				{!disabled && <Icon src="close" onClick={(e) => this.deleteColor(e)} className="ml" />}
			</div>
		)
	}
}