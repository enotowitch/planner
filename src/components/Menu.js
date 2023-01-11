import React, { PureComponent } from "react"
import InputsAndColors from "./InputsAndColors"
import { Context } from "../context"

export default class Menu extends PureComponent {

	static contextType = Context

	render() {

		const { menuOn } = this.context

		return (
			<>
				{menuOn &&
					<div className="Menu">
						<InputsAndColors />
					</div>
				}
			</>
		)
	}
}