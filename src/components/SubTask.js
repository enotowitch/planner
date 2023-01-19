import React, { Component } from "react"
import Input from "./Input"
import SubTaskModes from "./SubTaskModes"
import SubTaskType from "./SubTaskType"

export default class SubTask extends Component {
	render() {

		const { subTaskName, taskName } = this.props

		return (
			<div className="fcc SubTask">
				<SubTaskType />
				<Input className="Input SubTask__title" value={subTaskName} />
				<SubTaskModes subTaskName={subTaskName} taskName={taskName} />
			</div>
		)
	}
}