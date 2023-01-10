import React, { PureComponent } from "react"
import Input from "./Input"

export default class TextAndInput extends PureComponent {
	render() {
		return (
			<>
				<span className="Text">{this.props.text}</span>
				<Input />
			</>
		)
	}
}