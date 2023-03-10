import React, { Component } from "react"
import { Context } from "../context"
import save from "../functions/save"
import Icon from "./Icon"
import Task from "./Task"

export default class TasksAndSubTasks extends Component {

	static contextType = Context

	addTask = () => {

		const { tasks, setAppState } = this.context

		const taskNameArr = []

		tasks.map(task => {
			const taskName = String(Object.keys(task))
			taskNameArr.push(taskName)
		})

		if (!taskNameArr.includes("")) { // prevent adding void task (one allowed)
			tasks.push({
				"":
					[
						{ subTask: "", mode: "off", week: [], month: [], type: "text" },
					]
			},)
		}

		save("tasks", tasks)
		setAppState("tasks", tasks)
	}

	render() {

		const tasks = this.context.tasks.map(taskObj => {
			const taskName = String(Object.keys(taskObj))
			return <Task key={Math.random()} taskName={taskName} />
		})

		return (
			<div className="tasks">
				{tasks}

				<Icon src="add" onClick={this.addTask} className="addBig" />
			</div>
		)
	}
}