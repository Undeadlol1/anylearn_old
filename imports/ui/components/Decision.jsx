import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { $ } from 'meteor/jquery'
import { _ } from 'meteor/underscore'
import { FlowRouter } from 'meteor/kadira:flow-router'
import classNames from 'classnames'
import { Decisions } from '../../api/decisions'
import { Button, Icon, Row, Col } from 'react-materialize'
import get from 'oget'

class Decision extends Component {

	state = { rating: '' }

	handleChange(event) {
		const rating = event.target.value
		this.props.onChange(rating)
		this.setState({ rating })
	}
	// handleSubmit(e) {
	// 	const {rating} = this.state
	// 	if(rating == 0) return
	// 	Meteor.call("decisions.upsert", {
	// 			rating,
	// 			parent: this.props.node._id
	// 		},
	// 		(err, result) => {
	// 			console.warn('Meteor.call("decisions.upsert")!')
	// 			if (err) Materialize.toast(err.reason, 4000) // `Что-то пошло не так! ${
	// 			else Materialize.toast(`Сохранено!`, 4000)
	// 		}
	// 	)
	// }
	componentWillReceiveProps(nextProps) {
		this.setState({ rating: nextProps.decision.rating })
	}

	render() {
		const 	styles = 	{
								// display: 'none',
								position: 'fixed',
								width: '100%',
								bottom: 'calc(50% - 64px)',
								margin: 0
							},
				{decision, node} = this.props

		return 	<p style={styles} id="decision" className="range-field" {...this.props}>
				  <input
					//  onMouseUp={this.handleSubmit.bind(this)}
					  onChange={this.handleChange.bind(this)}
					  type="range"
					  min="-5"
					  max="5"
					  value={this.state.rating}
					  />
				</p>
	}
}

Decision.propTypes = {
	node: PropTypes.object.isRequired,
	decision: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Decision
