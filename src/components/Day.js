import React, { PureComponent } from "react"
import DayItem from "./DayItem"
import openDayOptions from "../img/dots.svg"

export default class Day extends PureComponent {

	render() {

		return (
			<div className="Day">
				<div className="Day__title">
					<span>1</span>
					<span>Mon</span>
					<img src={openDayOptions} />
				</div>
				
				<DayItem />
				<DayItem />
				<DayItem />
				<DayItem />
				<DayItem />
				<DayItem />
				<DayItem />
				<DayItem />
			</div>
		)
	}
}