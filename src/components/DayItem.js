import React, { PureComponent } from "react"
import getDay from "../functions/getDay"
import CheckboxAndText from "./CheckboxAndText"
import TextAndInput from "./TextAndInput"

export default class DayItem extends PureComponent {
	render() {

		const { subTaskName, type, day } = this.props // e.g subTaskName: 'pull ups', type: 'input', day: 'Jan 24'

		const subTaskValue = getDay(day) && getDay(day)[subTaskName] // getting value of subTaskName: e.g "15 15 15"

		
		return (
			<div className="DayItem">
				{type === "input" && <TextAndInput text={subTaskName} subTaskValue={subTaskValue} day={day} />}
				{type === "checkbox" && <CheckboxAndText text={subTaskName} />}
			</div>
		)
	}
}