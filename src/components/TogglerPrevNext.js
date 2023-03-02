import React, { Component } from "react"
import Icon from "./Icon"

export default class TogglerPrevNext extends Component {

	render() {

		const { title, prevFn, nextFn } = this.props

		return (
			<div className="Toggler__title">
				<Icon src="prev" onClick={prevFn} />
				{title}
				<Icon src="next" onClick={nextFn} />
			</div>
		)
	}
}