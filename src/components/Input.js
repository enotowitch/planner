import React, { Component } from "react"
import { Context } from "../context"
import sort from "../functions/sort"
import save from "../functions/save"
import getDay from "../functions/getDay"


export default class Input extends Component {

	static contextType = Context

	state = {
		value: this.props.subTaskValue,
		checked: this.props.subTaskValue
	}

	onChange = (e) => {
		// handle input onChange
		this.setState({ value: e.target.value })
		this.setState({ checked: e.target.checked })

		// save to localStorage & state
		const { name, id, value, type, checked, role } = e.target
		const { colors } = this.context
		const { color, colorName, day, subTaskName } = this.props

		// ! ROLE COLOR
		// ! type text
		if (type === "text" && role === "color") {
			const withoutDeletedColor = colors.filter(colorObj => colorObj.colorName !== name && colorObj.colorName) // delete prev colorName and void colorName
			const newColors = [...withoutDeletedColor, { id: Number(id), colorName: value, color: color }]
			sort(newColors)
			save("colors", newColors, this.context.setAppState)
		}
		// ? type text
		// ! type color
		if (type === "color" && role === "color") {
			const newColors = colors.map(colorObj => colorObj.colorName === colorName ? { ...colorObj, "color": value } : colorObj)
			save("colors", newColors, this.context.setAppState)
		}
		// ? type color
		// ? ROLE COLOR

		// ! ROLE SUBTASK
		const oldDay = getDay(day) // e.g { "day": "Jan 12", "exersize": "#ffd561" }
		const oldSubTasks = oldDay && oldDay.subTasks
		const oldSubTask = oldDay && oldDay.subTasks && oldDay.subTasks[subTaskName]
		// ! type text
		if (type === "text" && role === "subTask") {
			save(day, { ...oldDay, day, subTasks: { ...oldSubTasks, [subTaskName]: { ...oldSubTask, value: value } } })
		}
		// ? type text
		// ! type checkbox
		if (type === "checkbox" && role === "subTask") {
			save(day, { ...oldDay, day, subTasks: { ...oldSubTasks, [subTaskName]: { ...oldSubTask, value: checked } } })
		}
		// ? type checkbox
		// ? ROLE SUBTASK
	}

	onClick = (e) => {
		const { day, color, colorName, setDayState, place } = this.props
		// console.log(this.props)

		const oldDay = getDay(day) // e.g { "day": "Jan 12", "exersize": "#ffd561" }
		const closeOptions = () => e.target.closest(".Day__top").querySelector("img").click()

		// ! color day
		if (place === "day") {
			const { curTaskName } = this.context

			save(day, { ...oldDay, day, tasks: { [curTaskName]: { color: color, colorName: colorName } } }) // e.g { "day": "Jan 12", "exersize": "#ffd561", "learn": "#008015"}
			setDayState("color", color)
			closeOptions()
		}
		if (place === "dayItem") {
			const subTaskName = e.target.closest(".Day__top").querySelector(".Day__title").innerText
			const oldSubTasks = oldDay && oldDay.subTasks
			const oldSubTask = oldDay && oldDay.subTasks && oldDay.subTasks[subTaskName]

			save(day, { ...oldDay, day, subTasks: { ...oldSubTasks, [subTaskName]: { ...oldSubTask, color: color, colorName: colorName } } })
			closeOptions()
		}
		// ? color day
	}


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