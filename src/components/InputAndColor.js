import React, { PureComponent } from "react"
import Input from "./Input"

export default class InputAndColor extends PureComponent {
	render() {
		return (
			<>
				<Input colorName={this.props.colorName} className="Input" disabled={this.props.disabled} />
				<Input type="color" color={this.props.color} disabled={this.props.disabled} />
			</>
		)
	}
}