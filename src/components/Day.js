import React, { Component } from "react"
import DayItem from "./DayItem"
import Toggler from "./Toggler"
import InputsAndColors from "./InputsAndColors"
import Icon from "./Icon"
import getDay from "../functions/getDay"
import { Context } from "../context"
import Mark from "./Mark"
import getCookie from "../functions/getCookie"

export default class Day extends Component {

	static contextType = Context

	getColorDayAndTask = () => {
		const day = getDay(this.props.day) // e.g {day: 'Jan 1', subTasks: {…}, tasks: {…}}
		const curTask = day && day.tasks && day.tasks[this.context.curTaskName] // e.g {color: '#87d20c', colorName: 'success'}
		const colorName = day && curTask && curTask.colorName // e.g "success"
		let color

		if (getCookie("colorMemo")) { // keep old colors even if they changed
			color = curTask && curTask.color
		} else { // default = false, rerender new colors
			this.context.colors.map(colorObj => colorName === colorObj.colorName && (color = colorObj.color))
		}
		return color // e.g #008015
	}
	getWeekDay = (date) => new Date(`${date}, 2023`).toLocaleTimeString("en-us", { weekday: 'short' }).match(/.*?\s/)[0].toLowerCase().trim()

	// ! state
	state = {
		color: this.getColorDayAndTask(),
		optionOn: false,
		title: this.getWeekDay(this.props.day),
		place: "" // day || dayItem => where to change day color or dayItem color
	}

	setDayState = (stateName, newValue) => this.setState({ [stateName]: newValue })
	// ? state


	// ! componentDidUpdate
	componentDidUpdate(prevProps) {

		const { setDayState, getColorDayAndTask } = this

		if (prevProps.day !== this.props.day) {
			setDayState("color", getColorDayAndTask())
		}
		if (prevProps.taskName !== this.context.curTaskName) {
			setDayState("color", getColorDayAndTask())
		}
	}
	// ? componentDidUpdate


	// ! RENDER
	render() {

		const { day, subTasks } = this.props
		const { color, optionOn, title, place } = this.state
		const { getWeekDay, setDayState } = this

		// console.log(this.props)
		// console.log(this.state)

		// ! weekDay,dayItems,dayNum
		const weekDay = getWeekDay(day) // sun, mon, tue, ...	
		const dayNum = Number(day.match(/\d+/)[0])
		
		const dayItems = subTasks.map(subTaskObj => {
			if (subTaskObj.mode === "week") {
				return subTaskObj.week.includes(weekDay) && <DayItem subTaskName={subTaskObj.subTask} type={subTaskObj.type} day={day} setDayState={setDayState} place="dayItem" />
			}
			if (subTaskObj.mode === "month") {
				return subTaskObj.month.includes(dayNum) && <DayItem subTaskName={subTaskObj.subTask} type={subTaskObj.type} day={day} setDayState={setDayState} place="dayItem" />
			}
		})
		// ? weekDay,dayItems,dayNum


		// ! RETURN
		return (
			<div className="Day" style={{ background: color }}>
				<div className="Day__top">
					<span>{dayNum}</span>
					<span className="Day__title zi3">{title}</span>


					<>
						<Mark optionOn={optionOn} className="zi3" setDayState={setDayState} title={weekDay} place="day" />

						{optionOn &&
							<div className="Day__options zi2">
								<InputsAndColors readOnly={true} day={day} setDayState={setDayState} place={place} />
							</div>
						}
					</>
				</div>

				{dayItems}

			</div>
		)
	}
}