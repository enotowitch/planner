import React, { PureComponent } from "react"

export default class Toggler extends PureComponent {

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