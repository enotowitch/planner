import React, { Component } from "react"
import Block from "./Block"
import Mode from "./Mode"
import { Context } from "../context"
import SelectDay from "./SelectDay"
import SelectInterval from "./SelectInterval"

export default class SubTaskModes extends Component {

	static contextType = Context

	setOn = (id) => {
		// even/odd clicks toggle parent & kids
		if (this.state.counter % 2 === 0) { // show clicked Mode's kids
			this.setState(prev => ({
				parent: { 0: false, 1: false, 2: false, 3: false, 4: false, [id]: true },
				kids: { 0: false, 1: false, 2: false, 3: false, 4: false, [id]: true }
			}))
		} else { // back to default state: show all Modes
			this.setState({
				parent: { 0: true, 1: true, 2: true, 3: true, 4: true },
				kids: { 0: false, 1: false, 2: false, 3: false, 4: false }
			})
		}
	}

	addCounter = () => this.setState(prev => ({ counter: prev.counter + 1 }))

	chosen = (modeName) => {

		const { subTaskName, taskName } = this.props

		let chosen
		this.context.tasks.map(taskObj => {
			const taskObjName = String(Object.keys(taskObj))
			if (taskObjName === taskName) {
				taskObj[taskName].map(subTaskObj => {
					if (subTaskObj.subTask === subTaskName) {
						chosen = subTaskObj[modeName]
					}
				})
			}
		})
		return chosen
	}

	// ! state
	state = {
		parent: { 0: true, 1: true, 2: true, 3: true, 4: true },
		kids: { 0: false, 1: false, 2: false, 3: false, 4: false },
		counter: 0,
		day: this.chosen("day") && this.chosen("day")
	}

	setSubTaskModesState = (stateName, newValue) => this.setState({ [stateName]: newValue })
	// ? state

	// ! RENDER
	render() {

		const { subTaskName, taskName } = this.props
		const { day } = this.state
		const { chosen, setOn, addCounter, setSubTaskModesState } = this

		const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(weekDay => <Block text={weekDay} modeName="week" subTaskName={subTaskName} taskName={taskName} chosen={chosen("week")} />)
		const monthDays = Array.from({ length: 31 }, (v, k) => k + 1).map(monthDay => <Block text={monthDay} modeName="month" subTaskName={subTaskName} taskName={taskName} chosen={chosen("month")} />)
		const days = day && day.map(egMar9 => <SelectDay selectMode="read" text={egMar9} modeName="day" subTaskName={subTaskName} taskName={taskName} setSubTaskModesState={setSubTaskModesState} />)


		// ! RETURN
		return (
			<div className="f Modes">

				{/* mode: off */}
				<Mode id={0} on={this.state} setOn={setOn} addCounter={addCounter} text="off" subTaskName={subTaskName} taskName={taskName}>
					<div>"{subTaskName}" is off</div>
				</Mode>

				{/* mode: week */}
				<Mode id={1} on={this.state} setOn={setOn} addCounter={addCounter} text="week" subTaskName={subTaskName} taskName={taskName}>
					{weekDays}
				</Mode>

				{/* mode: month */}
				<Mode id={2} on={this.state} setOn={setOn} addCounter={addCounter} text="month" subTaskName={subTaskName} taskName={taskName}>
					{monthDays}
				</Mode>

				{/* mode: day */}
				<Mode id={3} on={this.state} setOn={setOn} addCounter={addCounter} text="day" subTaskName={subTaskName} taskName={taskName}>
					<SelectDay selectMode="write" text="pick day" modeName="day" subTaskName={subTaskName} taskName={taskName} setSubTaskModesState={setSubTaskModesState} />
					{days}
				</Mode>

				{/* mode: interval */}
				<Mode id={4} on={this.state} setOn={setOn} addCounter={addCounter} text="interval" subTaskName={subTaskName} taskName={taskName}>
					<SelectInterval modeName="interval" taskName={taskName} subTaskName={subTaskName} />
				</Mode>
			</div>

		)
	}
}