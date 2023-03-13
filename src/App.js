import React, { Component } from "react";
import Burger from "./components/Burger";
import Menu from "./components/Menu";
import TaskAndMonth from "./components/TaskAndMonth";
import { Context } from "./context"
import lsData from "./lsData"
import save from "./functions/save"
import setCookie from "./functions/setCookie";

class App extends Component {

	// ! state
	state = {
		taskAndMonthOn: true,
		menuOn: false,
		colors: lsData("colors"),
		tasks: lsData("tasks"),
		taskNum: 0,
		monthNum: new Date().getMonth(),
		year: new Date().getFullYear()
	}

	setAppState = (stateName, newValue) => this.setState({ [stateName]: newValue })
	// ? state


	// ! RENDER
	render() {

		// ! DEFAULT
		// ! cookies
		!document.cookie.match(/color memo/) && setCookie("color memo", false)
		!document.cookie.match(/day hover/) && setCookie("day hover", true)
		!document.cookie.match(/width/) && setCookie("width", 2)
		!document.cookie.match(/height/) && setCookie("height", 5)
		// ? cookies
		// ! colors
		if (localStorage.length === 0) {
			save("colors",
				[
					{ id: -1, colorName: "no mark", color: "#ffffff" },
					{ id: 0, colorName: "success", color: "#87d20c" },
					{ id: 1, colorName: "so-so", color: "#ffd561" },
					{ id: 2, colorName: "fail", color: "#ff8c92" },
					{ id: 3, colorName: "rest", color: "#ff7fff" },
				])
			// ? colors
			// ! tasks
			save("tasks",
				[
					{
						"Task 1":
							[
								{ subTask: "sub task 1", mode: "month", week: [], month: [1], type: "text" },
								{ subTask: "sub task 2", mode: "month", week: [], month: [15], type: "text" }
							]
					},
					{
						"Task 2":
							[
								{ subTask: "sub task 1", mode: "week", week: ["mon"], month: [], type: "checkbox" },
								{ subTask: "sub task 2", mode: "week", week: ["fri"], month: [], type: "checkbox" }
							]
					}
				])
			window.location.reload() // make sure all defaults saved
		}
		// ? tasks
		// ? DEFAULT

		const { setAppState } = this
		const { tasks, taskNum } = this.state

		const curTaskName = String(Object.keys(tasks[taskNum]))

		// console.log(localStorage)

		// ! RETURN
		return (
			<Context.Provider value={{ ...this.state, setAppState, curTaskName }}>

				<div onClick={() => this.setState(prev => ({ taskAndMonthOn: !prev.taskAndMonthOn, menuOn: !prev.menuOn }))}>
					<Burger />
				</div >

				<TaskAndMonth />

				<Menu />
			</Context.Provider >
		);
	}
}

export default App;
