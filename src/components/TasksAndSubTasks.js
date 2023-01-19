import React, { Component } from "react"
import { Context } from "../context"
import Task from "./Task"

export default class TasksAndSubTasks extends Component {

	static contextType = Context

	render() {

		const tasks = this.context.tasks.map(taskObj => {
			const taskName = String(Object.keys(taskObj))
			
			return <Task taskName={taskName} />
		})

		return (
			<>
				{tasks}
			</>
		)
	}
}