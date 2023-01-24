import React, { Component } from "react"
import save from "../functions/save"
import listOfDays from "../listOfDays"
import { Context } from "../context"
import getDate from "../functions/getDate"

export default class SelectInterval extends Component {

	static contextType = Context

	// ! state
	state = {
		start: getDate(), // today if no intervalInfo; e.g "Jan 23"
		interval: 1, // everyday
		times: 999
	}
	// ? state

	onChange = (e) => {

		// ! state
		const { name, value } = e.target
		this.setState({ [name]: value })

		// ! count interval
		setTimeout(() => {
			const { start, interval, times } = this.state

			const unixStart = Math.floor(new Date(`${start}, ${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}`).getTime() / 1000) // e.g "Jan 1"
			const unixInterval = interval * 86400
			let result = unixStart


			let results = {}
			for (let i = 0; i < times; i++) {
				const year = getDate(result * 1000, "yearNum") // e.g 2023
				const month = getDate(result * 1000, "monthName") // e.g "Jan"
				const day = getDate(result * 1000, "dayNum") // e.g "3"

				if (!results[year]) { // no year: create e.g "interval":{"2023":{} }
					results = { ...results, [year]: {} }
				}
				if (!results[year][month]) {	// no month: create e.g "interval":{"2023":{"Jan":[]} }
					results[year] = { ...results[year], [month]: [] }
				}

				results[year] && results[year][month] && results[year][month].push(day) // e.g "interval":{"2023":{"Jan":["1","3"]}}

				result += unixInterval // e.g "Jan 1" + 2 days = "Jan 3"
			}

			// ! save
			const { modeName, taskName, subTaskName } = this.props
			if (modeName) {
				const updatedTasks = this.context.tasks.map(taskObj => {
					const taskObjName = String(Object.keys(taskObj))
					if (taskObjName === taskName) {
						taskObj[taskName].map(subTaskObj => {
							if (subTaskObj.subTask === subTaskName) {
								// remove all, write new
								subTaskObj[modeName] = []
								subTaskObj[modeName] = results

								// interval info: e.g "intervalInfo":{"start":"Feb 14","interval":"14","times":"14"}
								subTaskObj["intervalInfo"] = { start: getDate(unixStart * 1000), interval, times }

								return subTaskObj
							} else {
								return subTaskObj
							}
						})
						return taskObj
					} else {
						return taskObj
					}
				})
				save("tasks", updatedTasks)
			}

		}, 1);

	}

	// ! componentDidMount
	componentDidMount() {
		const { taskName, subTaskName } = this.props

		this.context.tasks.map(taskObj => {
			const taskObjName = String(Object.keys(taskObj))
			if (taskObjName === taskName) {
				taskObj[taskName].map(subTaskObj => {
					if (subTaskObj.subTask === subTaskName) {
						// set state to prev picked intervalInfo e.g {"start":"Feb 14","interval":"14","times":"14"}
						this.setState(subTaskObj.intervalInfo)
					}
				})
			}
		})
	}
	// ? componentDidMount


	// ! RENDER
	render() {

		const days = listOfDays.map(day => <option>{day}</option>)
		const intervals = Array.from(Array(100).keys()).map(int => int !== 0 && <option value={int}>{int} {int === 1 ? "day" : "days"}</option>)
		const timess = Array.from(Array(1000).keys()).map(int => int !== 0 && <option value={int}>{int} {int === 1 ? "time" : "times"}</option>)

		const { start, interval, times } = this.state


		return (
			<>
				{/* TODO */}
				<span>start</span>
				<select
					value={start}
					name="start"
					onChange={this.onChange}
				>
					{days}
				</select>

				<span>interval</span>
				<select
					value={interval}
					name="interval"
					onChange={this.onChange}
				>
					{intervals}
				</select>

				<span>times</span>
				<select
					value={times}
					name="times"
					onChange={this.onChange}
				>
					{timess}
				</select>
			</>
		)
	}
}