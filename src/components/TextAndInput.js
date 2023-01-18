import React, { Component } from "react"
import Input from "./Input"

export default class TextAndInput extends Component {
	render() {

		const { text, role, subTaskValue, day } = this.props

		return (
			<>
				<span className="Text">{text}</span>
				<Input role={role} type="text" subTaskName={text} subTaskValue={subTaskValue} day={day} />
			</>
		)
	}
}