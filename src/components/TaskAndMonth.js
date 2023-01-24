import React, { Component } from "react"
import Month from "./Month"
import { Context } from "../context"
import TaskToggler from "./TogglerPrevNext"
import MonthToggler from "./TogglerPrevNext"
import getMonthName from "../functions/getMonthName"

export default class TaskAndMonth extends Component {

	static contextType = Context

	// ! toggle month & year
	prevFn = (stateName) => {
		if (stateName === "monthNum") {
			if (this.context.monthNum === 0) {
				this.context.setAppState("year", this.context.year - 1)
				this.context.setAppState("monthNum", 11)
			} else {
				this.context.setAppState(stateName, this.context[stateName] - 1)
			}
		} else {
			// stateName: taskNum
			this.context.setAppState(stateName, this.context[stateName] - 1)
		}
	}
	nextFn = (stateName) => {
		if (stateName === "monthNum") {
			if (this.context.monthNum === 11) {
				this.context.setAppState("year", this.context.year + 1)
				this.context.setAppState("monthNum", 0)
			} else {
				this.context.setAppState(stateName, this.context[stateName] + 1)
			}
		} else {
			// stateName: taskNum
			this.context.setAppState(stateName, this.context[stateName] + 1)
		}
	}
	// ? toggle month & year


	// ! RENDER
	render() {

		const { tasks, taskAndMonthOn, taskNum, monthNum, year } = this.context // tasks = [{…}, {…}]

		const taskName = String(Object.keys(tasks[taskNum])) // learn || exersize
		const task = tasks[taskNum] // {learn: {…}} || {exersize: {…}}

		const monthName = getMonthName(monthNum)

		const { prevFn, nextFn } = this

		return (
			<>
				{taskAndMonthOn &&
					<>
						<MonthToggler title={`${monthName}, ${year}`} prevFn={() => prevFn("monthNum")} nextFn={() => nextFn("monthNum")} />

						<TaskToggler title={taskName} prevFn={() => prevFn("taskNum")} nextFn={() => nextFn("taskNum")} />

						<Month task={task} taskName={taskName} />
					</>
				}
			</>
		)
	}
}