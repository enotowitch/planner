import React, { PureComponent } from "react"
import Day from "./Day"
import listOfMonths from "../listOfMonths"

export default class Month extends PureComponent {

	render() {

		const { monthNum, task, taskName } = this.props

		const days = listOfMonths[monthNum].map(egJan9 => <Day day={egJan9} subTasks={task[taskName]} />)

		return (
			<>
				{days}
			</>
		)
	}
}