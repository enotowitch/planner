import React, { PureComponent } from "react"
import Icon from "./Icon"
import Input from "./Input"
import { Context } from "../context"

export default class InputAndColor extends PureComponent {

	static contextType = Context

	deleteColor = (e) => {
		const { colors, setStateColors } = this.context

		const toDelete = e.target.closest("div").querySelector(`[type="text"]`).value
		const deleted = colors.filter(colorObj => colorObj.colorName !== toDelete)

		localStorage.setItem("colors", JSON.stringify(deleted))
		setStateColors(deleted)
	}

	render() {

		const { id, colorName, color, disabled } = this.props

		return (
			<div className="f">
				<Input type="text" id={id} colorName={colorName} color={color} className="Input" disabled={disabled} />
				<Input type="color" id={id} colorName={colorName} color={color} className="Input_color" disabled={disabled} />
				{/* can delete only in Menu */}
				{!disabled && <Icon src="close" onClick={(e) => this.deleteColor(e)} className="ml" />}
			</div>
		)
	}
}