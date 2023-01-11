import React, { PureComponent } from "react"
import InputAndColor from "./InputAndColor"
import { Context } from "../context"

export default class InputsAndColors extends PureComponent {

	static contextType = Context

	render() {

		const { colors } = this.context // [{…}, {…}]
		const inputAndColor = colors.map(color => <InputAndColor colorName={String(Object.keys(color))} color={String(Object.values(color))} disabled={this.props.disabled} />)


		return (
			<>
				{inputAndColor}
			</>
		)
	}
}