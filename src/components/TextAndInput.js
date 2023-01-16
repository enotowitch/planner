import React, { PureComponent } from "react"
import Input from "./Input"

export default class TextAndInput extends PureComponent {
	render() {

		const { text, subTaskValue, day } = this.props

		return (
			<>
				<span className="Text">{text}</span>
				<Input role="subTask" type="text" subTaskName={text} subTaskValue={subTaskValue} day={day} />
			</>
		)
	}
}