import React, { Component } from "react"
import { Context } from "../context"
import save from "../functions/save"
import Icon from "./Icon"

export default class SubTaskType extends Component {

	static contextType = Context

	setSubTaskType = (type) => {
		const { subTaskName, taskName } = this.props
		const { tasks, setAppState } = this.context

		tasks.map(taskObj => {
			const taskObjName = String(Object.keys(taskObj))

			if (taskObjName === taskName) {
				const task = taskObj[taskName]

				task.map(subTaskObj => {
					if (subTaskObj.subTask === subTaskName) {
						subTaskObj.type = type
						save("tasks", tasks, setAppState)
					}
				})
			}
		})
	}


	// ! RENDER
	render() {

		return (
			<>
				<Icon src="typeInput" onClick={() => this.setSubTaskType("text")} />
				<Icon src="typeCheckbox" onClick={() => this.setSubTaskType("checkbox")} />
			</>
		)
	}
}