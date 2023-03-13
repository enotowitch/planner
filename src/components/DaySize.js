import React, { Component } from "react"
import setCookie from "../functions/setCookie"
import widthImg from "../img/width.svg"
import heightImg from "../img/height.svg"

export default class DaySize extends Component {

	handleWidth = (e) => {
		this.props.setMonthState("width", e.target.value)
		setCookie("width", e.target.value)
		document.querySelector(".days").scrollIntoView()
	}

	handleHeight = (e) => {
		this.props.setMonthState("height", e.target.value)
		setCookie("height", e.target.value)
		document.querySelector(".days").scrollIntoView()
	}

	render() {

		const options = <>
			<option>15</option>
			<option>14</option>
			<option>13</option>
			<option>12</option>
			<option>11</option>
			<option>10</option>
			<option>9</option>
			<option>8</option>
			<option>7</option>
			<option>6</option>
			<option>5</option>
			<option>4</option>
			<option>3</option>
			<option>2</option>
			<option>1</option>
		</>

		const { width, height } = this.props
		const { handleWidth, handleHeight } = this


		// ! RETURN
		return (
			<div className="widthHeight c">
				<label className="fcc">
					<img className="ml mr" src={widthImg} />
					<select
						value={width}
						onChange={handleWidth}
					>
						{options}
					</select>
				</label>

				<label className="fcc">
					<img className="ml mr" src={heightImg} />
					<select
						value={height}
						onChange={handleHeight}
					>
						{options}
					</select>
				</label>
			</div>
		)
	}
}