import React, { PureComponent } from "react"
import InputAndColor from "./InputAndColor"
import { Context } from "../context"

export default class InputsAndColors extends PureComponent {

	static contextType = Context

	render() {

		const { disabled } = this.props
		const { colors } = this.context // [{…}, {…}]

		const inputAndColor = colors && colors.map(colorObj => <InputAndColor id={colorObj.id} colorName={colorObj.colorName} color={colorObj.color} disabled={disabled} />)


		return (
			<>
				{inputAndColor}
			</>
		)
	}
}