import React, { Component } from "react"

export default class Toggler extends Component {

	state = {
		on: this.props.defaultState
	}

	toggle = () => this.setState(prev => ({ on: !prev.on }))

	render() {

		const { on } = this.state
		const { toggle } = this

		return (
			this.props.children(on, toggle)
		)
	}
}