import React, { PureComponent } from "react"

export default class InputState extends PureComponent {

	state = {
		value: ""
	}

	setValue = (e) => this.setState({ value: e.target.value })

	render() {

		const { value } = this.state
		const { setValue } = this

		return (
			this.props.children({ value, setValue })
		)
	}
}