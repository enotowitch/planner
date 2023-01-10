import React, { PureComponent } from "react"
import CheckboxAndText from "./CheckboxAndText"
import TextAndInput from "./TextAndInput"

export default class DayItem extends PureComponent {
	render() {

		const { subTaskName, type } = this.props

		return (
			<div className="DayItem">
				{type === "input" && <TextAndInput text={subTaskName} />}
				{type === "checkbox" && <CheckboxAndText text={subTaskName} />}
			</div>
		)
	}
}