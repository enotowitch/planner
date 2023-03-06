import React, { Component } from "react"
import OnOff from "./OnOff"

export default class Settings extends Component {

	deleteTasks = () => {
		if (window.confirm("Delete all tasks ?")) {
			localStorage.removeItem("tasks")
		}
	}

	deleteColors = () => {
		if (window.confirm("Delete all colors ?")) {
			localStorage.removeItem("colors")
		}
	}

	deleteAll = () => {
		if (window.confirm("Delete all tasks, sub tasks (in each day) & colors ?")) {
			localStorage.clear()
		}
	}

	render() {
		return (
			<>
				<OnOff text="color memo" />
				<OnOff text="day hover" />

				<div className="fcc fdc">
					<button onClick={this.deleteTasks}>delete tasks</button>
					<button onClick={this.deleteColors}>delete colors</button>
					<button onClick={this.deleteAll}>delete all</button>
				</div>
			</>
		)
	}
}