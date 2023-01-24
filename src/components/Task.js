import React, { Component } from "react"
import Input from "./Input"
import { Context } from "../context"
import SubTask from "./SubTask"

export default class Task extends Component {

	static contextType = Context

	state = {
		taskName: this.props.taskName
	}

	setTaskState = (stateName, newValue) => this.setState({ [stateName]: newValue })

	render() {

		const { taskName } = this.state
		const { setTaskState } = this

		const subTasks = this.context.tasks.map(taskObj => {
			const thisObjTaskName = String(Object.keys(taskObj))
			return thisObjTaskName === taskName && taskObj[taskName].map(subTaskObj => {
				const { subTask } = subTaskObj
				return <SubTask subTaskName={subTask} taskName={taskName} />
			}) // e.g subTaskObj = { "subTask": "pull ups", "mode": "weekDay", "weekDay": [ "tue", "sat", "sun" ], "type": "input" }
		}) // e.g taskObj = { "exersize": [ { "subTask": "pull ups", "mode": "weekDay", "weekDay": [ "tue", "sat", "sun" ], "type": "input" }, { "subTask": "push ups", "mode": "weekDay", "weekDay": [ "wed", "mon", "sun" ], "type": "input" } ] }


		// ! RETURN
		return (
			<>
				<div className="Task mt">
					<Input role="taskName" type="text" className="Input Task__title" value={taskName} oldValue={taskName} setTaskState={setTaskState} />
					<div>
						{subTasks}
					</div>
				</div>
			</>
		)
	}
}