import React, { Component } from "react"
import { Context } from "../context"
import TasksAndSubTasks from "./TasksAndSubTasks"
import MarksAndColors from "./MarksAndColors"
import Settings from "./Settings"

export default class Menu extends Component {

	static contextType = Context

	state = {
		on: { 0: true, 1: false, 2: false }
	}

	setOn = (id) => this.setState({ on: { 0: false, 1: false, 2: false, [id]: true } })

	render() {

		const { menuOn } = this.context
		const { on } = this.state
		const { setOn } = this


		return (
			<>
				{menuOn &&
					<>
						<div className="Menu">

							<div className="Menu__top f">
								<div className="Menu__block" onClick={() => setOn(0)}>Tasks</div>
								<div className="Menu__block" onClick={() => setOn(1)}>Colors</div>
								<div className="Menu__block" onClick={() => setOn(2)}>Settings</div>
							</div>

							{on[0] && <TasksAndSubTasks />}

							{on[1] && <MarksAndColors />}

							{on[2] && <Settings />}
						</div>
					</>
				}

			</>
		)
	}
}