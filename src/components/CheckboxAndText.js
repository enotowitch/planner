import React, { Component } from "react"
import Input from "./Input"

export default class CheckboxAndText extends Component {
	render() {

		const { text, role, subTaskValue, day } = this.props

		return (
			<>
				<Input role={role} type="checkbox" subTaskName={text} subTaskValue={subTaskValue} day={day} />
				<span>{text}</span>
			</>
		)
	}
}