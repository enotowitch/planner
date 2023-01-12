import React, { PureComponent } from "react"
import Icon from "./Icon"

export default class TogglerPrevNext extends PureComponent {

	render() {

		const { title, prevFn, nextFn } = this.props

		return (
			<div className="fcc mb">
				<Icon src="prev" onClick={prevFn} />
				{title}
				<Icon src="next" onClick={nextFn} />
			</div>
		)
	}
}