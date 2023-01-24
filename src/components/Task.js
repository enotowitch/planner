import React, { Component } from "react"
import Input from "./Input"
import { Context } from "../context"
import SubTask from "./SubTask"

export default class Task extends Component {

	static contextType = Context

	render() {

		const { taskName } = this.props

		const subTasks = this.context.tasks.map(taskObj => {
			const thisObjTaskName = String(Object.keys(taskObj))
			return thisObjTaskName === taskName && taskObj[taskName].map(subTaskObj => {
				const { subTask } = subTaskObj
				return <SubTask subTaskName={subTask} taskName={taskName} />
			}) // e.g subTaskObj = { "subTask": "pull ups", "mode": "weekDay", "weekDay": [ "tue", "sat", "sun" ], "type": "input" }
		}) // e.g taskObj = { "exersize": [ { "subTask": "pull ups", "mode": "weekDay", "weekDay": [ "tue", "sat", "sun" ], "type": "input" }, { "subTask": "push ups", "mode": "weekDay", "weekDay": [ "wed", "mon", "sun" ], "type": "input" } ] }


		return (
			<>
				<div className="Task mt">
					<Input className="Input Task__title" value={taskName} />
					<div>
						{subTasks}
					</div>
				</div>
			</>
		)
	}
}