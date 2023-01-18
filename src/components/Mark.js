import React, { Component } from "react"
import Icon from "./Icon"

export default class Mark extends Component {

	markFn = () => {
		this.props.setDayState("optionOn", !this.props.optionOn)
		this.props.setDayState("title", this.props.title)
		this.props.setDayState("place", this.props.place)
	}

	render() {

		const { optionOn, className } = this.props
		// console.log(this.props)

		return (
			<Icon src={optionOn ? "close" : "open"} onClick={this.markFn} className={className} />
		)
	}
}