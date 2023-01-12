import React, { PureComponent } from "react"
import Month from "./Month"
import prev from "../img/prev.svg"
import next from "../img/next.svg"
import { Context } from "../context"
import Icon from "./Icon"

export default class TaskAndMonth extends PureComponent {

	state = {
		taskNum: 0,
		monthNum: 0
	}

	static contextType = Context

	render() {

		const { tasks, taskAndMonthOn } = this.context // tasks = [{…}, {…}]
		const { taskNum, monthNum } = this.state

		const taskName = String(Object.keys(tasks[taskNum])) // learn || exersize
		const task = tasks[taskNum] // {learn: {…}} || {exersize: {…}}

		return (
			<>
				{taskAndMonthOn &&
					<>
						<div className="fcc mb">
							<Icon src="prev" onClick={() => this.setState(prev => ({ taskNum: prev.taskNum - 1 }))} />
							{taskName}
							<Icon src="next" onClick={() => this.setState(prev => ({ taskNum: prev.taskNum + 1 }))} />
						</div>

						<Month monthNum={monthNum} task={task} taskName={taskName} />
					</>
				}
			</>
		)
	}
}