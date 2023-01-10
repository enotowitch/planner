import React, { PureComponent } from "react"
import Month from "./Month"
import prev from "../img/prev.svg"
import next from "../img/next.svg"

export default class TaskAndMonth extends PureComponent {

	state = {
		taskNum: 0,
		monthNum: 0
	}

	render() {

		const { tasks } = this.props // [{…}, {…}]
		const { taskNum, monthNum } = this.state

		const taskName = String(Object.keys(tasks[taskNum])) // learn || exersize
		const task = tasks[taskNum] // {learn: {…}} || {exersize: {…}}

		return (
			<>
				<div className="fcc mb">
					<img src={prev} onClick={() => this.setState(prev => ({ taskNum: prev.taskNum - 1 }))} />
					{taskName}
					<img src={next} onClick={() => this.setState(prev => ({ taskNum: prev.taskNum + 1 }))} />
				</div>
				
				<Month monthNum={monthNum} task={task} taskName={taskName} />
			</>
		)
	}
}