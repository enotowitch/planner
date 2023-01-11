import React, { PureComponent } from "react";
import Burger from "./components/Burger";
import Menu from "./components/Menu";
import TaskAndMonth from "./components/TaskAndMonth";
import { Context } from "./context"

class App extends PureComponent {

	state = {
		taskAndMonthOn: true,
		menuOn: false,
		colors: eval(localStorage.getItem("colors")),
		tasks: eval(localStorage.getItem("tasks"))
	}


	render() {

		// ! DEFAULT
		// ! colors
		if (localStorage.length === 0) {
			localStorage.setItem("colors",
				`[
			{ success: "#87d20c"},
			{ "so-so": "#ffd561"},
			{ fail: "#ff8c92"},
			{ rest: "#ff7fff"},
			]`)
		}
		// ? colors
		// ! tasks
		localStorage.setItem("tasks",
			`[
			{ exersize: 
				[
					{subTask: "pull ups", weekDay: ["tue", "sat", "sun"], type: "input"}, 
					{subTask: "push ups", weekDay: ["wed", "mon", "sun"], type: "input"}
				]
				},
			{ learn: 
				[
					{subTask: "js", weekDay: ["mon", "tue", "wed"], type: "checkbox"}, 
					{subTask: "react", weekDay: ["thu", "fri", "sat"], type: "checkbox"}
				]
				}
		]`)
		// ? tasks
		// ? DEFAULT


		// ! RETURN
		return (
			<Context.Provider value={{ ...this.state }}>

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
