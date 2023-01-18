import React, { Component } from "react";
import Burger from "./components/Burger";
import Menu from "./components/Menu";
import TaskAndMonth from "./components/TaskAndMonth";
import { Context } from "./context"
import lsColors from "./lsColors"
import save from "./functions/save"
import setCookie from "./functions/setCookie";

class App extends Component {

	// ! state
	state = {
		taskAndMonthOn: true,
		menuOn: false,
		colors: lsColors,
		tasks: eval(localStorage.getItem("tasks")),
		taskNum: 0,
		monthNum: 0
	}

	setAppState = (stateName, newValue) => this.setState({ [stateName]: newValue })
	// ? state


	// ! RENDER
	render() {

		// ! DEFAULT
		// ! cookies
		!document.cookie.match(/colorMemo/) && setCookie("colorMemo", false)
		// ? cookies
		// ! colors
		if (localStorage.length === 0) {
			save("colors",
				[
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
						exersize:
							[
								{ subTask: "pull ups", weekDay: ["tue", "sat", "sun"], type: "input" },
								{ subTask: "push ups", weekDay: ["wed", "mon", "sun"], type: "input" }
							]
					},
					{
						learn:
							[
								{ subTask: "js", weekDay: ["mon", "tue", "wed"], type: "checkbox" },
								{ subTask: "react", weekDay: ["thu", "fri", "sat"], type: "checkbox" }
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
