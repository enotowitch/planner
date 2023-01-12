import React, { PureComponent } from "react"
import DayItem from "./DayItem"
import Toggler from "./Toggler"
import InputsAndColors from "./InputsAndColors"
import Icon from "./Icon"

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

					<Toggler defaultState={false}>
						{(on, toggle) => (
							<>
								<Icon src={on ? "closeDayOptions" : "openDayOptions"} onClick={toggle} className="zi3" />

								{on &&
									<div className="Day__options zi2">
										<InputsAndColors disabled={true} />
									</div>
								}
							</>
						)}
					</Toggler>
				</div>

				{dayItems}

			</div>
		)
	}
}