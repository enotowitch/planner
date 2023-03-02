import React, { Component } from "react"
import Day from "./Day"
import listOfMonths from "../listOfMonths"
import { Context } from "../context"

export default class Month extends Component {

	static contextType = Context

	render() {

		const { task, taskName } = this.props
		const { monthNum } = this.context

		const days = listOfMonths[monthNum].map(egJan9 => <Day key={Math.random()} day={egJan9} subTasks={task[taskName]} taskName={taskName} />)

		return (
			<>
				{days}
			</>
		)
	}
}