import React, { Component } from "react"
import InputAndColor from "./InputAndColor"
import { Context } from "../context"

export default class InputsAndColors extends Component {

	static contextType = Context

	render() {

		const { readOnly, day, setDayState, place } = this.props
		const { colors } = this.context // [{…}, {…}]

		const inputAndColor = colors && colors.map(colorObj => <InputAndColor id={colorObj.id} colorName={colorObj.colorName} color={colorObj.color} readOnly={readOnly} day={day} setDayState={setDayState} place={place} />)


		return (
			<div className="InputsAndColors">
				{inputAndColor}
			</div>
		)
	}
}