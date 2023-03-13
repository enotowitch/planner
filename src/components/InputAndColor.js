import React, { Component } from "react"
import Icon from "./Icon"
import Input from "./Input"
import { Context } from "../context"
import save from "../functions/save"
import getDay from "../functions/getDay"

export default class InputAndColor extends Component {

	static contextType = Context

	deleteColor = (e) => {
		const { colors, setAppState } = this.context

		const toDelete = e.target.closest("div").querySelector(`[type="text"]`).value
		const deleted = colors.filter(colorObj => colorObj.colorName !== toDelete)

		save("colors", deleted, setAppState)
	}

	// ! RENDER
	render() {

		const { id, colorName, color, readOnly, day, setDayState, place } = this.props

		return (
			// readOnly means that it's in "dayOptions", so user wants to color this day
			<div className="f">
				<Input role="color" type="text" id={id} colorName={colorName} color={color} className="Input" readOnly={readOnly} day={day} setDayState={setDayState} place={place} />
				<Input role="color" type="color" id={id} colorName={colorName} color={color} className="Input_color" readOnly={readOnly} day={day} setDayState={setDayState} place={place} />
				{/* can delete only in Menu */}
				{!readOnly && <Icon src="close" onClick={(e) => this.deleteColor(e)} className="delC ml" />}
			</div>
		)
	}
}