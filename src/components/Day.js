import React, { PureComponent } from "react"
import DayItem from "./DayItem"
import Toggler from "./Toggler"
import InputsAndColors from "./InputsAndColors"
import Icon from "./Icon"
import getDay from "../functions/getDay"
import { Context } from "../context"

export default class Day extends PureComponent {

	static contextType = Context

	getColorDayAndTask = () => getDay(this.props.day, this.context.curTaskName)
	
	// ! state
	state = {
		dayColor: this.getColorDayAndTask()
	}

	setStateDayColor = (newColor) => this.setState({ dayColor: newColor })
	// ? state

	getWeekDay = (date) => new Date(`${date}, 2023`).toLocaleTimeString("en-us", { weekday: 'short' }).match(/.*?\s/)[0].toLowerCase().trim()

	// ! componentDidUpdate
	componentDidUpdate(prevProps) {

		const { setStateDayColor, getColorDayAndTask } = this

		if (prevProps.day !== this.props.day) {
			setStateDayColor(getColorDayAndTask())
		}
		if (prevProps.taskName !== this.context.curTaskName) {
			setStateDayColor(getColorDayAndTask())
		}
	}
	// ? componentDidUpdate


	// ! RENDER
	render() {

		const { day, subTasks } = this.props
		const { dayColor } = this.state
		const { getWeekDay, setStateDayColor } = this

		// ! weekDay,dayItems,dayNum
		const weekDay = getWeekDay(day) // sun, mon, tue, ...	
		const dayItems = subTasks.map(subTaskObj => subTaskObj.weekDay.includes(weekDay) && <DayItem subTaskName={subTaskObj.subTask} type={subTaskObj.type} />)
		const dayNum = day.match(/\d+/)
		// ? weekDay,dayItems,dayNum


		// ! RETURN
		return (
			<div className="Day" style={{ background: dayColor }}>
				<div className="Day__top">
					<span>{dayNum}</span>
					<span>{weekDay}</span>

					<Toggler defaultState={false}>
						{(on, toggle) => (
							<>
								<Icon src={on ? "close" : "open"} onClick={toggle} className="zi3" />

								{on &&
									<div className="Day__options zi2">
										<InputsAndColors disabled={true} day={day} setStateDayColor={setStateDayColor} />
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