import React, { Component } from "react"

export default class Icon extends Component {

	render() {

		try {
			var src = require(`../img/${this.props.src}.svg`)
		} catch (error) {
			console.log("SRC NOT FOUND!")
		}

		return (
			<img src={src} className={this.props.className} onClick={this.props.onClick} />
		)
	}
}