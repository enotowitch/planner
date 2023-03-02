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
		const { monthNum, setAppState, year, taskNum } = this.context

		if (stateName === "monthNum") {
			if (monthNum === 0) {
				setAppState("year", year - 1)
				setAppState("monthNum", 11)
			} else {
				setAppState("monthNum", monthNum - 1)
			}
		}
		if (stateName === "taskNum") {
			if (taskNum !== 0) {
				setAppState("taskNum", taskNum - 1)
			}
		}
	}
	nextFn = (stateName) => {
		const { monthNum, setAppState, year, taskNum, tasks } = this.context

		if (stateName === "monthNum") {
			if (monthNum === 11) {
				setAppState("year", year + 1)
				setAppState("monthNum", 0)
			} else {
				setAppState("monthNum", monthNum + 1)
			}
		}
		if (stateName === "taskNum") {
			if (taskNum !== tasks.length - 1)
				setAppState("taskNum", taskNum + 1)
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