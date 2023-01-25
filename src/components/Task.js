import React, { Component } from "react"
import Input from "./Input"
import { Context } from "../context"
import SubTask from "./SubTask"
import Icon from "./Icon"
import save from "../functions/save"

export default class Task extends Component {

	static contextType = Context

	state = {
		taskName: this.props.taskName
	}

	setTaskState = (stateName, newValue) => this.setState({ [stateName]: newValue })

	addSubTask = () => {

		const { tasks, setAppState } = this.context
		const { taskName } = this.props

		const subTaskArr = []

		tasks.map(taskObj => {
			const task = taskObj[taskName] // e.g [ { "subTask": "pull ups", "mode": "off", "week": [], "month": [], "type": "input" }, { "subTask": "push ups", "mode": "off", "week": [], "month": [], "type": "input" } ]
			task && task.map(subTaskObj => subTaskArr.push(subTaskObj.subTask))
		})

		if (!subTaskArr.includes("")) { // prevent adding void subTask (one allowed)
			tasks.map(taskObj => {
				const task = taskObj[taskName]
				task && task.push(
					{ "subTask": "", "mode": "off", "week": [], "month": [], "type": "input" }
				)
			})
		}

		save("tasks", tasks)
		setAppState("tasks", tasks)
	}

	deleteTask = () => {
		const { tasks, setAppState } = this.context
		const { taskName } = this.props

		tasks.map((taskObj, ind) => {
			const taskObjName = String(Object.keys(taskObj))

			if (tasks.length === 1) {
				throw new Error("Last task can not be deleted")
			}

			if (taskObjName === taskName) {
				tasks.splice(ind, 1)
				save("tasks", tasks, setAppState)
				window.location.reload() // todo
			}
		})
	}


	// ! RENDER
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
					<Input role="taskName" className="Input Task__title" value={taskName} oldValue={taskName} setTaskState={setTaskState} />

					<Icon src="close" onClick={this.deleteTask} className="ml" />

					<div>
						{subTasks}

						<Icon src="addSmall" onClick={this.addSubTask} className="ml mt" />
					</div>
				</div>
			</>
		)
	}
}