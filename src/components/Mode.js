import React, { Component } from "react"
import { back } from "../consts"
import { Context } from "../context"
import Block from "./Block"

export default class Mode extends Component {

	static contextType = Context

	modeFn = () => {
		this.props.setOn(this.props.id)
		this.props.addCounter()
	}

	render() {
		const { id, on, text, children, subTaskName, taskName } = this.props
		const { tasks } = this.context
		const modeText = on.counter % 2 === 0 ? text : back

		let chosenMode
		tasks.map(taskObj => taskObj[taskName] && taskObj[taskName].map(subTaskObj => subTaskObj.subTask === subTaskName && (chosenMode = subTaskObj.mode)))


		// ! RETURN
		return (
			<>
				{on.parent[id] &&
					<>
						<div className={`f Mode ${chosenMode === text && modeText !== back ? "chosen" : ""}`} onClick={this.modeFn}>
							<Block text={modeText} changeMode={text} subTaskName={subTaskName} taskName={taskName} />
						</div>
						<>
							{on.kids[id] && children}
						</>
					</>
				}
			</>
		)
	}
}