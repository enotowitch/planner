import React, { Component } from "react"
import Day from "./Day"
import listOfMonths from "../listOfMonths"

export default class Month extends Component {

	render() {

		const { monthNum, task, taskName } = this.props

		const days = listOfMonths[monthNum].map(egJan9 => <Day day={egJan9} subTasks={task[taskName]} taskName={taskName} />)

		return (
			<>
				{days}
			</>
		)
	}
}