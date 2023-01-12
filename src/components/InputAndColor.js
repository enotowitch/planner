import React, { PureComponent } from "react"
import Input from "./Input"

export default class InputAndColor extends PureComponent {
	render() {

		const { id, colorName, color, disabled } = this.props

		return (
			<>
				<Input type="text" id={id} colorName={colorName} color={color} className="Input" disabled={disabled} />
				<Input type="color" id={id} colorName={colorName} color={color} className="Input" disabled={disabled} />
			</>
		)
	}
}