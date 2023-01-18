import React, { Component } from "react"
import getDay from "../functions/getDay"
import CheckboxAndText from "./CheckboxAndText"
import Mark from "./Mark"
import TextAndInput from "./TextAndInput"
import { Context } from "../context"
import getCookie from "../functions/getCookie"

export default class DayItem extends Component {

	static contextType = Context

	render() {

		const { subTaskName, type, day, setDayState, place } = this.props // e.g subTaskName: 'pull ups', type: 'input', day: 'Jan 24'
		// console.log(this.props)

		const subTask = getDay(day) && getDay(day)["subTasks"] && getDay(day)["subTasks"][subTaskName] // e.g {"color": "#a3ffbf","colorName": "success","value": "15 15 15"}
		const subTaskValue = subTask && subTask.value // e.g "15 15 15"
		const subTaskColorName = subTask && subTask.colorName // e.g "success"
		let color
		if (getCookie("colorMemo")) { // keep old colors even if they changed
			color = subTask && subTask.color
		} else { // default = false, rerender new colors
			this.context.colors.map(colorObj => colorObj.colorName === subTaskColorName && (color = colorObj.color))
		}

		return (
			<div className="DayItem" style={{ background: color }}>
				{type === "input" && <TextAndInput text={subTaskName} role="subTask" subTaskValue={subTaskValue} day={day} />}
				{type === "checkbox" && <CheckboxAndText text={subTaskName} role="subTask" subTaskValue={subTaskValue} day={day} />}
				<Mark title={subTaskName} setDayState={setDayState} place={place} />
			</div>
		)
	}
}