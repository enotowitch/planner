import React, { Component } from "react"
import save from "../functions/save"
import listOfDays from "../listOfDays"
import { Context } from "../context"

export default class SelectDay extends Component {

	static contextType = Context

	state = {
		value: this.props.text
	}

	onChange = (e) => {
		// ! state
		const { value } = e.target
		this.setState({ value: value })

		// ! save
		const { modeName, taskName, subTaskName, text, setSubTaskModesState } = this.props
		// change `mode content` like day=["Jan 1"] to day=["Jan 1", "June 20"]
		if (modeName) {
			const updatedTasks = this.context.tasks.map(taskObj => {
				const taskObjName = String(Object.keys(taskObj))
				if (taskObjName === taskName) {
					taskObj[taskName].map(subTaskObj => {
						if (subTaskObj.subTask === subTaskName) {
							if (!subTaskObj[modeName]) { // if no mode create it; e.g day=[] || month=[]
								subTaskObj[modeName] = []
							}
							// toggler: if there is no day => add it; if value === "cancel" => remove the day (props.text)
							if (!subTaskObj[modeName].includes(value) && value !== "cancel") { // e.g subTaskObj[modeName]: ["Jan 1", "June 20"]
								subTaskObj[modeName].push(value)
							}
							if (value === "cancel") {
								subTaskObj[modeName].splice(subTaskObj[modeName].indexOf(text), 1) // delete e.g "Jan 1" 
							}
							setSubTaskModesState("day", subTaskObj[modeName])
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
		// ? save

		// ! state
		this.setState({ value: "pick day" })
	}

	render() {

		const days = listOfDays.map(day => <option>{day}</option>)
		const { selectMode, text } = this.props
		const { value } = this.state
		const { onChange } = this

		return (
			<select
				value={value}
				onChange={onChange}
			>
				{selectMode === "read" && <option>{text}</option>}
				{selectMode === "read" && <option>cancel</option>}

				{selectMode === "write" && <option disabled>pick day</option>}
				{selectMode === "write" && days}
			</select>
		)
	}
}