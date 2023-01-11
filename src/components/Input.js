import React, { PureComponent } from "react"
import InputState from "./InputState"

export default class Input extends PureComponent {


	render() {

		return (
			<InputState>
				{({ value, setValue }) => (
					<input
						type={this.props.type || "text"}
						className={this.props.className || "Input"}
						value={value || this.props.colorName || this.props.color}
						onChange={setValue}
						disabled={this.props.disabled}
					/>
				)}
			</InputState>
		)
	}
}