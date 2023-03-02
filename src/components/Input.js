import React, { Component } from "react"
import { Context } from "../context"
import sort from "../functions/sort"
import save from "../functions/save"
import getDay from "../functions/getDay"


export default class Input extends Component {

	static contextType = Context

	state = {
		value: this.props.value,
		checked: this.props.value
	}

	onChange = (e) => {
		// handle input onChange
		this.setState({ value: e.target.value })
		this.setState({ checked: e.target.checked })

		// save to localStorage & state
		const { name, id, value, type, checked, role } = e.target
		const { colors, setAppState, tasks, year } = this.context
		const { color, colorName, day, subTaskName, oldValue, setTaskState, taskName, setSubTaskState } = this.props

		// !! ROLE COLOR
		// ! type text
		if (type === "text" && role === "color") {
			const withoutDeletedColor = colors.filter(colorObj => colorObj.colorName !== name && colorObj.colorName) // delete prev colorName and void colorName
			const newColors = [...withoutDeletedColor, { id: Number(id), colorName: value, color: color }]
			sort(newColors)
			save("colors", newColors, setAppState)
		}
		// ? type text
		// ! type color
		if (type === "color" && role === "color") {
			const newColors = colors.map(colorObj => colorObj.colorName === colorName ? { ...colorObj, "color": value } : colorObj)
			save("colors", newColors, setAppState)
		}
		// ? type color
		// ?? ROLE COLOR

		// !! ROLE SUBTASK
		const oldDay = getDay(day, year) // e.g { "day": "Jan 12", "exersize": "#ffd561" }
		const oldSubTasks = oldDay && oldDay.subTasks
		const oldSubTask = oldDay && oldDay.subTasks && oldDay.subTasks[subTaskName]
		// ! type text
		if (type === "text" && role === "subTask") {
			save(`${day} ${year}`, { ...oldDay, day, year, subTasks: { ...oldSubTasks, [subTaskName]: { ...oldSubTask, text: value } } })
		}
		// ? type text
		// ! type checkbox
		if (type === "checkbox" && role === "subTask") {
			save(`${day} ${year}`, { ...oldDay, day, year, subTasks: { ...oldSubTasks, [subTaskName]: { ...oldSubTask, checkbox: checked } } })
		}
		// ? type checkbox
		// ?? ROLE SUBTASK

		// !! ROLE TASKNAME
		if (role === "taskName") {
			tasks.map(taskObj => {
				const taskObjName = String(Object.keys(taskObj))

				if (taskObjName === value) {
					throw new Error("2 tasks have same name") // prevent task dups
				}

				if (taskObjName === oldValue) {
					// RENAME TASK (taskObj)
					delete Object.assign(taskObj, { [value]: taskObj[oldValue] })[oldValue]
					save("tasks", tasks)
					setTaskState("taskName", value)
				}
			})
		}
		// ?? ROLE TASKNAME

		// !! ROLE SUBtaskNAME
		if (role === "subTaskName") {
			tasks.map(taskObj => {
				const taskObjName = String(Object.keys(taskObj))

				if (taskObjName === taskName) {
					const task = taskObj[taskObjName] // e.g [ { "subTask": "pull ups", "mode": "off", "week": [], "month": [], "type": "text" }, { "subTask": "push ups", "mode": "off", "week": [], "month": [], "type": "text" } ]
					task.map(subTaskObj => {
						const subTaskName = subTaskObj.subTask

						if (subTaskName === value) {
							throw new Error("2 subTasks have same name") // prevent subTasks dups
						}

						if (subTaskName === oldValue) {
							// RENAME SUBTASK (subTaskObj)
							delete Object.assign(subTaskObj, { subTask: value })
							save("tasks", tasks)
							setSubTaskState("subTaskName", value)
						}
					})
				}
			})
		}
		// ?? ROLE SUBtaskNAME
	}

	onClick = (e) => {
		const { day, color, colorName, setDayState, place } = this.props
		const { year } = this.context

		const oldDay = getDay(day, year) // e.g { "day": "Jan 12", "exersize": "#ffd561" }
		const closeOptions = () => e.target.closest(".Day__top").querySelector("img").click()

		// ! color day
		if (place === "day") {
			const { curTaskName } = this.context

			save(`${day} ${year}`, { ...oldDay, day, tasks: { [curTaskName]: { color: color, colorName: colorName } } }) // e.g { "day": "Jan 12", "exersize": "#ffd561", "learn": "#008015"}
			setDayState("color", color)
			closeOptions()
		}
		if (place === "dayItem") {
			const subTaskName = e.target.closest(".Day__top").querySelector(".Day__title").innerText
			const oldSubTasks = oldDay && oldDay.subTasks
			const oldSubTask = oldDay && oldDay.subTasks && oldDay.subTasks[subTaskName]

			save(`${day} ${year}`, { ...oldDay, day, subTasks: { ...oldSubTasks, [subTaskName]: { ...oldSubTask, color: color, colorName: colorName } } })
			closeOptions()
		}
		// ? color day
	}


	// ! RENDER
	render() {

		const { type, className, colorName, color, readOnly, id, role } = this.props
		const { value, checked } = this.state

		return (
			<>
				{/* type text & color */}
				{type !== "checkbox" &&
					<input
						type={type || "text"}
						className={className || "Input"}
						value={type === "text" && colorName || type === "color" && color || value}
						onChange={(e) => this.onChange(e)}
						readOnly={readOnly}
						disabled={type === "color" && readOnly && true}
						name={colorName || color}
						id={id}
						role={role}
						onClick={(e) => readOnly && this.onClick(e)}
					/>
				}
				{type === "checkbox" &&
					<>
						{checked ?
							<input
								type="checkbox"
								checked={checked}
								onChange={(e) => this.onChange(e)}
								role={role}
							/>
							:
							<input
								type="checkbox"
								onChange={(e) => this.onChange(e)}
								role={role}
							/>
						}
					</>
				}
			</>
		)
	}
}