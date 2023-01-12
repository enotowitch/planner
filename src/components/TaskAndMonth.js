import React, { PureComponent } from "react"
import Month from "./Month"
import { Context } from "../context"
import TaskToggler from "./TogglerPrevNext"
import MonthToggler from "./TogglerPrevNext"

export default class TaskAndMonth extends PureComponent {

	static contextType = Context

	state = {
		taskNum: 0,
		monthNum: 0
	}

	prevFn = (stateName) => this.setState(prev => ({ [stateName]: prev[stateName] - 1 }))
	nextFn = (stateName) => this.setState(prev => ({ [stateName]: prev[stateName] + 1 }))


	// ! RENDER
	render() {

		const { tasks, taskAndMonthOn } = this.context // tasks = [{…}, {…}]
		const { taskNum, monthNum } = this.state

		const taskName = String(Object.keys(tasks[taskNum])) // learn || exersize
		const task = tasks[taskNum] // {learn: {…}} || {exersize: {…}}

		let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		monthName = monthName[monthNum]

		const { prevFn, nextFn } = this

		return (
			<>
				{taskAndMonthOn &&
					<>
						<MonthToggler title={`${monthName}, 2023`} prevFn={() => prevFn("monthNum")} nextFn={() => nextFn("monthNum")} />

						<TaskToggler title={taskName} prevFn={() => prevFn("taskNum")} nextFn={() => nextFn("taskNum")} />

						<Month monthNum={monthNum} task={task} taskName={taskName} />
					</>
				}
			</>
		)
	}
}