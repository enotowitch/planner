import React, { Component } from "react"
import Block from "./Block"

export default class Mode extends Component {

	modeFn = () => {
		this.props.setOn(this.props.id)
		this.props.addCounter()
	}

	render() {
		const { id, on, text, children, subTaskName, taskName } = this.props
		const modeText = on.counter % 2 === 0 ? text : "BACK"
		// console.log(this.props)

		return (
			<>
				{on.parent[id] &&
					<>
						<div className="f Mode" onClick={this.modeFn}>
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