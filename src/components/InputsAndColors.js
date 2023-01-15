import React, { PureComponent } from "react"
import InputAndColor from "./InputAndColor"
import { Context } from "../context"

export default class InputsAndColors extends PureComponent {

	static contextType = Context

	render() {

		const { disabled, day, setStateDayColor } = this.props
		const { colors } = this.context // [{…}, {…}]

		const inputAndColor = colors && colors.map(colorObj => <InputAndColor id={colorObj.id} colorName={colorObj.colorName} color={colorObj.color} disabled={disabled} day={day} setStateDayColor={setStateDayColor} />)


		return (
			<div className="InputsAndColors">
				{inputAndColor}
			</div>
		)
	}
}