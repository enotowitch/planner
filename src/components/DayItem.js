import React, { PureComponent } from "react"
import TextAndInput from "./TextAndInput"

export default class DayItem extends PureComponent {
	render() {
		return (
			<div className="DayItem">
				<TextAndInput text="yay" />
			</div>
		)
	}
}