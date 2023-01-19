import React, { Component } from "react"
import save from "../functions/save"
import { Context } from "../context"

export default class Block extends Component {

	static contextType = Context

	blockFn = () => {
		const { modeName, taskName, subTaskName, text, changeMode } = this.props
		// console.log(this.props)

		// change `mode` like mode="week" to mode="month"
		if (changeMode) {
			const updatedTasks = this.context.tasks.map(taskObj => {
				const taskObjName = String(Object.keys(taskObj))
				if (taskObjName === taskName) {
					taskObj[taskName].map(subTaskObj => {
						if (subTaskObj.subTask === subTaskName) {
							subTaskObj.mode = changeMode
							return subTaskObj
						} else {
							return subTaskObj
						}
					})
					return taskObj
				} else {
					return taskObj
				}
			})
			save("tasks", updatedTasks)
		}

		// change `mode content` like week=["mon"] to week=["tue"]
		if (modeName) {
			const updatedTasks = this.context.tasks.map(taskObj => {
				const taskObjName = String(Object.keys(taskObj))
				if (taskObjName === taskName) {
					taskObj[taskName].map(subTaskObj => {
						if (subTaskObj.subTask === subTaskName) {
							// toggler: if there is no day => add it; if there is the day => remove it
							if (!subTaskObj[modeName].includes(text)) {
								subTaskObj[modeName].push(text)
							} else {
								subTaskObj[modeName].splice(subTaskObj[modeName].indexOf(text), 1)
							}
							return subTaskObj
						} else {
							return subTaskObj
						}
					})
					return taskObj
				} else {
					return taskObj
				}
			})
			save("tasks", updatedTasks)
		}
	}

	render() {
		const { text, chosen } = this.props // e.g { "text": "mon", "modeName": "weekDay", "subTaskName": "push ups", "taskName": "exersize" }
		// console.log(this.props)
		const color = chosen && chosen.includes(text) && "pink"

		return (
			<div className="Block" onClick={this.blockFn} style={{ background: color }}>
				{text}
			</div>
		)
	}
}