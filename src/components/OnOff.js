import React, { Component } from "react"
import getCookie from "../functions/getCookie"
import setCookie from "../functions/setCookie"

export default class OnOff extends Component {

	state = {
		on: getCookie(this.props.text)
	}

	toggle = () => {
		this.setState(prev => ({ on: !prev.on }))
	}

	componentDidUpdate() {
		setCookie(this.props.text, this.state.on)
	}


	render() {

		const { on } = this.state
		const { text } = this.props

		return (
			<div className="fcc mt mb" onClick={this.toggle}>
				<span className="mr">{text}</span>
				<div className="OnOff">
					{!on && <span style={{ background: "#fd5c63", left: 0 }}></span>}
					{on && <span style={{ background: "#4FFFB0", right: 0 }}></span>}
				</div>
			</div>
		)
	}
}