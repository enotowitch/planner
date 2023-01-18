import React, { Component } from "react"
import getDay from "../functions/getDay"
import CheckboxAndText from "./CheckboxAndText"
import Mark from "./Mark"
import TextAndInput from "./TextAndInput"

export default class DayItem extends Component {
	render() {

		const { subTaskName, type, day, setDayState, place } = this.props // e.g subTaskName: 'pull ups', type: 'input', day: 'Jan 24'
		// console.log(this.props)

		const subTask = getDay(day) && getDay(day)["subTasks"] && getDay(day)["subTasks"][subTaskName]
		const subTaskValue = subTask && subTask.value // e.g "15 15 15"
		const subTaskColor = subTask && subTask.color // e.g "#123456"

		return (
			<div className="DayItem" style={{ background: subTaskColor }}>
				{type === "input" && <TextAndInput text={subTaskName} role="subTask" subTaskValue={subTaskValue} day={day} />}
				{type === "checkbox" && <CheckboxAndText text={subTaskName} role="subTask" subTaskValue={subTaskValue} day={day} />}
				<Mark title={subTaskName} setDayState={setDayState} place={place} />
			</div>
		)
	}
}