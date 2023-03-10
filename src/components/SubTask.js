import React, { Component } from "react"
import Input from "./Input"
import SubTaskModes from "./SubTaskModes"
import SubTaskType from "./SubTaskType"

export default class SubTask extends Component {

	state = {
		subTaskName: this.props.subTaskName
	}

	setSubTaskState = (stateName, newValue) => this.setState({ [stateName]: newValue })


	render() {

		const { taskName, type } = this.props
		const { subTaskName } = this.state
		const { setSubTaskState } = this

		return (
			<div className="fcc SubTask">
				<SubTaskType subTaskName={subTaskName} taskName={taskName} type={type} />
				<Input role="subTaskName" className="Input SubTask__title" value={subTaskName} oldValue={subTaskName} taskName={taskName} setSubTaskState={setSubTaskState} placeholder="subtask name" />
				<SubTaskModes subTaskName={subTaskName} taskName={taskName} />
			</div>
		)
	}
}