import React, { PureComponent } from "react"

export default class CheckboxAndText extends PureComponent {
	render() {

		const { text } = this.props

		return (
			<>
				<input
					type="checkbox"
				/>
				<span>{text}</span>
			</>
		)
	}
}