import TaskAndMonth from "./components/TaskAndMonth";

function App() {

	// todo remove placeholder 
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

	const tasks = eval(localStorage.getItem("tasks"))
	// todo remove placeholder 

	return (
		<>
			<TaskAndMonth tasks={tasks} />
		</>
	);
}

export default App;
