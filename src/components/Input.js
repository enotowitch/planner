import React, { PureComponent } from "react"
import InputState from "./InputState"

export default class Input extends PureComponent {


	render() {

		return (
			<InputState>
				{({ value, setValue }) => (
					<input
						type="text"
						className="Input"
						value={value}
						onChange={setValue}
					/>
				)}
			</InputState>
		)
	}
}