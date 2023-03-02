import React, { Component } from "react"
import Day from "./Day"
import listOfMonths from "../listOfMonths"
import { Context } from "../context"

export default class Month extends Component {

	static contextType = Context

	state = {
		width: 3, // default for mobile
		height: 5 // default for mobile
	}


	// ! RENDER
	render() {

		const { task, taskName } = this.props
		const { monthNum } = this.context
		const { width, height } = this.state

		const width_ = 100 / width - 1 // ! set Day width selected
		const height_ = 100 / height - 1 // ! set Day height selected

		const days = listOfMonths[monthNum].map(egJan9 => <Day key={Math.random()} day={egJan9} subTasks={task[taskName]} taskName={taskName} width={width_} height={height_} />)

		return (
			<>
				<label>
					width
					<select
						value={width}
						onChange={(e) => this.setState({ width: e.target.value })}
					>
						<option>10</option>
						<option>5</option>
						<option>3</option>
						<option>1</option>
					</select>
				</label>

				<label>
					height
					<select
						value={height}
						onChange={(e) => this.setState({ height: e.target.value })}
					>
						<option>10</option>
						<option>5</option>
						<option>3</option>
						<option>1</option>
					</select>
				</label>

				<div>
					{days}
				</div>
			</>
		)
	}
}