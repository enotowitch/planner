import React, { PureComponent } from "react"
import DayItem from "./DayItem"
import openDayOptions from "../img/dots.svg"

export default class Day extends PureComponent {

	getWeekDay = (date) => new Date(`${date}, 2023`).toLocaleTimeString("en-us", { weekday: 'short' }).match(/.*?\s/)[0].toLowerCase().trim()

	render() {

		const weekDay = this.getWeekDay(this.props.day) // sun, mon, tue, ...

		const dayItems = this.props.subTasks.map(subTaskObj => subTaskObj.weekDay.includes(weekDay) && <DayItem subTaskName={subTaskObj.subTask} type={subTaskObj.type} />)

		const dayNum = this.props.day.match(/\d+/)

		return (
			<div className="Day">
				<div className="Day__top">
					<span>{dayNum}</span>
					<span>{weekDay}</span>
					<img src={openDayOptions} />
				</div>

				{dayItems}

			</div>
		)
	}
}