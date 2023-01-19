import React, { Component } from "react"
import Block from "./Block"
import Mode from "./Mode"
import { Context } from "../context"

export default class SubTaskModes extends Component {

	static contextType = Context

	state = {
		parent: { 0: true, 1: true, 2: true, 3: true },
		kids: { 0: false, 1: false, 2: false, 3: false },
		counter: 0
	}

	setOn = (id) => {
		// even/odd clicks toggle parent & kids
		if (this.state.counter % 2 === 0) { // show clicked Mode's kids
			this.setState(prev => ({
				parent: { 0: false, 1: false, 2: false, 3: false, [id]: true },
				kids: { 0: false, 1: false, 2: false, 3: false, [id]: true }
			}))
		} else { // back to default state: show all Modes
			this.setState({
				parent: { 0: true, 1: true, 2: true, 3: true },
				kids: { 0: false, 1: false, 2: false, 3: false }
			})
		}
	}

	addCounter = () => this.setState(prev => ({ counter: prev.counter + 1 }))

	chosen = (data) => {

		const { subTaskName, taskName } = this.props

		let chosen
		this.context.tasks.map(taskObj => {
			const taskObjName = String(Object.keys(taskObj))
			if (taskObjName === taskName) {
				taskObj[taskName].map(subTaskObj => {
					if (subTaskObj.subTask === subTaskName) {
						chosen = subTaskObj[data]
					}
				})
			}
		})
		return chosen
	}


	// ! RENDER
	render() {

		const { subTaskName, taskName } = this.props
		const { chosen, setOn, addCounter } = this

		const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(weekDay => <Block text={weekDay} modeName="week" subTaskName={subTaskName} taskName={taskName} chosen={chosen("week")} />)

		const monthDays = Array.from({ length: 31 }, (v, k) => k + 1).map(monthDay => <Block text={monthDay} modeName="month" subTaskName={subTaskName} taskName={taskName} chosen={chosen("month")} />)

		// console.log(this.props)

		return (
			<div className="f Modes">
				<Mode id={0} on={this.state} setOn={setOn} addCounter={addCounter} text="week" subTaskName={subTaskName} taskName={taskName}>
					{weekDays}
				</Mode>
				<Mode id={1} on={this.state} setOn={setOn} addCounter={addCounter} text="month" subTaskName={subTaskName} taskName={taskName}>
					{monthDays}
				</Mode>
				<Mode id={2} on={this.state} setOn={setOn} addCounter={addCounter} text="day" subTaskName={subTaskName} taskName={taskName}>

				</Mode>
				<Mode id={3} on={this.state} setOn={setOn} addCounter={addCounter} text="interval" subTaskName={subTaskName} taskName={taskName}>

				</Mode>
			</div>
		)
	}
}