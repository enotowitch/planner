import React, { Component } from "react"
import Day from "./Day"
import listOfMonths from "../listOfMonths"
import { Context } from "../context"
import getCookie from "../functions/getCookie"
import DaySize from "./DaySize"

export default class Month extends Component {

	static contextType = Context

	// ! state
	state = {
		width: getCookie("width"), // default for mobile
		height: getCookie("height") // default for mobile
	}

	setMonthState = (stateName, newValue) => this.setState({ [stateName]: newValue })
	// ? state

	// ! hover/unhover
	hover() {
		document.querySelectorAll(".Day").forEach(each => each.addEventListener("mouseenter", (e) => {
			document.querySelectorAll(".Day").forEach(each => each.classList.add("opLow"))
			e.target.classList.remove("opLow")
			e.target.classList.add("opHigh")
		}))
	}

	unhover() {
		document.querySelector(".days").addEventListener("mouseleave", () => {
			document.querySelectorAll(".Day").forEach(each => {
				each.classList.remove("opLow")
				each.classList.remove("opHigh")
			})
		})
	}

	componentDidMount() {
		if (getCookie("day hover")) {
			this.hover()
			this.unhover()
		}
	}

	componentDidUpdate() {
		if (getCookie("day hover")) {
			this.hover()
			this.unhover()
		}
	}
	// ? hover/unhover


	// ! RENDER
	render() {

		const { task, taskName } = this.props
		const { monthNum } = this.context
		const { width, height } = this.state
		const { setMonthState } = this

		const width_ = 100 / width // ! set Day width selected
		const height_ = 100 / height // ! set Day height selected

		const days = listOfMonths[monthNum].map(egJan9 => <Day key={Math.random()} day={egJan9} subTasks={task[taskName]} taskName={taskName} width={width_} height={height_} />)


		// ! RETURN
		return (
			<>
				<DaySize width={width} height={height} setMonthState={setMonthState} />

				<div className="days">
					{days}
				</div>
			</>
		)
	}
}